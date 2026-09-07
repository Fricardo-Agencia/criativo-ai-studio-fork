const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Normaliza a legenda para envio à Meta API.
 * Converte sequências literais \\n em quebras de linha reais (\n).
 * Remove espaços em branco desnecessários no início/fim.
 */
export function normalizarLegenda(texto) {
  if (!texto) return '';
  return String(texto)
    .replace(/\\n/g, '\n')   // \\n literal → newline real
    .replace(/\r\n/g, '\n')  // CRLF → LF
    .replace(/\r/g, '\n')    // CR → LF
    .trim();
}

async function chamar(fetchFn, url, opcoes = {}) {
  const resposta = await fetchFn(url, opcoes);
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok || dados.error) {
    const detalhe = dados.error?.message || dados.error?.error_user_msg || '';
    throw new Error(`Meta API recusou a operação (${dados.error?.code || resposta.status}): ${detalhe}`);
  }
  return dados;
}

export async function publicarNaMeta({ fetchFn = fetch, apiVersion, instagramId, token, urls, legenda, tipo = 'post' }) {
  const legendaNormalizada = normalizarLegenda(legenda);
  const base = `https://graph.facebook.com/${apiVersion}`;
  const post = (rota, campos) =>
    chamar(fetchFn, `${base}/${rota}`, {
      method: 'POST',
      body: new URLSearchParams({ ...campos, access_token: token })
    });

  let container;
  if (tipo === 'story' || tipo === 'stories') {
    console.log('Enviando container de Stories...');
    container = (await post(`${instagramId}/media`, { image_url: urls[0], media_type: 'STORIES' })).id;
  } else if (urls.length === 1) {
    console.log('Enviando container de post individual...');
    container = (await post(`${instagramId}/media`, { image_url: urls[0], caption: legendaNormalizada })).id;
  } else {
    const filhos = [];
    console.log(`Enviando ${urls.length} slides do carrossel para a Meta API...`);
    for (let idx = 0; idx < urls.length; idx++) {
      const image_url = urls[idx];
      console.log(`- Registrando slide ${idx + 1}/${urls.length}...`);
      const item = await post(`${instagramId}/media`, { image_url, is_carousel_item: 'true' });
      filhos.push(item.id);
    }
    console.log('Aguardando processamento dos containers filhos...');
    for (let i = 0; i < filhos.length; i++) {
      const idFilho = filhos[i];
      for (let t = 0; t < 12; t++) {
        const est = await chamar(fetchFn, `${base}/${idFilho}?fields=status_code`, {
          headers: { authorization: `Bearer ${token}` }
        });
        if (est.status_code === 'FINISHED') {
          console.log(`  ✓ Slide ${i + 1} (${idFilho}): FINISHED`);
          break;
        }
        if (est.status_code === 'ERROR') throw new Error(`A Meta informou erro ao processar item do carrossel (${idFilho}).`);
        if (t === 11) throw new Error(`Tempo esgotado aguardando o item do carrossel (${idFilho}).`);
        await esperar(2000);
      }
    }
    console.log('Criando container pai do Carrossel com legenda...');
    container = (await post(`${instagramId}/media`, { media_type: 'CAROUSEL', children: filhos.join(','), caption: legendaNormalizada })).id;
    console.log(`Container do carrossel criado: ${container}`);
  }

  console.log('Aguardando container principal atingir FINISHED...');
  for (let tentativa = 0; tentativa < 12; tentativa++) {
    const estado = await chamar(fetchFn, `${base}/${container}?fields=status_code`, {
      headers: { authorization: `Bearer ${token}` }
    });
    if (estado.status_code === 'FINISHED') {
      console.log('✓ Container principal FINISHED!');
      break;
    }
    if (estado.status_code === 'ERROR') throw new Error('A Meta informou erro ao processar a mídia.');
    if (tentativa === 11) throw new Error('Tempo esgotado aguardando o processamento da mídia.');
    await esperar(5000);
  }

  console.log('Disparando publicação final via media_publish...');
  const mediaId = (await post(`${instagramId}/media_publish`, { creation_id: container })).id;
  const publicado = await chamar(fetchFn, `${base}/${mediaId}?fields=id,permalink`, {
    headers: { authorization: `Bearer ${token}` }
  });
  console.log(`✓ Publicado com sucesso! Permalink: ${publicado.permalink || mediaId}`);
  return { mediaId, permalink: publicado.permalink || '' };
}
