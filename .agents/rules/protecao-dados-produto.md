# 🛡️ Proteção de Dados do Produto (Regra Anti-Contaminação)

## Contexto
O repositório `criativo-ai-studio` é um **produto-template vendido para instalação em máquinas de outros usuários**.
Ele **NUNCA** deve conter dados reais de nenhum usuário — incluindo o próprio criador do produto.

## Regras Obrigatórias

1. **NUNCA insira dados pessoais reais no repositório de produto.**
   - Nomes de pessoas, empresas ou marcas reais
   - Handles de Instagram (@usuario), URLs de perfis
   - URLs de publicações reais (instagram.com/p/...)
   - IDs de mídia da Meta API (`media_id`, `permalink`)
   - Cores, fontes ou paletas específicas de um cliente
   - Fotos, logos, favicons ou referências visuais de um usuário
   - Relatórios de performance com dados reais
   - Planejamentos editoriais com datas e pautas reais
   - Briefs de produção com conteúdo específico

2. **Todos os templates devem usar placeholders genéricos:**
   - `[A PREENCHER]` — campos que o onboarding preenche
   - `[NOME_DO_USUARIO]` — nome do usuário corrente
   - `[@SEU_PERFIL]` — handle do Instagram do usuário
   - `[NOME_DA_MARCA]` — nome comercial da marca
   - `null` — valores YAML/JSON que serão preenchidos

3. **Diretórios de dados pessoais estão no `.gitignore`:**
   - `recursos/fotos/` — fotos do usuário
   - `recursos/logos/` — logos do usuário
   - `recursos/referencias/` — referências visuais do usuário
   - `recursos/personagens/` — perfis de personagens
   - `conteudos/relatorios/` — relatórios de performance

4. **Arquivos de produção são gerados em tempo de execução:**
   - Saídas em `saidas/` são criadas pelas skills durante uso
   - Prévias em `previas/` são geradas por automações
   - Briefs são criados pelo planejamento editorial
   - Estado do studio é atualizado pelo onboarding e publicações

5. **Diferencie PRODUTO e INSTÂNCIA:**
   - **Produto** = Este repositório Git = Template agnóstico com placeholders
   - **Instância** = Cópia instalada na máquina do usuário = Preenchida com dados reais via onboarding

## Consequências da Violação
Se dados reais vazarem para o produto, todos os usuários que fizerem `git pull` receberão dados pessoais de outro usuário — violando privacidade e destruindo a confiança no produto.
