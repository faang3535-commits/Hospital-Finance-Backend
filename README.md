# Hospital Finance Backend

A Node.js backend application built with Express, TypeScript, PostgreSQL, and Sequelize for managing hospital financial transactions.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Migration Tool**: Sequelize CLI

## Project Structure

```
.
├── config/                 # Database configuration
│   └── config.cjs         # Sequelize config for different environments
├── src/
│   ├── config/            # Application configuration
│   │   └── database.ts    # Database connection setup
│   ├── migrations/        # Database migrations (auto-generated)
│   ├── models/            # Sequelize models (auto-generated)
│   ├── seeders/           # Database seeders
│   └── index.ts           # Application entry point
├── .env                   # Environment variables
├── .sequelizerc           # Sequelize CLI configuration
└── tsconfig.json          # TypeScript configuration
```

## Database Schema

The application includes the following tables:

- **users**: System users with roles
- **categories**: Transaction categories (income/expense types)
- **payment_methods**: Payment method types
- **transactions**: Financial transactions with patient and payment info

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Update the `.env` file with your PostgreSQL credentials:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hospital_finance_dev
DB_USER=postgres
DB_PASSWORD=your_password_here
```

### 3. Create Database

```bash
npm run db:create
```

### 4. Run Migrations

```bash
npm run migrate
```

This will create all the tables and relationships in your database.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build
- `npm run migrate` - Run all pending migrations
- `npm run migrate:undo` - Undo last migration
- `npm run migrate:undo:all` - Undo all migrations
- `npm run db:create` - Create database
- `npm run db:drop` - Drop database

## API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and timestamp.

### Database Connection Test
```
GET /api/test-db
```
Tests database connection and returns connection details.

## Migrations

Migrations are managed using Sequelize CLI. All migration files are located in `src/migrations/`.

### Generated Migrations

1. `create-user.js` - Creates users table
2. `create-category.js` - Creates categories table
3. `create-payment-method.js` - Creates payment_methods table
4. `create-transaction.js` - Creates transactions table
5. `add-foreign-keys.js` - Adds foreign key relationships

### Creating New Migrations

```bash
npx sequelize-cli migration:generate --name migration-name
```

### Creating New Models

```bash
npx sequelize-cli model:generate --name ModelName --attributes field1:type,field2:type
```

## Development

1. Start the development server:
```bash
npm run dev
```

2. The server will run on `http://localhost:3000` (or the PORT specified in .env)

3. Test the database connection:
```bash
curl http://localhost:3000/api/test-db
```

## Notes

- All models are generated using Sequelize CLI to maintain consistency
- Migrations should not be manually created - use the CLI commands
- The project uses TypeScript for type safety and better development experience
- Database relationships are defined in a separate migration file for better organization
