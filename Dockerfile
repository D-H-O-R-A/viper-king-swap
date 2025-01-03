# Use a imagem Node.js oficial como base
FROM node:20.12.1

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e pnpm-lock.yaml para instalar dependências
COPY package.json pnpm-lock.yaml ./

# Instale o pnpm globalmente e as dependências do projeto
RUN npm install -g pnpm && pnpm install

# Copie todo o código para dentro do container
COPY . .

# Build do projeto
RUN pnpm build

# Exponha a porta do aplicativo
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["pnpm", "start"]
