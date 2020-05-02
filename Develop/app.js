const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


const employees = []
function startQuestions() {
    inquirer
        .prompt([{
            message: "What type of employee?",
            type: 'list',
            choices: ["Intern", "Engineer", 'Manager'],
            name: "type"
        },
        {
            message: "What is the employee's name?",
            type: 'input',
            name: 'name'
        },
        {
            message: "What is the employee's id?",
            type: 'input',
            name: 'id'
        },
        {
            message: "What is the employee's email?",
            type: 'input',
            name: 'email'
        }
        ])

        .then(({ type, name, email, id }) => {
            let nextQuestion
            let employeeClass

            if (type === "Intern") {
                employeeClass = Intern
                nextQuestion = {
                    message: "What is the employee's school?",
                    type: 'input',
                    name: 'answer'
                }
            } else if (type === "Manager") {
                employeeClass = Manager
                nextQuestion = {
                    message: "What is the employee's office number?",
                    type: 'input',
                    name: 'answer'
                }
            } else if (type === "Engineer") {
                employeeClass = Engineer
                nextQuestion = {
                    message: "What is the employee's Github username?",
                    type: 'input',
                    name: 'answer'
                }
            }

            inquirer.prompt([nextQuestion]).then(function ({ answer }) {
                const person = new employeeClass(name, id, email, answer)
                employees.push(person);

                nextQuestion = {
                    message: "Do you want to add another team member?",
                    type: 'confirm',
                    name: 'answer'
                }
                inquirer.prompt([nextQuestion]).then(function ({ answer }) {
                    if (answer === true) {
                        startQuestions();
                    } else {
                        // fs.writeFile(file, data[, options], callback)
                        const html = render(employees);
                        fs.writeFile(outputPath, html, function(err){
                            if (err) {
                                console.log(err)
                            }
                        })
                    
                    }
                })
            })
        })
        .catch(error => {
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else when wrong
            }
        })
};

// 1. Gather input from inquierer
// 2. Go through intput and build class instances and add them to employee list
// 3. Call render with employees

startQuestions();
