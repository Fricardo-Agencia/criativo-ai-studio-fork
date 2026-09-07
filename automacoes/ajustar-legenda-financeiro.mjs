import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { calcularFingerprint } from './lib/fila.mjs';

async function main() {
  const caminhoPub = resolve('saidas/carrosseis/5-automacoes-com-ia-no-financeiro/publicacao.json');
  const caminhoJob = resolve('runtime/fila/POST-2026-09-06-13H30.json');

  const pub = JSON.parse(await readFile(caminhoPub, 'utf8'));

  pub.legenda = `Se a sua equipe ainda perde horas abrindo PDF de nota fiscal para digitar em ERP, cobrando cliente no WhatsApp no braço e caçando comprovante Pix em extrato bancário...

Você não tem uma operação financeira moderna. Você tem digitadores de luxo.

O setor financeiro é onde a IA traz o maior ROI imediato. Com 5 automações simples com agentes e webhooks, você corta 15h semanais e zera erros humanos:

1️⃣ OCR Inteligente de Notas: A NF chega em PDF ou foto. A IA extrai CNPJ, itens, impostos e vencimento em JSON e lança no seu ERP (Omie, Bling, Conta Azul, Totvs) em 10 segundos sem digitação.

2️⃣ Cobrança Preventiva Humanizada: Em vez de esperar vencer, o agente envia lembrete empático em D-3 e D-1 com o código Pix copia-e-cola. Reduz em média 68% da inadimplência.

3️⃣ Conciliação Pix em Tempo Real: No segundo em que o Pix cai, o webhook avisa o agente, que cruza o pagador com as faturas no CRM, dá baixa e envia o recibo em 3s.

4️⃣ DRE Diário às 07h: Sem esperar o dia 10 do mês seguinte para ver o resultado. A IA consolida entradas e saídas da véspera e manda o resumo antes do expediente.

5️⃣ Alerta Preditivo de Caixa: O agente simula as contas dos próximos 15 dias e avisa no WhatsApp se houver risco de descasamento financeiro.

---

📥 ENTREGÁVEL EXCLUSIVO:
Preparei um Dossiê Executivo em PDF com o mapa das ferramentas, os prompts de OCR e os templates de cobrança prontos para copiar e colar.

👉 Comente "FINANCEIRO" aqui embaixo que meu agente envia o PDF completo no seu Direct agora mesmo.

Salve para revisar com sua equipe. 📌

#EscolaDeFerramentas #InteligenciaArtificial #AutomacaoFinanceira #GestaoEmpresarial #IAparaNegocios #IvanNogueira #FinanceiroInteligente`;

  await writeFile(caminhoPub, JSON.stringify(pub, null, 2), 'utf8');

  const fp = await calcularFingerprint(pub);
  const job = JSON.parse(await readFile(caminhoJob, 'utf8'));
  job.status = 'aprovado';
  job.fingerprint = fp;
  job.publicacao.legenda = pub.legenda;
  delete job.erro;
  job.atualizadoEm = new Date().toISOString();
  await writeFile(caminhoJob, JSON.stringify(job, null, 2), 'utf8');

  console.log(`✓ Legenda atualizada! Tamanho: ${pub.legenda.length} caracteres.`);
  console.log(`✓ Fingerprint: ${fp}`);
}

main().catch(console.error);
