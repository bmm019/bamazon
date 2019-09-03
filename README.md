# Bamazon
Bamazon is a command line node application using MySQL and npm packages to create an Amazon-like storefront.

# Customer View
The customer view of the app takes in orders from users and depletes stock from the store's inventory. It validates input and will let the customer know if they've entered an invalid item ID or if an item is out of stock. If the item is available in the quantity specified, the customer will be given the total price and the inventory will be updated on the backend.

# Manager View
The manager view of the app presents the user with a list of set menu options. Depending on the command selected, the app will read and return data to the manager, or prompt the manager for input to update inventory or insert new inventory into the database.

# Demo
[Watch Demo Here](https://drive.google.com/file/d/1kysgy8vWqIU2Pag3MDYvpDmyel9VYFl4/view)

# Technology Used
* MySQL
* Inquirer
* Chalk
* Console-table
* DotEnv