import fs from 'fs';
import path from 'path';
import { calcularFingerprint } from './lib/fila.mjs';
import { validarPublicacao } from './publicar-instagram.mjs';

const raiz = process.cwd();
const file = 'saidas/carrosseis/fluxo-ia-qualifica-leads-whatsapp-15-segundos/publicacao.json';

const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
const d = await validarPublicacao(raw, raiz);
const fp = await calcularFingerprint(d, raiz);
const id = String(d.id).toUpperCase();
const filaFile = path.resolve('runtime/fila', `${id}.json`);

const now = new Date().toISOString();
const job = {
  id,
  codigo: id,
  status: 'aprovado',
  criadoEm: now,
  atualizadoEm: now,
  publicacao: raw,
  fingerprint: fp,
  aprovadoPor: 'antigravity-chat-local',
  aprovadoEm: now
};

fs.writeFileSync(filaFile, JSON.stringify(job, null, 2), 'utf8');
console.log(`Job registrado na fila: ${id} (${fp})`);
