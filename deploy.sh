#!/bin/bash

# Compila o projeto Angular para deploy. Caso você esteja
# utilizando o git bash, utilize duas barras // após --base-href.7
# Este comando gera ou atualiza a pasta /dist
ng build --prod --base-href /pinupload/

cp src/404.html dist/pinupload

# Adicionar a pasta /dist para ser enviada ao GitHub.
# A opção -f força a adição mesmo se o caminho estiver
# configurado no arquivo .gitignore
git add -f dist

# Commit com mensagem
git commit -m "$1"

# Envio dos arquivos para o servidor. Vamos enviar apenas
# os arquivos debaixo de /dist (subtree), ignorando o caminho
# /dist/pinupload no caminho do repositório. Os arquivos enviados
# sairão localmente do branch origin para o branch gh-pages remoto
git subtree push --prefix=dist/pinupload origin gh-pages
