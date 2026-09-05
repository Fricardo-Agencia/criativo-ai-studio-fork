import { readFile, writeFile } from 'node:fs/promises';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const caminhoPub = 'saidas/carrosseis/a-arte-do-carrossel-viral/publicacao.json';
const caminhoJob = 'runtime/fila/POST-2026-09-05-07H.json';

async function main() {
  const pubRaw = JSON.parse(await readFile(caminhoPub, 'utf8'));
  const pubValidada = await validarPublicacao(pubRaw);
  const fingerprint = await calcularFingerprint(pubValidada);

  const agora = new Date().toISOString();
  const job = {
    id: 'POST-2026-09-05-07H',
    codigo: 'POST-2026-09-05-07H',
    status: 'aprovado',
    criadoEm: agora,
    atualizadoEm: agora,
    publicacao: pubRaw,
    fingerprint,
    aprovadoPor: 'usuario',
    aprovadoEm: agora
  };

  await writeFile(caminhoJob, JSON.stringify(job, null, 2), 'utf8');
  console.log('Job criado com sucesso em', caminhoJob, 'com fingerprint:', fingerprint);
}

main().catch(console.error);
