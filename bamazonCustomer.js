require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

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
    console.log("WELCOME TO BAMAZON");
    inquirer.prompt(
        {
            name: "browse",
            type: "confirm",
            message: "Would you like to browse the available products?"
        }
    ).then(function(answer){
        if(answer.browse){
            // show items
        } else {
            exit();
        }
    });
}

// function to display available items

// function to ask user if they would like to purchase an item


//function that exits
function exit(){
    console.log("Thank you for visiting Bamazon!")
    connection.end();
}   