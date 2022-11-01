# Orgchart-cli

## Description
Organize your business with a database with a simple command line tool. You can create employees, designate managers, set salaries, calculate department budgets, create new roles and departments, and more!

## Usage
After starting the app (see installation), move up and down with the arrow keys, select the operation you wish to perform and provide any relevant details. Once you have finished navigate to the option shown below and the program will stop running. 
> ---- Quit ----

Here is a [video](https://drive.google.com/file/d/1p2_1M_Ux3GTQQZrCvYo-16y9Z0SHV0w3/view) showing the functionality of the command line tool.

## Installation
First, clone this repository. Then initialize the npm packages:
> npm i

Then source the sql files. You need to have MySQL installed. 
> mysql -u root -p

> SOURCE db/schema.sql

> SOURCE db/seeds.sql

Finally, you're ready to run the command line app:
> node index.js

## License

Please refer to the license in the repository.
