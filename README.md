# e-commerce backend ![MIT license](https://img.shields.io/badge/MIT-License-green)

## Summary

This project builds the back end for an e-commerce site and configures a working Express.js API to use Sequelize to interact with a MySQL database. API Routes are used to Perform RESTful CRUD Operations.

[View demo here]

## Table of Contents

- [Project Description](#projectdescription)
- [Database Models](#database-models)
- [Associations](#associations)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)
- [Author](#author)
- [Contact](#contact)

## Project Description

```
AS A manager at an internet retail company
I WANT a back end for my e-commerce website that uses the latest technologies
SO THAT my company can compete with other e-commerce companies
```

### Additional Information

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open API GET routes in Insomnia for categories, products, or tags
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete data in my database
```

### Database Models

The database contains the following four models, including the requirements listed for each model:

- `Category`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `category_name`

    - String.

    - Doesn't allow null values.

- `Product`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `product_name`

    - String.

    - Doesn't allow null values.

  - `price`

    - Decimal.

    - Doesn't allow null values.

    - Validates that the value is a decimal.

  - `stock`

    - Integer.

    - Doesn't allow null values.

    - Set a default value of `10`.

    - Validates that the value is numeric.

  - `category_id`

    - Integer.

    - References the `Category` model's `id`.

- `Tag`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `tag_name`

    - String.

- `ProductTag`

  - `id`

    - Integer.

    - Doesn't allow null values.

    - Set as primary key.

    - Uses auto increment.

  - `product_id`

    - Integer.

    - References the `Product` model's `id`.

  - `tag_id`

    - Integer.

    - References the `Tag` model's `id`.

### Associations

Association methods were executed on the Sequelize models to create the following relationships between them:

- `Product` belongs to `Category`, and `Category` has many `Product` models, as a category can have multiple products but a product can only belong to one category.

- `Product` belongs to many `Tag` models, and `Tag` belongs to many `Product` models. Allow products to have multiple tags and tags to have many products by using the `ProductTag` through model.

## Technologies

The following technologies and packages were used in this project:

- Node.js and npm
- Node external packages:
  - Express.js
  - MySQL2
  - Sequelize
  - dotenv

Postman for API requests and My SQL Workbench was used

## Installation

Clone the repository, using SSH keys:

`https://github.com/nsharma-uk/e-commerce-backend`

Go into the new repository and install the required packages:

```
cd e-commerce-backend
npm install
```

To run the project perform the following steps:

1. Create a `.env` file and use the `.env.sample` to fill in the details required.
2. To create the database in the `db` folder, open the integrated terminal input the following:
   - `mysql -u root -p`
   - `source schema.sql`
   - `quit`
3. To seed the database, from the root folder use the integrated terminal to type:
   - `npm run seed`

## License

MIT License

## Author

N Sharma

## Contact

Please contact me on my email: [email](nsharmauk711@gmail.com)

Visit my GitHub profile [here](https://github.com/nsharma-uk)
