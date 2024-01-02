const filesystem = require('./node_modules/graceful-fs/graceful-fs')
//const filesystem = require('fs');
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./Lib/shapes");

class Svg {
    constructor() {
        this.textElement = ''
        this.shapeElement = ''
    }
    render(){
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text, color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

const questions = [
    {
        type: "list",
        name: "pixel-image",
        message: "Choose your Shape:",
        choices: ["Circle", "Square", "Triangle"],
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR:",
    },
    {
        type: "input",
        name: "text",
        message: "Enter up to 3 characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR:"
    },
];

function writeToFile(fileName, data) {
    console.log(`Writing [${data}] to file [${fileName}]`);
    
    filesystem.writeFile(fileName, data, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log("logo.svg generated");
    });
}

async function init() {
    console.log("Initializing...");
    var svgString = ""
    var svg_file = "logo.svg";

  const answers = await inquirer.prompt(questions);

var user_text = "";
if (answers.text.length > 0 && answers.text.length < 4) {
    user_text = answers.text;
} else {
    console.log("Invalid");
    return;
}

user_shape_type = answers["pixel-image"];
console.log("User entered shape = [" + user_shape_type + "]");

user_shape_color = answers.shape;
console.log("User shape color: [" + user_shape_color + "]");

user_font_color = answers["text-color"];
console.log("User font color: [" + user_font_color + "]");

console.log("users text: [" + user_text + "]");

let user_shape;

if (user_shape_type === "Circle" || user_shape_type === "circle") {
    user_shape = new Circle();
    console.log("User selected Circle shape");
}
else if (user_shape_type === "Square" || user_shape_type === "square") {
    user_shape = new Square();
    console.log("User selected Square shape");
}
else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
    user_shape = new Triangle();
    console.log("User selected Triangle shape");
}
else {
    console.log("invalid shape! Default Circle");
    user_shape = new Circle();
}
user_shape.setColor(user_shape_color);

var svg = new Svg();
svg.setTextElement(user_text, user_font_color);
svg.setShapeElement(user_shape);
svgString = svg.render();

console.log("Shape Chosen:\n\n" + svgString);

console.log("Shape generation complete!");
console.log("Writing shape to file...");
writeToFile(svg_file, svgString);
}

init()






