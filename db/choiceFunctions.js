const dbFunct = require("./index");

module.exports = {

  roleChoices() {
     dbFunct.getRoles()
      .then((roles) => {
      const roleChoices = roles.map((role) => ({
        value: role.id,
        name: role.title
      }))
      return roleChoices;
    })
  },   

  employeeChoices() {
    dbFunct
      .getEmployees()
      .then((employees) => {
      const employeeChoices = employees.map((employee) => ({
        value: employee.id,
        name: `${employee.first_name} ${employee.last_name}`
      }))
      return employeeChoices;
    })
  },

}