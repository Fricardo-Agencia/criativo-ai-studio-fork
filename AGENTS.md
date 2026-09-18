# 🤖 Diretório de Agentes e Habilidades — Criativo AI Studio

Este documento lista todos os Agentes Especialistas de IA incluídos no pacote base do Criativo AI Studio.

---

## 🧭 Agentes do Pacote Base

### 1. 📅 Planejamento Editorial (`/planejar-conteudo`)
- **Papel:** Estrategista de Conteúdo.
- **Como Acionar:** `/planejar-conteudo` ou *"Planeje meu calendário editorial para os próximos 15 dias"*.
- **O que faz:** Define pilares, formatos ideais (feed, carrossel, reels, stories) e frequência baseada na maturidade do perfil.

### 2. ✍️ Copywriter Instagram (`/copywriter-instagram`)
- **Papel:** Redator Publicitário de Resposta Direta.
- **Como Acionar:** `/copywriter-instagram` ou *"Escreva a legenda desse post com foco em salvar e compartilhar"*.
- **O que faz:** Cria headlines com alto poder de clique, estruturação AIDA/PAS e CTAs estratégicas.

### 3. 🖼️ Post Individual (`/criar-post-individual`)
- **Papel:** Designer e Diretor de Arte para Feed.
- **Como Acionar:** `/criar-post-individual` ou *"Crie um post estático 1080x1350 sobre meu serviço"*.
- **O que faz:** Gera artes em proporção 3:4 (1080×1350) com hierarquia visual clara, tipografia e iluminação premium.
- **Referências:** Busca em `recursos/referencias/individual/` (prioridade) ou `recursos/referencias/` (geral).

### 4. 📚 Criar Carrossel (`/criar-carrossel`)
- **Papel:** Designer de Narrativas Visuais Sequenciais.
- **Como Acionar:** `/criar-carrossel` ou *"Desenvolva um carrossel educativo de 6 slides"*.
- **O que faz:** Produz carrosséis com transição contínua entre slides e retenção visual calculada.
- **Referências:** Busca em `recursos/referencias/carrosseis/` (prioridade) ou `recursos/referencias/` (geral).

### 5. 🎯 Post Anúncio (`/criar-post-anuncio`)
- **Papel:** Especialista em Criativos de Alta Conversão.
- **Como Acionar:** `/criar-post-anuncio` ou *"Crie um anúncio de tráfego pago focado em captação de leads"*.
- **O que faz:** Desenvolve variações de criativos testáveis para campanhas do Meta Ads.
- **Referências:** Busca em `recursos/referencias/anuncios/` (prioridade) ou `recursos/referencias/` (geral).

### 6. 📱 Gerar Stories (`/gerar-stories`)
- **Papel:** Designer de Conteúdo Vertical.
- **Como Acionar:** `/gerar-stories` ou *"Crie 3 stories em sequência para abrir uma caixinha de perguntas"*.
- **O que faz:** Layouts verticais 9:16 (1080×1920) respeitando rigorosamente as zonas seguras da interface do Instagram.
- **Referências:** Busca em `recursos/referencias/stories/` (prioridade) ou `recursos/referencias/` (geral).

### 7. 🎨 Criar Identidade Visual (`/criar-identidade-visual`)
- **Papel:** Diretor de Branding & Design System.
- **Como Acionar:** `/criar-identidade-visual` ou *"Estruture as cores, fontes e estilo visual da minha marca"*.
- **O que faz:** Gera `brandbook.md`, `design-system.md` e `tokens.css` para padronizar todas as criações futuras.

### 8. ⚙️ Configurar Instagram (`/configurar-instagram`)
- **Papel:** Engenheiro de Integração & Infraestrutura.
- **Como Acionar:** `/configurar-instagram` ou *"Configure a conexão com o Meta Graph API e GitHub Pages"*.
- **O que faz:** Validação do `.env`, conexão com Meta Graph API e fluxo seguro de publicação.

### 9. 📊 Análise de Métricas (`/analise-metricas`)
- **Papel:** Analista de BI e Performance Social.
- **Como Acionar:** `/analise-metricas` ou *"Analise os resultados das publicações deste mês"*.
- **O que faz:** Diagnóstico de alcance, engajamento, taxa de salvamentos e recomendações táticas.

---

## 🎁 Pacotes de Upgrade (Instalados Separadamente)

> As skills abaixo **não estão incluídas** no produto base. São pacotes de upgrade instalados como skills globais no Antigravity IDE.

### Pacote: Skills Agents Bônus (`skills-agents-bonus`)

| Agente | Comando | Função |
|---|---|---|
| **Diretor de Operações e Entregáveis** | `/gerador-de-entregaveis` | Empacotar posts e campanhas em PDF executivo, planilha CSV, showcase web e dossiê. |
| **Diretor de Inteligência Competitiva** | `/radar-concorrentes` | Investigação forense de mercado, dissecação de ganchos virais e brechas de posicionamento. |
| **Engenheiro de Consistência Visual** | `/consistencia-personagem` | Profiling antropométrico 360°, folha mestra e tokens âncora de prompt. |

### Pacote: Criativo Video Studio (`criativo-video-studio`)

| Agente | Comando | Função |
|---|---|---|
| **Diretor & Editor de Vídeo** | `/criar-video-reels` | Edição cinematográfica (Faceless & Talking Head), legendas karaokê e renderização Remotion. |
| **Roteirista Faceless** | `/roteirista-faceless` | Roteiros e direção de arte para vídeos sem rosto (B-rolls, infográficos, narrações de IA). |
| **Roteirista Talking Head** | `/roteirista-talking-head` | Roteiros formatados para teleprompter com ritmo de conversa e marcações de corte. |

> **Como instalar:** Siga as instruções em `INSTALACAO-1-CLIQUE.md` de cada pacote. As skills são instaladas globalmente em `~/.gemini/config/skills/` e ficam disponíveis via comandos de barra em qualquer workspace.
