# 🤖 Diretório de Agentes e Habilidades — Criativo AI Studio

Este documento lista todos os Agentes Especialistas de IA disponíveis no Criativo AI Studio, incluindo as habilidades nativas e as **3 novas Skills Bônus de Alta Performance**.

---

## 🎁 Agentes Bônus Recém-Instalados

| Agente / Especialista | Comandos de Barra | Função Principal | Saídas / Artefatos |
|---|---|---|---|
| **Diretor de Operações e Entregáveis** | `/gerador-de-entregaveis` | Empacotar posts, carrosséis e campanhas em apresentações executivas para clientes e aprovação formal. | PDF Executivo A4, Planilha CSV/Excel, Showcase Web Interativo, Dossiê Markdown |
| **Diretor de Inteligência Competitiva** | `/radar-concorrentes`<br>`/engenharia-reversa-concorrentes` | Investigação forense de mercado, dissecação de ganchos virais, análise de esteiras e brechas de posicionamento. | Dossiê de Contra-Ataque com 10-15 pautas acionáveis (`TEMPLATE-RELATORIO-CONCORRENTES.md`) |
| **Engenheiro de Consistência Visual** | `/consistencia-personagem` | Profiling antropométrico facial e corporal, geração de folha mestre 360° em alta definição e tokens âncora de prompt. | `PERSONAGEM.md`, `consistencia.json`, folha mestra `folha-consistencia-mestre.png` (2048x2048px) |

---

## 🧭 Todos os Agentes Disponíveis no Estúdio

### 1. 📄 Gerador de Entregáveis (`/gerador-de-entregaveis`)
- **Papel:** Diretor de Operações e Entregáveis Estratégicos.
- **Como Acionar:** `/gerador-de-entregaveis` ou *"Gere um deck em PDF para apresentar este carrossel ao cliente"*.
- **O que faz:** Transforma artes e legendas em documentos de validação com mockups reais de smartphone, controle de versão e campo de assinatura.
- **Automação:** `node .agents/skills/gerador-de-entregaveis/scripts/compilar-entregavel.mjs`.

### 2. 🕵️ Engenharia Reversa de Concorrentes (`/radar-concorrentes`)
- **Papel:** Diretor Sênior de Inteligência Competitiva.
- **Como Acionar:** `/radar-concorrentes` ou `/engenharia-reversa-concorrentes` ou *"Investigue os 3 maiores players do meu nicho"*.
- **O que faz:** Autópsia de 6 pilares: ganchos virais, estrutura de carrosséis, brechas estéticas, funil de direct/vendas e mapeamento de dores nos comentários.

### 3. 👤 Consistência de Personagem (`/consistencia-personagem`)
- **Papel:** Engenheiro de Consistência Visual & Diretor de Casting Digital.
- **Como Acionar:** `/consistencia-personagem` ou *"Quero criar um avatar fixo para a minha marca sem que o rosto mude entre os posts"*.
- **O que faz:** Entrevista antropométrica, gera folha mestra de 13 painéis com iluminações, expressões e turnaround 360°, e alimenta `PERSONAGEM.md` consumido pelos geradores de arte.
- **Automação:** `python .agents/skills/consistencia-personagem/scripts/montar-folha-consistencia.py`.

### 4. 📅 Planejamento Editorial (`/planejar-conteudo`)
- **Papel:** Estrategista de Conteúdo.
- **Como Acionar:** `/planejar-conteudo` ou *"Planeje meu calendário editorial para os próximos 15 dias"*.
- **O que faz:** Define pilares, formatos ideais (feed, carrossel, reels, stories) e frequência baseada na maturidade do perfil.

### 5. ✍️ Copywriter Instagram (`/copywriter-instagram`)
- **Papel:** Redator Publicitário de Resposta Direta.
- **Como Acionar:** `/copywriter-instagram` ou *"Escreva a legenda desse post com foco em salvar e compartilhar"*.
- **O que faz:** Cria headlines com alto poder de clique, estruturação AIDA/PAS e CTAs estratégicas.

### 6. 🖼️ Post Individual (`/criar-post-individual`)
- **Papel:** Designer e Diretor de Arte para Feed.
- **Como Acionar:** `/criar-post-individual` ou *"Crie um post estático 1080x1350 sobre meu serviço"*.
- **O que faz:** Gera artes em proporção 3:4 (1080×1350) com hierarquia visual clara, tipografia e iluminação premium.

### 7. 📚 Criar Carrossel (`/criar-carrossel`)
- **Papel:** Designer de Narrativas Visuais Sequenciais.
- **Como Acionar:** `/criar-carrossel` ou *"Desenvolva um carrossel educativo de 6 slides"*.
- **O que faz:** Produz carrosséis com transição contínua entre slides e retenção visual calculada.

### 8. 🎯 Post Anúncio (`/criar-post-anuncio`)
- **Papel:** Especialista em Criativos de Alta Conversão.
- **Como Acionar:** `/criar-post-anuncio` ou *"Crie um anúncio de tráfego pago focado em captação de leads"*.
- **O que faz:** Desenvolve variações de criativos testáveis para campanhas do Meta Ads.

### 9. 📱 Gerar Stories (`/gerar-stories`)
- **Papel:** Designer de Conteúdo Vertical.
- **Como Acionar:** `/gerar-stories` ou *"Crie 3 stories em sequência para abrir uma caixinha de perguntas"*.
- **O que faz:** Layouts verticais 9:16 (1080×1920) respeitando rigorosamente as zonas seguras da interface do Instagram.

### 10. 🎨 Criar Identidade Visual (`/criar-identidade-visual`)
- **Papel:** Diretor de Branding & Design System.
- **Como Acionar:** `/criar-identidade-visual` ou *"Estruture as cores, fontes e estilo visual da minha marca"*.
- **O que faz:** Gera `brandbook.md`, `design-system.md` e `tokens.css` para padronizar todas as criações futuras.

### 11. ⚙️ Configurar Instagram (`/configurar-instagram`)
- **Papel:** Engenheiro de Integração & Infraestrutura.
- **Como Acionar:** `/configurar-instagram` ou *"Configure a conexão com o Meta Graph API e GitHub Pages"*.
- **O que faz:** Validação do `.env`, conexão com Meta Graph API e fluxo seguro de publicação.

### 12. 📊 Análise de Métricas (`/analise-metricas`)
- **Papel:** Analista de BI e Performance Social.
- **Como Acionar:** `/analise-metricas` ou *"Analise os resultados das publicações deste mês"*.
- **O que faz:** Diagnóstico de alcance, engajamento, taxa de salvamentos e recomendações táticas.

### 13. 🎬 Diretor & Editor de Vídeo — Criativo Video Studio (`/criar-video-reels`)
- **Papel:** Diretor de Arte e Editor de Vídeo Cinematográfico (Faceless & Talking Head).
- **Como Acionar:** `/criar-video-reels` ou *"Crie um vídeo Reels a partir deste áudio/gravação"*.
- **O que faz:** Transcrição rápida via Whisper Groq Cloud, direção de arte visual (B-rolls Pexels 9:16 e assets de cinema), legendas dinâmicas estilo karaokê e renderização Remotion em 1080×1920.
- **Automação:** `npm run video:preview`, `npm run video:render`, `npm run video:transcrever`.
