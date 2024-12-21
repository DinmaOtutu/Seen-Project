# **Seen Project**

A Node.js and TypeScript application to process and enrich transaction data.

---

## **Table of Contents**

- [**Seen Project**](#seen-project)
  - [**Table of Contents**](#table-of-contents)
  - [**Introduction**](#introduction)
  - [**Features**](#features)
  - [**Folder Structure**](#folder-structure)
- [**Installation**](#installation)
  - [Technologies Used](#technologies-used)
    - [Clone the repository](#clone-the-repository)
      - [Install dependencies](#install-dependencies)
        - [Configure TypeScript](#configure-typescript)
          - [Running the Application](#running-the-application)
          - [Testing](#testing)
  - [**API Documentation**](#api-documentation)
    - [Customer Transactions](#customer-transactions)
    - [Related Customers](#related-customers)
    - [Notes](#notes)

## **Introduction**

This project demonstrates a simple API to process and enrich transaction data. It showcases:

- Clean architecture with Layered Architectural Pattern.
- TypeScript for type safety and maintainability.
- Testing using Jest and Supertest.

---

## **Features**

1. **API for Customer Transactions**:
   - Aggregates transaction data, showing the latest status with a timeline of updates.
   - Input: Customer ID.
   - Output: Aggregated transactions with timeline.

2. **API for Related Customers**:
   - Finds customers related by device or transaction history.
   - Input: Customer ID.
   - Output: Related customers and their relation type.

3. **Error Handling**:
   - Graceful handling of unknown routes and application errors.

4. **Unit and Integration Tests**:
   - Covers services, controllers, and app.

---

## **Folder Structure**

```bash
src/
|-- app.ts                 # Application setup
|-- server.ts              # Entry point
|-- routes/                # API routes
|-- middleware/            # Middleware (error handling, request validation)
|-- controllers/           # Controllers (handles HTTP requests)
|-- services/              # Services (business logic)
|-- repositories/          # Repositories (data access layer)
|-- models/                # TypeScript models
|-- utils/                 # Utility functions (e.g., API client)
|-- tests/                 # Test files
```

# **Installation**

## Technologies Used

- Node.js: Runtime environment.
- TypeScript: Strongly-typed JavaScript.
- Express.js: Web framework for building APIs.
- Jest: Testing framework.
- Supertest: HTTP assertion library for integration tests.
- Axios: HTTP client for fetching data.

### Clone the repository

```bash
git clone <repository-url>
cd seen-project
```

#### Install dependencies

```bash
npm install
```

##### Configure TypeScript

Ensure tsconfig.json is set up properly for your environment.

###### Running the Application

```bash
npm start
```

The server will be available at <http://localhost:3000>.

###### Testing

Run tests with Jest:

```bash
npm test
```

## **API Documentation**

Get Customer Transactions: <http://localhost:3000/api/transactions/:customerId>
Get Related Customers: <http://localhost:3000/api/related-customers/:customerId>

### Customer Transactions

```bash
Endpoint: 
GET /api/transactions/:customerId
```

Description: Aggregates transactions for a customer, including the latest status and timeline.
Input:

```bash
{
  "customerId": 1
}
```

Response:

```bash
{
  "transactions": [
    {
      "transactionId": 1,
      "authorizationCode": "F10000",
      "createdAt": "2022-09-01T11:46:42+00:00",
      "updatedAt": "2022-09-03T15:41:42+00:00",
      "status": "SETTLED",
      "timeline": [
        { "createdAt": "2022-09-01T11:46:42+00:00", "status": "PENDING", "amount": 5000 },
        { "createdAt": "2022-09-03T15:41:42+00:00", "status": "SETTLED", "amount": 5000 }
      ]
    }
  ]
}
```

### Related Customers

```bash
Endpoint: GET /api/related-customers/:customerId
```

Description: Retrieves customers related by transactions or device usage.
input:

```bash
{
  "customerId": 1
}
```

Response:

```bash
{
  "relatedCustomers": [
    {
      "relatedCustomerId": 3,
      "relationType": "P2P_SEND"
    },
    {
      "relatedCustomerId": 5,
      "relationType": "DEVICE"
    }
  ]
}
```

### Notes

Ensure the transactions.json API is accessible for data processing.
Customize the .env file for environment configurations.
