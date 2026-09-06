# Agendamento Nativo no Instagram via Meta API

> **Prioridade:** 🔴 Alta  
> **Status:** Planejado  
> **Criado em:** 05/09/2026  
> **Motivo:** Eliminar dependência do PC ligado e do Antigravity aberto para publicação de posts

---

## Problema Atual

Hoje os posts são publicados por scripts Node.js que rodam localmente via cron do Antigravity (`schedule`). Isso significa que:

- ❌ Se o PC desligar, reiniciar ou entrar em sleep, os posts não são publicados
- ❌ Se o Antigravity IDE for fechado, o cron é cancelado
- ❌ Precisamos reagendar manualmente toda vez que o PC reinicia
- ❌ Não é possível agendar uma semana ou um mês inteiro de conteúdo de uma vez

---

## Solução: Agendamento Nativo via Meta Content Publishing API

A Meta API suporta **agendamento nativo** de posts, onde o conteúdo fica armazenado nos servidores do Instagram e é publicado automaticamente no horário programado, independente do estado do PC local.

### Como Funciona

1. **Criar o container de mídia** com `published=false`:
   ```
   POST /{ig-user-id}/media
   ?image_url={URL_PUBLICA_DA_IMAGEM}
   &caption={LEGENDA}
   &published=false
   &scheduled_publish_time={UNIX_TIMESTAMP}
   ```

2. **Para carrosséis**, criar cada item filho e depois o container pai:
   ```
   POST /{ig-user-id}/media
   ?media_type=CAROUSEL
   &children={ID1,ID2,...,ID10}
   &caption={LEGENDA}
   &published=false
   &scheduled_publish_time={UNIX_TIMESTAMP}
   ```

3. **Publicar o container agendado**:
   ```
   POST /{ig-user-id}/media_publish
   ?creation_id={CONTAINER_ID}
   ```

### Regras e Limites da Meta API

- ⏰ O `scheduled_publish_time` deve ser entre **10 minutos** e **75 dias** no futuro
- 📸 As imagens precisam estar em **URLs HTTPS públicas** (já temos via GitHub Pages)
- 🔄 Máximo de **25 posts agendados** por vez
- 📐 Carrosséis aceitam de 2 a 10 itens (já respeitamos isso)

---

## Benefícios

- ✅ **Agendar uma semana inteira** de conteúdo de uma só vez
- ✅ **Agendar um mês inteiro** (até 75 dias à frente)
- ✅ **Zero dependência do PC** — o Instagram cuida da publicação
- ✅ **Zero dependência do Antigravity** — pode fechar, reiniciar, dormir
- ✅ **Visível no Meta Business Suite** — o cliente pode ver os posts agendados
- ✅ **Cancelamento/edição** pelo Business Suite se necessário

---

## Tarefas de Implementação

### Fase 1: Script de Agendamento Nativo
- [ ] Criar `automacoes/agendar-instagram.mjs` que recebe o `publicacao.json` e agenda via API
- [ ] Suporte a post individual (imagem única + legenda + timestamp)
- [ ] Suporte a carrossel (múltiplas imagens + legenda + timestamp)
- [ ] Validação do `scheduled_publish_time` (mín 10min, máx 75 dias)
- [ ] Persistir o `creation_id` retornado pela API no `publicacao.json`

### Fase 2: Agendamento em Lote
- [ ] Criar `automacoes/agendar-semana.mjs` que lê o `banco-de-ideias.md` e agenda todos os posts da semana de uma vez
- [ ] Criar `automacoes/agendar-mes.mjs` para agendamento mensal
- [ ] Dashboard de status: listar todos os posts agendados via API `GET /{ig-user-id}/content_publishing_limit`

### Fase 3: Workflow Integrado
- [ ] Integrar no fluxo do studio: criar conteúdo → gerar artes → publicar imagens no GitHub Pages → agendar no Instagram
- [ ] Remover dependência do cron local do Antigravity
- [ ] Manter cron apenas como "produtor de conteúdo" (cria artes e copy), não como "publicador"

### Fase 4: Monitoramento
- [ ] Script para consultar status dos posts agendados
- [ ] Alerta se algum agendamento falhar (webhook ou consulta periódica)
- [ ] Atualização automática do `banco-de-ideias.md` quando o post for publicado

---

## Referências

- [Meta Content Publishing API](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/content-publishing)
- [Scheduled Publishing](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/content-publishing#agendamento)
- Campo `scheduled_publish_time`: Unix timestamp UTC entre 10min e 75 dias no futuro

---

## Impacto no Workflow Atual

```
ANTES (dependente do PC):
  Cron 08:00 → Cria conteúdo → Agenda timer local → PC precisa estar ligado → Publica

DEPOIS (independente):
  Sessão única → Cria conteúdo da semana → Upload imagens → Agenda no Instagram → Pronto!
  (pode desligar o PC, o Instagram publica sozinho)
```
