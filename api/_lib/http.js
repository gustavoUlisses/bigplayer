// Lê o corpo de uma resposta HTTP como JSON de forma tolerante:
// se vier vazio ou malformado, devolve {} em vez de lançar erro.
export async function readJson(response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
