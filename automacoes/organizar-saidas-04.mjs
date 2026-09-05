import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\b7315c77-d6b0-463e-a4db-f59e55159fd7';
const targetCarrosselDir = path.resolve('saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas');
const targetPostDir = path.resolve('saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao');

fs.mkdirSync(targetCarrosselDir, { recursive: true });
fs.mkdirSync(targetPostDir, { recursive: true });

const carrosselSlides = [
  'carrossel_planilhas_01_1788519737189.jpg',
  'carrossel_planilhas_02_1788519754736.jpg',
  'carrossel_planilhas_03_v2_1788519802181.jpg',
  'carrossel_planilhas_04_1788519840598.jpg',
  'carrossel_planilhas_05_1788519867452.jpg',
  'carrossel_planilhas_06_1788519899100.jpg',
  'carrossel_planilhas_07_1788519932669.jpg'
];

carrosselSlides.forEach((file, index) => {
  const src = path.join(brainDir, file);
  const slideNum = String(index + 1).padStart(2, '0');
  const dest = path.join(targetCarrosselDir, `slide-${slideNum}.jpg`);
  fs.copyFileSync(src, dest);
  console.log(`Copiado: slide-${slideNum}.jpg`);
});

const postFile = 'post_individual_04_17h_1788519970053.jpg';
fs.copyFileSync(path.join(brainDir, postFile), path.join(targetPostDir, 'slide-01.jpg'));
console.log('Copiado: post individual slide-01.jpg');

// Criar publicacao.json para o carrossel
const publicacaoCarrossel = {
  id: 'POST-2026-09-04-09H',
  slug: 'se-sua-empresa-perde-4h-em-planilhas',
  tipo: 'carrossel',
  formato: 'carrossel',
  dimensao: '1080x1350',
  pilar: 'Comparações & Antes vs Depois',
  criado_em: '2026-09-04T08:00:00-03:00',
  data_agendada: '2026-09-04T09:00:00-03:00',
  imagens: [
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-01.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-02.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-03.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-04.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-05.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-06.jpg',
    'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-07.jpg'
  ],
  slides: [
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-01.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-02.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-03.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-04.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-05.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-06.jpg' },
    { src: 'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/slide-07.jpg' }
  ],
  legenda: `Se a sua equipe ainda gasta horas da semana copiando dados entre telas, corrigindo fórmulas quebradas e consolidando planilhas, você está pagando caro pela pior ineficiência operacional de 2026.

Colocar profissionais inteligentes para fazer papel de "cabo USB" entre o seu CRM e seu ERP destrói a margem do negócio e sobrecarrega quem deveria estar vendendo e atendendo clientes.

Arrasta para o lado para ver o comparativo real entre o modelo manual antigo e como um agente autônomo opera essa rotina em 3 segundos.

Quer receber a arquitetura completa, o fluxo de automação e os prompts que usamos para rodar esse agente na prática?

👇 Comente AGENTE aqui embaixo que eu te envio o blueprint completo direto no seu direct.

#IAparaNegócios #AgentesAutônomos #EscolaDeFerramentas #AutomaçãoInteligente #IvanNogueira #EficiênciaOperacional #TransformaçãoDigital #GestãoComIA #ProdutividadeB2B`,
  titulo: 'Se a sua empresa ainda perde 4h/dia em planilhas, instala esse agente',
  headline: 'SE A SUA EMPRESA AINDA PERDE 4H POR DIA EM PLANILHAS, INSTALA ESSE AGENTE.',
  cta: 'Comente AGENTE para receber o blueprint no direct',
  identidade_visual: {
    tema: 'editorial_quente',
    cor_fundo: '#F3EDE2',
    cor_destaque: '#C84C0C',
    cor_texto: '#1A1A1A',
    fonte_titulo: 'Inter',
    fonte_texto: 'DM Sans'
  },
  status: 'aprovado',
  aprovacao_visual: 'aprovado',
  aprovacao_publicacao: 'aprovado'
};

fs.writeFileSync(
  path.join(targetCarrosselDir, 'publicacao.json'),
  JSON.stringify(publicacaoCarrossel, null, 2)
);
console.log('publicacao.json criado para o carrossel');

// Criar publicacao.json para o post individual
const publicacaoPost = {
  id: 'POST-2026-09-04-17H',
  slug: 'usar-ia-para-copiar-e-colar-nao-e-automacao',
  tipo: 'post-individual',
  formato: 'post-individual',
  dimensao: '1080x1350',
  pilar: 'Playbooks & Bastidores',
  criado_em: '2026-09-04T08:00:00-03:00',
  data_agendada: '2026-09-04T17:00:00-03:00',
  imagens: [
    'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/slide-01.jpg'
  ],
  slides: [
    { src: 'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/slide-01.jpg' }
  ],
  legenda: `Muitos empresários dizem com orgulho: "Nossa empresa já usa inteligência artificial".

Aí você entra na rotina e descobre o que eles realmente fazem:
O funcionário abre uma aba no navegador, pensa em um prompt, espera o texto ser gerado, revisa, copia com Ctrl+C e cola com Ctrl+V dentro do CRM ou do e-mail.

Se o processo precisa de uma pessoa clicando e esperando a tela carregar a cada etapa, isso não é automação. É apenas uma ferramenta de apoio que virou mais um item para sobrecarregar a lista de afazeres diários.

A virada de chave para 2026 é entender a diferença entre:
→ Usar IA: Você lembra de abrir a ferramenta quando sobra tempo.
→ Ter IA Implementada: Ela monitora eventos, valida regras, dispara ações e concilia dados nos bastidores sem ninguém pedir.

Você não precisa ser o operador da IA. Você precisa ser o gestor da inteligência do seu negócio.

Quantas horas da semana você ou sua equipe ainda perdem fazendo trabalho de "cabo USB" entre ferramentas?

Comente abaixo ou me mande uma mensagem no direct se quiser descobrir onde os agentes podem ser implementados na sua empresa.

#EscolaDeFerramentas #IAparaNegócios #AgentesAutônomos #AutomaçãoInteligente #EficiênciaOperacional #IvanNogueira #TransformaçãoDigital #GestãoEmpresarial #ProdutividadeB2B`,
  titulo: 'Usar IA para copiar e colar respostas no chat não é automação',
  headline: 'USAR IA PARA FICAR COPIANDO E COLANDO RESPOSTAS DO CHAT NÃO É AUTOMAÇÃO. É SÓ MAIS UMA TAREFA MANUAL NA SUA AGENDA.',
  cta: 'Quantas horas seu time perde com tarefas manuais? Comente aqui embaixo.',
  identidade_visual: {
    tema: 'editorial_quente',
    cor_fundo: '#F3EDE2',
    cor_destaque: '#C84C0C',
    cor_texto: '#111111',
    fonte_titulo: 'Inter',
    fonte_texto: 'DM Sans'
  },
  status: 'aprovado',
  aprovacao_visual: 'aprovado',
  aprovacao_publicacao: 'aprovado'
};

fs.writeFileSync(
  path.join(targetPostDir, 'publicacao.json'),
  JSON.stringify(publicacaoPost, null, 2)
);
console.log('publicacao.json criado para o post individual');
