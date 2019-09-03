require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require('chalk');
var table = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.db_password,
  database: "bamazon_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  //console.log("connected as id " + connection.threadId);
  // run the start function after the connection is made to prompt the user
  start();
});

// function that starts the aoo and prompts user
function start(){
    console.log(chalk.blue.bold("\nWELCOME TO BAMAZON\n"));
    inquirer.prompt(
        {
            name: "browse",
            type: "confirm",
            message: "Would you like to browse the available products?"
        }
    ).then(function(answer){
        if(answer.browse){
			showItems();
			setTimeout(promptUser, 1000);
        } else {
            exit();
        }
    });
}

// function to display available items
function showItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
		// console.log(res);
		var products = [];
        for (var i = 0; i < res.length; i++) {
            products.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
        }
        var headings = ["Item ID", "Product", "Department", "Price ($)", "Quantity in Stock"];
		console.table(headings, products);
        
    });

} 

// function to ask user if they would like to purchase an item
function promptUser() {
	inquirer.prompt([
		{
			name: "id",
			type: "input",
			message: "Please enter the ID number of the item you'd like to purchase.",
			validate: function(value) {
				if (value <= 0 || value > 10 || isNaN(value)) {
					console.log(chalk.red.bold("\nPlease enter a valid item ID.\n"));
				} else {
					return true;
				}
			}
		},
		{
			name: "quantity",
			type: "input",
			message: "Please enter the quantity of the item you'd like to purchase.",
			validate: function(value) {
				if (isNaN(value)) {
					console.log(chalk.red.bold("\nPlease enter a valid number.\n"));
				} else {
					return true;
				}
			}
		}
	]).then(function(answer) {
		itemID = answer.id;
		itemQuantity = answer.quantity;

		connection.query("SELECT * FROM products WHERE item_id=" + itemID, function(err, res) {
			selected = res[0];

			if (itemQuantity > selected.stock_quantity && selected.stock_quantity > 1) {
				statement = "\nSorry, we only have " + selected.stock_quantity + " " + selected.product_name + "s available.\n";
				console.log(chalk.red.bold(statement));
				promptUser();
			} else if (itemQuantity > selected.stock_quantity && selected.stock_quantity === 1) {
				statement = "\nSorry, we only have 1 " + selected.product_name + " available.\n";
				console.log(chalk.red.bold(statement));
				promptUser();
			} else if (itemQuantity > selected.stock_quantity && selected.stock_quantity < 1) {
				statement = "\nSorry, " + selected.product_name + " is out of stock.\n";
				console.log(chalk.red.bold(statement));
				promptUser();
			} else if (+itemQuantity === 1) {
				statement = "\nYou are purchasing 1 " + selected.product_name + ".";
				buyProduct();
			} else {
				statement = "\nYou are purchasing " + itemQuantity + " " + selected.product_name + "s.";
				buyProduct();
			}
		});
	});
}
function buyProduct() {
	inquirer.prompt(
		{
			name: "buy",
			type: "confirm",
			message: statement + " Would you like to check out?"
		}
	).then(function(answer) {
		if (answer.buy) {
			connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [itemQuantity, itemID], function(err, res) {
				if (err) throw err;
				var totalStatement = "\nYour total is $" + (itemQuantity * selected.price) + "\n";
				console.log(chalk.red.bold(totalStatement));
                setTimeout(buyDifferent, 1500);
			});
		} else {
			buyDifferent();
		}
	});
}

function buyDifferent() {
	inquirer.prompt(
		{
			name: "differentItem",
			type: "confirm",
			message: "Would you like to purchase a different item?"
		}
	).then(function(answer) {
		if (answer.differentItem) {
			showItems();
			setTimeout(promptUser, 1000);
		} else {
			exit();
		}
	});
}

//function that exits
function exit(){
    console.log(chalk.blue.bold("\nThank you for visiting Bamazon!\n"));
    connection.end();
}   