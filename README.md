# Nekolingo

App gratuito para aprender inglês.

- `web/`: o app em si (site que também instala como app).
- `electron/`: versão para Windows, com atualização automática.
- `capacitor.config.json`: versão Android, que abre o site publicado.
- `.github/workflows/`: o GitHub gera tudo sozinho.

## Como lançar uma atualização

1. Mudar algo em `web/` e enviar para a branch `main`. O site e o app de celular atualizam sozinhos.
2. Para o app de PC avisar que tem versão nova, marcar uma versão nova (ex.: `v1.0.1`). O GitHub gera o instalador e o APK em "Releases".
