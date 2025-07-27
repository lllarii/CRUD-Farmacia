# 🏥 Projeto Backend | Farmácia

## 📌 Visão Geral

Este projeto é uma API backend para gerenciamento de produtos de uma farmácia, construída em **NestJS** com **TypeScript**, seguindo estrutura modular e arquitetura **REST**. O sistema permite operações completas de **CRUD** para categorias e produtos, com validações e testes unitários com Jest para garantir a integridade do comportamento da aplicação.

---

## 🚑 Objetivos

- Permitir o cadastro, listagem, atualização e exclusão de itens.  
- Garantir que todo produto esteja associado a uma categoria.
- Implementar rotas claras e funcionais conforme protocolo HTTP.   
- Testar o comportamento da aplicação via testes unitários.

---

## 🧬 Tecnologias Utilizadas

- **Node.js / TypeScript**  
- **NestJS** (estrutura modular com controllers, services e entities)  
- **MySQL** e SQLite (para testes)
- **TypeORM** para interagir com banco de dados relacional
- **Validações** com Class Validator 
- **Testes unitários** com Jest e Supertest, simulando a aplicação real

---

## 📁 Endpoints REST Principais

### 📦 Categorias

- `GET /categorias` — Lista todas as categorias  
- `GET /categorias/:id` — Retorna uma categoria específica ao buscar pelo ID
- `GET /categorias/:categoria` — Retorna uma categoria específica ao buscar pelo nome da categoria
- `POST /categorias` — Cria uma nova categoria  
- `PUT /categorias/:id` — Atualiza uma categoria existente  
- `DELETE /categorias/:id` — Remove uma categoria  

> Implementadas via camadas service e controller específicas do módulo de categorias.

### 💊 Produtos

- `GET /produtos` — Lista todos os produtos  
- `GET /produtos/:id` — Retorna um produto específico  
- `GET /produtos/nome/:nome` — Busca produtos por nome  
- `GET /produtos/descricao/:descricao` — Busca produtos por descrição  
- `GET /produtos/marca/:marca` — Busca produtos por marca  
- `GET /produtos/ordem/maior` — Lista produtos ordenados por preço decrescente  
- `GET /produtos/ordem/menor` — Lista produtos ordenados por preço crescente  
- `POST /produtos` — Cria um novo produto vinculado a uma categoria  
- `PUT /produtos/:id` — Atualiza um produto existente  
- `PUT /produtos/:marca` — Aplica desconto de 10% a todos os produtos de uma marca  
- `PUT /produtos/categoria/:categoria` — Aplica desconto de 10% a todos os produtos de uma categoria  
- `PUT /produtos/cupom/:id` — Aplica desconto de 15% a um produto específico  
- `DELETE /produtos/:id` — Remove logicamente um produto   

> Implementadas via camadas service e controller específicas do módulo de produtos.
---

## 🧪 Estratégia de Testes

- Simulam requisições de modo unitário, com chamadas HTTP e interação com banco de dados "temporário", SQLite.  
- Testam os fluxos de cadastro, atualizações, exclusões e verificação de possíveis erros tanto para o módulo de categorias quanto de produtos.  
