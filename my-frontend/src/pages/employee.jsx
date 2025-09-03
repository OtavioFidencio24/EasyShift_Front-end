import { useState, useEffect } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../service/employeeService";
import "../styles/variables.css";
import "../styles/style.css";

function Employee() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Buscar employees na carga inicial
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees()
      .then((data) => setEmployees(data))
      .catch((err) => console.error(err));
  };

  // Criar ou atualizar employee
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employeeData = {
      name: formData.get("name"),
      function: formData.get("function"),
      contract_type: formData.get("contract_type"),
      phone_number: formData.get("phone_number"),
    };

    try {
      if (editingEmployee) {
        const updated = await updateEmployee(editingEmployee.id, employeeData);
        setEmployees((prev) =>
          prev.map((emp) => (emp.id === updated.id ? updated : emp))
        );
      } else {
        const created = await createEmployee(employeeData);
        setEmployees((prev) => [...prev, created]);
      }
      event.target.reset();
      setShowForm(false);
      setEditingEmployee(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este funcionário?")) return;
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  // Novo reset customizado
  const handleReset = (event) => {
    event.preventDefault();
    if (editingEmployee) {
      // Reaplica os valores originais do employee no formulário
      const form = event.target.form || event.target.closest("form");
      form.name.value = editingEmployee.name;
      form.function.value = editingEmployee.function;
      form.contract_type.value = editingEmployee.contract_type;
      form.phone_number.value = editingEmployee.phone_number;
    } else {
      event.target.form.reset();
    }
  };

  return (
    <main className="container">
      <section className="hero center">
        <h1>Employee Management</h1>
      </section>

      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingEmployee(null);
        }}
        className="primary-btn"
      >
        {showForm ? "Close Form" : "New Employee"}
      </button>

      {showForm && (
        <section className="form-section">
          <h2>{editingEmployee ? "Edit Employee" : "Employee Form"}</h2>
          <form className="modern-form center" onSubmit={handleSubmit}>
            <div className="form-grid">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                defaultValue={editingEmployee?.name || ""}
                required
              />

              <label htmlFor="function">Function:</label>
              <input
                type="text"
                name="function"
                defaultValue={editingEmployee?.function || ""}
                required
              />

              <label htmlFor="contract_type">Contract Type:</label>
              <select
                name="contract_type"
                defaultValue={editingEmployee?.contract_type || ""}
                required
              >
                <option value="">Select...</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="temporary">Temporary</option>
              </select>

              <label htmlFor="phone_number">Phone Number:</label>
              <input
                type="tel"
                name="phone_number"
                defaultValue={editingEmployee?.phone_number || ""}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">
                {editingEmployee ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="list-section">
        <h2>Employee List</h2>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Function</th>
                <th>Contract Type</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                    No employees registered yet.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.function}</td>
                    <td>{emp.contract_type}</td>
                    <td>{emp.phone_number}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(emp)}
                        className="icon-btn edit-btn"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="icon-btn delete-btn"
                        title="Delete"
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Employee;
