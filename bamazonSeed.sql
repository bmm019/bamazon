DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(150) NOT NULL,
department_name VARCHAR(50) NULL,
price DECIMAL(10,4) NOT NULL,
stock_quantity INT(100) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Dress", "Clothing", 69.99, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Coat", "Clothing", 250.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Shirt", "Clothing", 20.50, 35);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Laptop", "Electronics", 1750.00, 12);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Camera", "Electronics", 820.50, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 900.00, 30);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Toaster", "Home", 75.00, 10);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Blender", "Home", 150.00, 15);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Tennis Ball", "Pets", 5.99, 25);
INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Bone", "Pets", 10.00, 17);
