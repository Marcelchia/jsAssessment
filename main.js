//npm run main

const prompt = require("prompt-sync")({ sigint: true });
const clear = require("clear-screen");

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
const row = 10;
const col = 10;

// create a Field Class

class Field {
    
    constructor(field) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;

        //Set and fix the initial position to 00 before the game starts
        this.field[0][0] = pathCharacter;
    }

    runGame() {
        let gameOn = true;
        console.log("Start Game");

        while (gameOn) {
            //print the field
            this.print();
            //user to move
            this.userDirection();

            // If player is out of bound, display message that they lost, gameOn = false, loop ends
            if (!this.isWithinBound()) {
               
                console.log("Out of bounds - Game End!");
                gameOn = false;
            }

            // If player drops into hole, game ends, display message that they lost, gameOn = false, loop ends
            else if (this.droppedIntoHole()) {
               
                console.log("Sorry, you fell down a hole!");
                gameOn = false;
            }

            //If player found the hat, display message that they won, gameOn = false , loop ends
            else if (this.foundTheHat()) {
                console.log("Congrats, you found your hat!");
                gameOn = false;
            }

            //to display pathCharacter location if game carries on
            this.field[this.locationY][this.locationX] = pathCharacter;
        }
    }

    userDirection() {
        const direction = prompt(
            "Which way? Please enter U, D, L, or R. "
        ).toUpperCase();
        switch (direction) {
            case "U":
                this.locationY -= 1;
                break;

            case "D":
                this.locationY += 1;
                break;

            case "L":
                this.locationX -= 1;
                break;

            case "R":
                this.locationX += 1;
                break;

            // displays message when player does not input any of the cases above
            default:
                console.log("Please key a valid input.");
                break;
        }
    }

    isWithinBound() {
        return (
            //checks top side, left side, bottom side, right side of field
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
        );
    }

    droppedIntoHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    foundTheHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }

    print() {
        const displayString = this.field
            .map((row) => {
                return row.join("");
            })
            .join("\n");

        console.log(displayString);
    }

    static generateField(percentage) {
        const field = new Array(row).fill().map(() => Array(col));

        for (let y = 0; y < row; y++) {
            for (let x = 0; x < col; x++) {
                const prob = Math.random();
                field[y][x] = prob > percentage ? fieldCharacter : hole;
            }
        }

        // Set the "hat" location : object
        const hatLocation = {
            x: Math.floor(Math.random() * col),
            y: Math.floor(Math.random() * row),
        };

        //Make sure the "hat" is not at the starting point
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * col);
            hatLocation.y = Math.floor(Math.random() * row);
        }

        field[hatLocation.y][hatLocation.x] = hat;
        return field;
    }
}

//Create an instance of Field Class Object
const myField = new Field(Field.generateField(0.3));
myField.runGame();
