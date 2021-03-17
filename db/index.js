const connection = require("./connection");

module.exports = {
  getDepartments() {
    return connection.query("SELECT * FROM department");
  },
  getRoles() {
    return connection.query("SELECT * FROM role");
  },
  getEmployees() {
    return connection.query("SELECT * FROM employee");
  },
  newRole({title, salary, department_id}) {
    console.log({title, salary, department_id});
    return connection.query("INSERT INTO role SET ?",
    {
      title,
      salary,
      department_id
    });
  },
  newEmployee({first_name, last_name, role_id, manager_id}) {
    console.log({first_name, last_name, role_id, manager_id});
    return connection.query("INSERT INTO employee SET ?",
    {
      first_name,
      last_name,
      role_id,
      manager_id
    });
  },
  newDepartment(data) {
    console.log(data);
    return connection.query("INSERT INTO department SET ?", [data]);
  },
}