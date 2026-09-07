# Ficha de Consistência de Persona: Ivan Nogueira

> **Identificador Único:** `ivan-nogueira`  
> **Tipo:** Pessoa Real (Criador & Especialista em IA — @escoladeferramentas)  
> **Data de Criação:** 2026-09-06  
> **Status:** Ativo & Travado para Produção  

---

## 1. Antropometria & DNA Visual

### Características Faciais
- **Gênero & Idade Aparente:** Homem, 38 a 42 anos
- **Etnia & Tom de Pele:** Latino / Moreno claro / Pardo brasileiro, tom de pele avelã clara uniforme com subtons quentes
- **Formato do Rosto:** Oval / levemente arredondado com mandíbula suavemente definida e queixo firme
- **Olhos:** Castanho-escuros profundos, amendoados com olhar focado, calmo e seguro; discretas bolsas infraorbitais naturais que expressam maturidade e autoridade analítica
- **Nariz & Boca:** Nariz proporcional de base média e ponta arredondada; lábios simétricos bem desenhados e boca fechada em postura resoluta
- **Cabelo:** Curto, textura crespa/ondulada compacta, cor castanho-escuro/preto natural, corte executivo limpo com laterais aparadas
- **Pelos Faciais / Barba:** Barba completamente feita (clean-shaven) com acabamento impecável
- **Marcas Distintivas:** Postura de escuta ativa e autoridade executiva serena; olhar direto e firme para a lente

### Biotipo Corporal
- **Altura Estimada:** 1,78m a 1,80m
- **Porte Físico:** Gordinho / Robusto encorpado (~100 kg), silhueta cheia e arredondada, ombros largos e postura firme
- **Peso Declarado:** 100 kg

---

## 2. Guarda-Roupa Âncora (Signature Outfits)

### Traje Principal (Signature Look — Minimalista Dark Executivo)
- **Parte Superior:** Camiseta básica preta lisa de gola redonda (crew neck) de alta gramatura e caimento sob medida
- **Parte Inferior:** Calça de alfaiataria preta clássica com caimento reto
- **Calçados:** Sapatos sociais pretos minimalistas de couro fosco
- **Acessórios:** Nenhum (sem relógio, sem pulseiras, sem óculos, punhos livres)

### Traje Secundário (Business Casual)
- **Descrição:** Camiseta básica preta sob blazer estruturado cinza chumbo ou preto, calça de alfaiataria preta e calçados minimalistas escuros

---

## 3. Ativos Visuais Vinculados
- **Folha Mestra de Consistência (Grid 360°):** `folha-consistencia-mestre.png`
- **Rosto Neutro de Referência (Face Master):** `rosto-neutro-master.png`
- **Painéis Individuais das Tomadas:** `paineis/r1_1.png` a `paineis/r3_5.png`

---

## 4. Prompts de Injeção Automática

### Prompt Positivo para Injetar em Todos os Agentes:
```text
Ivan Nogueira, a 39-year-old Latin Brazilian male with short dark curly textured hair, smooth light hazelnut skin with warm undertones, oval rounded face, focused dark brown almond eyes, clean-shaven smooth skin without beard or stubble, chubby stocky rounded heavy-set build, solid frame, 100kg, 1.79m height. Wearing a plain premium black crewneck t-shirt with tailored fit, black tailored dress trousers, minimalist black dress shoes, no watch, bare wrists, no accessories or jewelry. Calm commanding authority, executive dark studio backdrop, soft directional studio lighting, highly photorealistic 8k, exact character facial identity and anatomy matching attached master sheet.
```

### Negative Prompt Obrigatório:
```text
beard, stubble, mustache, facial hair, watch, wrist accessories, jewelry, glasses, slender build, skinny, thin body, deformed face, asymmetrical eyes, missing fingers, extra fingers, altered hairline, changing age, deformed body proportions, blurry facial features, cartoon, distorted limbs, mutated hands, multiple heads, unrealistic skin texture, light eyes, blond hair.
```

---

## 5. Instruções para os Agentes do Studio
Ao produzir imagens para este personagem:
1. Sempre passe `recursos/personagens/ivan-nogueira/folha-consistencia-mestre.png` no array `ImagePaths`.
2. Inclua o bloco de prompt positivo no início de cada instrução de geração.
3. Mantenha os traços anatômicos e o estilo executivo dark premium da marca em todas as publicações.
