import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const imgOrigem = 'C:/Users/USER/.gemini/antigravity-ide/brain/b7315c77-d6b0-463e-a4db-f59e55159fd7/post_individual_software_vs_agentes_1788606302754.jpg';
const pastaDestino = 'saidas/posts-individuais/software-engessado-vs-agentes-sob-medida';
const imgDestino = `${pastaDestino}/slide-01.jpg`;
const caminhoPub = `${pastaDestino}/publicacao.json`;
const caminhoJob = 'runtime/fila/POST-2026-09-05-17H.json';

async function main() {
  console.log('Copiando e redimensionando slide-01.jpg para 1080x1350...');
  const inputBuf = await readFile(imgOrigem);
  const outBuf = await sharp(inputBuf)
    .resize(1080, 1350, { fit: 'cover', position: 'center' })
    .jpeg({ quality: 95 })
    .toBuffer();
  await writeFile(imgDestino, outBuf);
  console.log('Imagem salva com sucesso em:', imgDestino);

  const legenda = `Toda empresa que cresce passa pelo mesmo trauma:

Contrata um software de prateleira caro prometendo resolver tudo. Três meses depois, descobre que:
1. O sistema não conversa com o ERP legado;
2. Para alterar um campo simples, o suporte cobra R$ 5.000 e pede 45 dias;
3. O time cria planilhas paralelas no Google Sheets para contornar as travas da ferramenta.

No final, você não comprou uma solução. Você comprou um novo chefe para a sua equipe, que dita como o seu negócio deve funcionar.

A era dos Agentes de IA sob medida inverte completamente essa dinâmica:

❌ Software de Prateleira Tradicional:
→ Você adapta o seu processo às limitações da plataforma.
→ Paga mensalidades inflacionadas por dezenas de botões que ninguém usa.
→ Depende de tickets lentos para qualquer ajuste fino.

✔️ Agentes de IA Sob Medida:
→ O agente é treinado nas regras exatas da sua empresa.
→ Conecta diretamente no seu banco de dados, CRM e WhatsApp sem intermediários.
→ Se a sua regra muda na sexta-feira, o agente se adapta em 5 minutos.

Empresas com margem alta não tentam enfiar um processo único dentro de uma caixa padrão. Elas constroem inteligência proprietária.

Qual é a maior gambiarra que a sua operação foi obrigada a criar por causa de um software que não atendia o que vocês precisavam?

Comente aqui embaixo ou salve este post para a próxima reunião de diretoria.

#EscolaDeFerramentas #InteligenciaArtificial #AgentesSobMedida #EficienciaOperacional #GestaoEmpresarial #TecnologiaB2B #IvanNogueira #TransformacaoDigital #ProdutividadeCorporativa`;

  const pub = {
    id: 'POST-2026-09-05-17H',
    slug: 'software-engessado-vs-agentes-sob-medida',
    tipo: 'post-individual',
    formato: 'post-individual',
    dimensao: '1080x1350',
    pilar: 'Comparações & Antes vs Depois (VS)',
    criado_em: '2026-09-05T08:00:00-03:00',
    data_agendada: '2026-09-05T17:00:00-03:00',
    imagens: [imgDestino],
    slides: [{ src: imgDestino }],
    legenda,
    titulo: 'Software engessado vs. Agentes sob medida: onde você perde mais margem',
    headline: 'SOFTWARE ENGESSADO OBRIGA SUA EMPRESA A MUDAR DE PROCESSO. AGENTES SOB MEDIDA APRENDEM A SUA REGRA DE NEGÓCIO.',
    cta: 'Comente ou salve para consultar com a diretoria',
    identidade_visual: {
      tema: 'editorial_bege_quente',
      cor_fundo: '#F4EFEA',
      cor_destaque: '#D34E23',
      cor_texto: '#111111',
      fonte_titulo: 'Anton',
      fonte_texto: 'Inter'
    },
    status: 'aprovado',
    aprovacao_visual: 'aprovado',
    aprovacao_publicacao: 'aprovado',
    urlsPublicas: [
      'https://navibotlab.github.io/meu-social-midia/saidas/posts-individuais/software-engessado-vs-agentes-sob-medida/slide-01.jpg'
    ],
    previewPublico: 'https://navibotlab.github.io/meu-social-midia/previas/software-engessado-vs-agentes-sob-medida.html'
  };

  await writeFile(caminhoPub, JSON.stringify(pub, null, 2), 'utf8');

  // Gerar prévia HTML
  const template = await readFile('templates/preview-instagram.html', 'utf8');
  let html = template
    .replaceAll('{{TITLE}}', pub.titulo)
    .replaceAll('{{USERNAME}}', 'escoladeferramentas')
    .replaceAll('{{CAPTION}}', pub.legenda.replace(/\n/g, '<br>'))
    .replaceAll('{{LIKES}}', '1.240 curtidas')
    .replaceAll('{{TIME_LABEL}}', 'HÁ 1 HORA')
    .replaceAll('{{SLIDES_JSON}}', JSON.stringify(['../' + imgDestino]));
  await writeFile('previas/software-engessado-vs-agentes-sob-medida.html', html, 'utf8');
  console.log('Prévia HTML gerada.');

  // Validar e calcular fingerprint
  const pubValidada = await validarPublicacao(pub);
  const fingerprint = await calcularFingerprint(pubValidada);

  const agora = new Date().toISOString();
  const job = {
    id: 'POST-2026-09-05-17H',
    codigo: 'POST-2026-09-05-17H',
    status: 'aprovado',
    criadoEm: agora,
    atualizadoEm: agora,
    publicacao: pub,
    fingerprint,
    aprovadoPor: 'sistema-autonomo',
    aprovadoEm: agora
  };

  await writeFile(caminhoJob, JSON.stringify(job, null, 2), 'utf8');
  console.log('Job 17h criado na fila com fingerprint:', fingerprint);
}

main().catch(console.error);
