# Nuvant Performance — Landing Page

Landing page estática para publicação na Vercel.

## Estrutura

```
.
├── index.html          # Marcação semântica da página
├── css/
│   └── styles.css      # Estilos globais (design tokens em :root)
├── js/
│   └── main.js         # Comportamento do modal de contato e do formulário
├── assets/
│   └── img/
│       └── pedro-abreu.jpg
└── vercel.json          # Configuração de hospedagem estática
```

A imagem do fundador foi extraída do HTML (antes embutida em base64, ~250 KB)
e otimizada para um arquivo JPEG real de ~11 KB, reduzindo o peso total da
página e permitindo cache de asset pelo navegador/CDN.

## Deploy

Este projeto não requer build — é servido como site estático.

1. Importe o repositório no [Vercel](https://vercel.com/new).
2. Não é necessário configurar comando de build nem diretório de output; o Vercel detecta `index.html` automaticamente.
3. Deploy.

## Desenvolvimento local

Basta abrir `index.html` no navegador, ou servir a pasta com qualquer servidor estático, por exemplo:

```bash
npx serve .
```

## Pendências antes de publicar

- Conectar o formulário de contato (`js/main.js`) a um webhook real (ex.: n8n).
- Substituir as métricas em branco dos cases (seção `#cases`) por números reais.
- Substituir os placeholders de logo na seção de clientes por logos reais.
