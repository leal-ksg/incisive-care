# Incisive Care

Sistema de agendamento de consultas odontológicas, com gerenciamento de clientes, serviços, dentistas e usuários.

## Estrutura do projeto

- `backend/`: API com Express, MongoDB e MySql.
- `frontend/`: Interface com Vite.
- `common/`: Validações compartilhadas entre front e back, com Yup.

## Execução do projeto

1. É necessário instalar as dependências na raiz, backend e frontend:
   ```
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```
2. Inicie o servidor do mongo na porta padrão 27017, e o servidor do MySql na porta padrão 3306

3. Inicie o backend:

   ```
   cd backend
   npm run dev
   ```

   O backend irá rodar em `http://localhost:3001`.

4. Inicie o frontend:
   ```
   cd frontend
   npm run dev
   ```
   O frontend irá rodar em `http://localhost:5173`.

---
