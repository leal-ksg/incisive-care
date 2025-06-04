# Incisive Care

Sistema de agendamento de consultas odontológicas, com gerenciamento de clientes, serviços, dentistas e usuários.

## Estrutura do projeto

- `backend/`: API com Express, MongoDB e MySql.
- `frontend/`: Interface com Vite.
- `common/`: Validações compartilhadas entre front e back, com Yup.

## Execução do projeto

1. É necessário instalar as dependências na raiz, backend e frontend:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Configure as seguintes variáveis de ambiente:

   ```
   PORT
   MONGO_CONNECTION_STRING
   MYSQL_CONNECTION_STRING
   ACCESS_TOKEN_SECRET
   ADMIN_PASSWORD
   TEST_USER_PASSWORD
   ```

3. Inicie o servidor do mongo e o servidor do MySql

4. Inicie o backend:

   ```bash
   cd backend
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   npm run dev
   ```

   O backend irá rodar em `http://localhost:3001`.

5. Inicie o frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   O frontend irá rodar em `http://localhost:5173`.

---
