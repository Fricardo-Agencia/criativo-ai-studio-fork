import { readFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { lerEnv } from './lib/arquivos.mjs';

const api = 'https://api.github.com';

async function requisitar(endpoint, token, options = {}, aceitar404 = false) {
  const resposta = await fetch(endpoint, {
    ...options,
    headers: {
      accept: 'application/vnd.github+json',
      authorization: `Bearer ${token}`,
      'user-agent': 'criativo-ai-studio',
      ...(options.headers || {})
    }
  });

  if (aceitar404 && resposta.status === 404) return null;

  if (!resposta.ok) {
    const detalhe = await resposta.text();
    throw new Error(`GitHub API ${resposta.status}: ${detalhe}`);
  }

  if (resposta.status === 204) return null;
  return resposta.json();
}

async function enviarArquivo({ owner, repo, branch, caminhoRemoto, bufferConteudo, token, mensagem }) {
  const endpoint = `${api}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${caminhoRemoto}`;
  const consulta = `${endpoint}?ref=${encodeURIComponent(branch)}`;

  let existente = null;
  try {
    existente = await requisitar(consulta, token, {}, true);
  } catch (err) {
    console.warn(`Aviso ao consultar arquivo existente: ${err.message}`);
  }

  const corpo = {
    message: mensagem,
    content: Buffer.from(bufferConteudo).toString('base64'),
    branch
  };
  if (existente?.sha) {
    corpo.sha = existente.sha;
  }

  await requisitar(endpoint, token, {
    method: 'PUT',
    body: JSON.stringify(corpo),
    headers: { 'content-type': 'application/json' }
  });
  console.log(`✓ Enviado com sucesso: ${caminhoRemoto}`);
}

async function main() {
  const raiz = resolve('.');
  const env = await lerEnv(join(raiz, '.env'));
  const owner = env.GITHUB_PAGES_OWNER;
  const repo = env.GITHUB_PAGES_REPO;
  const branch = env.GITHUB_PAGES_BRANCH || 'main';
  const token = env.GITHUB_PAGES_TOKEN;

  if (!owner || !repo || !token) {
    throw new Error('Configurações do GitHub Pages incompletas no .env');
  }

  const arquivosParaEnviar = [
    {
      local: 'saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.pdf',
      remoto: 'saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.pdf',
      msg: 'feat: add gabarito e checklist carrossel viral PDF'
    },
    {
      local: 'saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.html',
      remoto: 'saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.html',
      msg: 'feat: add gabarito e checklist carrossel viral HTML'
    }
  ];

  for (const item of arquivosParaEnviar) {
    console.log(`Lendo ${item.local}...`);
    const buffer = await readFile(join(raiz, item.local));
    console.log(`Tamanho: ${(buffer.length / 1024).toFixed(1)} KB. Enviando para GitHub Pages...`);
    await enviarArquivo({
      owner,
      repo,
      branch,
      caminhoRemoto: item.remoto,
      bufferConteudo: buffer,
      token,
      mensagem: item.msg
    });
  }

  const urlPdf = `https://${owner}.github.io/${repo}/saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.pdf`;
  const urlHtml = `https://${owner}.github.io/${repo}/saidas/carrosseis/a-arte-do-carrossel-viral/entregavel/gabarito-carrossel-viral.html`;

  console.log('\n--- URLs PÚBLICAS GERADAS ---');
  console.log(`PDF Download:  ${urlPdf}`);
  console.log(`HTML Interativo: ${urlHtml}`);
}

main().catch((err) => {
  console.error('Erro na sincronização:', err);
  process.exit(1);
});
