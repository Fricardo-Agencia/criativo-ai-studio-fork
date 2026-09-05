import fs from 'fs';
import path from 'path';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const raiz = process.cwd();
const posts = [
  'saidas/carrosseis/se-sua-empresa-perde-4h-em-planilhas/publicacao.json',
  'saidas/posts-individuais/usar-ia-para-copiar-e-colar-nao-e-automacao/publicacao.json'
];

for (const p of posts) {
  const raw = JSON.parse(fs.readFileSync(p, 'utf8'));
  const d = await validarPublicacao(raw, raiz);
  const fp = await calcularFingerprint(d, raiz);
  const id = String(d.id).toUpperCase();
  const filaFile = path.resolve('runtime/fila', `${id}.json`);
  
  const job = {
    id,
    codigo: id,
    status: 'aprovado',
    criadoEm: new Date().toISOString(),
    atualizadoEm: new Date().toISOString(),
    publicacao: raw,
    fingerprint: fp,
    aprovadoPor: 'antigravity-chat-local',
    aprovadoEm: new Date().toISOString()
  };

  fs.writeFileSync(filaFile, JSON.stringify(job, null, 2), 'utf8');
  console.log(`Job atualizado com fingerprint oficial: ${id} (${fp})`);
}
