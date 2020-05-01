const Employee = require("./Employee.js")

// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee{
    constructor(name, id, email, gitHubUser) {
        super(name, id, email);
        this.github = gitHubUser;
    }

    getGithub() {
        return this.github
    }

    getRole(){
        return "Engineer"
    }
}

module.exports = Engineer