# Próxima Sessão — Prioridade #1

> **Última atualização:** 05/09/2026 23:25 BRT

## 🚨 TAREFA IMEDIATA AO INICIAR

**Implementar o sistema de agendamento nativo de posts no Instagram via Meta API.**

### Contexto
- O roadmap completo está em: `criativo-ai-studio/roadmap/agendamento-nativo-instagram.md`
- O objetivo é eliminar a dependência do PC ligado e do Antigravity aberto para publicar posts
- Com isso, o usuário poderá agendar uma semana ou um mês inteiro de conteúdo de uma só vez
- Os posts ficam agendados nos servidores do Instagram e publicam sozinhos no horário programado

### O que fazer
1. Criar `automacoes/agendar-instagram.mjs` — script que agenda posts (individuais e carrosséis) via Meta Content Publishing API usando `scheduled_publish_time`
2. Criar `automacoes/agendar-semana.mjs` — lê o banco de ideias e agenda todos os posts de uma semana
3. Integrar no fluxo existente do studio
4. Testar com um post real

### Referências técnicas
- Endpoint: `POST /{ig-user-id}/media` com `published=false` e `scheduled_publish_time={UNIX_TIMESTAMP}`
- Imagens devem estar em URLs HTTPS públicas (já temos via GitHub Pages: `navibotlab.github.io/meu-social-midia/`)
- Limite: entre 10 minutos e 75 dias no futuro, máximo 25 posts agendados simultâneos
- Credenciais já configuradas no `.env` do criativo-ai-studio
