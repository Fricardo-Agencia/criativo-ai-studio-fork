import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\b7315c77-d6b0-463e-a4db-f59e55159fd7';
const targetDir = path.resolve('saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos');
fs.mkdirSync(targetDir, { recursive: true });

const slides = [
  'carrossel_leads_01_1788532517686.jpg',
  'carrossel_leads_02_1788532560159.jpg',
  'carrossel_leads_03_v2_1788532654466.jpg',
  'carrossel_leads_04_v2_1788537748009.jpg',
  'carrossel_leads_05_v2_1788537817366.jpg',
  'carrossel_leads_06_v2_1788537891168.jpg',
  'carrossel_leads_07_v2_1788537969565.jpg'
];

slides.forEach((file, index) => {
  const src = path.join(brainDir, file);
  const slideNum = String(index + 1).padStart(2, '0');
  const dest = path.join(targetDir, `slide-${slideNum}.jpg`);
  fs.copyFileSync(src, dest);
  console.log(`Copiado: slide-${slideNum}.jpg`);
});

const publicacao = {
  id: 'POST-2026-09-04-13H30',
  slug: 'fluxo-ia-qualifica-leads-whatsapp-15-segundos',
  tipo: 'carrossel',
  formato: 'carrossel',
  dimensao: '1080x1350',
  pilar: 'Setups & Ferramentas de IA',
  criado_em: '2026-09-04T13:00:00-03:00',
  data_agendada: '2026-09-04T13:30:00-03:00',
  imagens: [
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-01.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-02.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-03.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-04.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-05.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-06.jpg',
    'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-07.jpg'
  ],
  slides: [
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-01.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-02.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-03.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-04.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-05.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-06.jpg' },
    { src: 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/slide-07.jpg' }
  ],
  legenda: `Estudos mostram que se a sua empresa demora mais de 5 minutos para responder um lead no WhatsApp, a chance dele fechar com você cai em até 80%.

O cliente moderno não espera 2 horas enquanto o vendedor está em reunião ou almoçando. Ele vai no Google e manda mensagem para o seu concorrente.

Neste carrossel, eu mostro a arquitetura exata do fluxo com IA que usamos para responder qualquer lead em 15 segundos, qualificar faturamento e agendar reuniões direto na agenda comercial.

Sem menu chato de "digite 1 ou 2", com conversa fluida e integração direta no CRM.

Arrasta para o lado para ver o blueprint completo.

👇 Quer o mapa desse fluxo no n8n e os prompts do agente? Comente LEAD aqui embaixo que te mando tudo no direct.

#EscolaDeFerramentas #IAparaNegócios #AgentesAutônomos #VendasB2B #WhatsAppMarketing #AutomaçãoComercial #IvanNogueira #n8n #EficiênciaOperacional`,
  titulo: 'O único fluxo de IA que qualifica leads no WhatsApp em 15 segundos',
  headline: 'O ÚNICO FLUXO DE IA QUE FAZ SUA EMPRESA QUALIFICAR LEADS NO WHATSAPP EM 15 SEGUNDOS.',
  cta: 'Comente LEAD para receber o blueprint no direct',
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
  path.join(targetDir, 'publicacao.json'),
  JSON.stringify(publicacao, null, 2),
  'utf8'
);
console.log('publicacao.json criado com sucesso!');
