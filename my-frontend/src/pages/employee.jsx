import { useState } from "react";
import "../styles/variables.css";
import "../styles/style.css";

function Employee() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([
    {
      name: "John Doe",
      function: "Software Engineer",
      contract: "Full Time",
      phone: "(123) 456-7890",
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newEmployee = {
      name: formData.get("name"),
      function: formData.get("function"),
      contract: formData.get("contract"),
      phone: formData.get("phone"),
    };

    setEmployees([...employees, newEmployee]);
    event.target.reset();
    setShowForm(false);
  };

  return (
    <main className="container">
      <section className="hero center">
        <h1>Employee Management</h1>
      </section>

      <button
        onClick={() => setShowForm(!showForm)}
        className="primary-btn"
        id="btnCreateEmployee"
      >
        {showForm ? "Close Form" : "New Employee"}
      </button>

      {showForm && (
        <section className="form-section">
          <h2>Employee Form</h2>
          <p>Please fill out the form below to add a new employee.</p>
          <form
            id="employee-form"
            className="modern-form center"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />

              <label htmlFor="function">Function:</label>
              <input type="text" id="function" name="function" required />

              <label htmlFor="contract">Contract Type:</label>
              <select id="contract" name="contract" required>
                <option value="">Select...</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="temporary">Temporary</option>
              </select>

              <label htmlFor="phone">Phone Number:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-btn">
                Submit
              </button>
              <button type="reset" className="secondary-btn">
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
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.function}</td>
                  <td>{emp.contract}</td>
                  <td>{emp.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default Employee;
