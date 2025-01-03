
# 🐍 Viper King Frontend

Este projeto contém os principais recursos da aplicação **Viper King**. Ele pode ser configurado e executado tanto com Docker quanto manualmente.

## 🚀 Pré-requisitos

Antes de começar, verifique se você possui as ferramentas abaixo instaladas:

- **Com Docker**:
  - Docker e Docker Compose

- **Sem Docker**:
  - Node.js v20.12.1
  - npm v10.9.0
  - pnpm (instalado globalmente)

---

## 🐳 Iniciando com Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sua-conta/viper-king-frontend.git
   cd viper-king-frontend
   ```

2. **Inicie os serviços**
   Execute o comando abaixo para construir e iniciar os containers:
   ```bash
   docker-compose up --build
   ```

3. **Acesse o aplicativo**
   O aplicativo estará disponível em `http://localhost:3000`.

4. **Parar os serviços**
   Para interromper os serviços, use:
   ```bash
   docker-compose down
   ```

---

## ⚙️ Iniciando sem Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/sua-conta/viper-king-frontend.git
   cd viper-king-frontend
   ```

2. **Instale as dependências**
   Certifique-se de que o pnpm esteja instalado globalmente:
   ```bash
   npm install -g pnpm
   pnpm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   pnpm dev
   ```

4. **Construa o projeto para produção**
   ```bash
   pnpm build
   ```

5. **Inicie o servidor em modo de produção**
   ```bash
   pnpm start
   ```

6. **Acesse o aplicativo**
   O aplicativo estará disponível em `http://localhost:3000`.

---

## 📝 Notas Adicionais

- **Configuração do Nginx**:
  - Se estiver usando Docker, o Nginx já estará configurado para servir a aplicação.
  - Caso precise configurar manualmente, utilize o arquivo de exemplo `nginx.conf` fornecido no repositório.

- **Logs do servidor**:
  - Com Docker: Utilize `docker logs <nome-do-container>` para visualizar os logs.
  - Sem Docker: Os logs serão exibidos no terminal durante a execução.

---

## 🛠 Contribuição

Se você deseja contribuir, por favor, consulte o [guia de contribuição](./CONTRIBUTING.md).

---

## 📄 Licença

Este projeto é distribuído sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais informações.
