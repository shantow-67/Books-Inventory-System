## **_Books Inventory System_**

### Author

- [Kamrul Islam](https://github.com/shantow-67)

**Introduction**

The Books Inventory System is a backend project designed to manage a catalog of books, user information, and book transactions. This system provides functionalities for user authentication, user management, book management, transaction tracking, and photo management.

**Features**

- User authentication and management
- Book management
- Transaction tracking

**Getting Started**

To get a local copy of this project up and running on your machine, follow these instructions:

**Prerequisites**

You will need the following software/tools installed:

- Node.js
- MongoDB
- Git

**Installation**

1. Clone the repository:

```bash
git clone https://github.com/Mr-Anik1/Books-Inventory-System.git
```

2. Navigate to the project directory:

```bash
cd Books-Inventory-System
```

3. Create a .env file in the root of the project with the following variables:

```bash
DB_CONNECTION_URL='Your MongoDB Connection String'
PORT=YourPort
ACCESS_TOKEN_SECRET="Your JWT Token Secret"
```

4. Install project dependencies:

```bash
npm install
```

5. Start the server:

```bash
npm run dev
```

**To access the Swagger UI of the project in your web browser, please follow these steps:**

- Open your web browser.
- Enter the following URL in the address bar, replacing "YourPort" with the actual port number where the project is running:

```
http://localhost:YourPort/docs
```

- Press Enter or click Go to navigate to the specified URL.

Once you have accessed the Swagger UI, you will be able to interact with the project's APIs, including actions such as creating users, finding books, purchasing or borrowing books, and completing transactions.

**Example Usage**

Here is an example of how to use the Books Inventory System API to get a list of all books:

```bash
curl -X 'GET' \
  'http://localhost:4000/api/v1/books?page=1&limit=10&sort_type=asc&sort_by=updatedAt' \
  -H 'accept: application/json'

```

This will return a JSON response containing a list of all books in the system.

**_[If you want to learn more about this project, please see the project documentation (SRS, Models, API endpoints, ER diagram, and project file structure).](https://docs.google.com/document/d/1n3Q-13C5MOaK0rBYGHDlSZUh19IvliqETHLcFnqkpdE/edit?usp=sharing)_**
