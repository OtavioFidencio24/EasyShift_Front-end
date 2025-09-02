import { useState } from "react";
import "../styles/variables.css";
import "../styles/style.css";

function Roster() {
  const [showForm, setShowForm] = useState(false);
  const [rosters, setRosters] = useState([
    {
      startDate: "2023-10-01",
      endDate: "2023-10-07",
      employees: [
        {
          name: "John Doe",
          days: {
            Monday: "9am - 5pm",
            Tuesday: "9am - 5pm",
            Wednesday: "Off",
            Thursday: "9am - 5pm",
            Friday: "9am - 5pm",
            Saturday: "Off",
            Sunday: "Off",
          },
        },
      ],
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const newRoster = {
      startDate: formData.get("start-date"),
      endDate: formData.get("end-date"),
      employees: [],
    };

    setRosters([...rosters, newRoster]);
    event.target.reset();
    setShowForm(false);
  };

  return (
    <main className="container">
      <section className="hero center">
        <h1>Roster Management</h1>
      </section>

      <button
        onClick={() => setShowForm(!showForm)}
        className="primary-btn"
        id="btnCreateRoster"
      >
        {showForm ? "Close Form" : "New Roster"}
      </button>

      {showForm && (
        <section className="form-section">
          <form
            id="roster-form"
            className="modern-form center"
            onSubmit={handleSubmit}
          >
            <div className="form-grid">
              <label htmlFor="start-date">Start Date:</label>
              <input type="date" id="start-date" name="start-date" required />

              <label htmlFor="end-date">End Date:</label>
              <input type="date" id="end-date" name="end-date" required />
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
        <h2>Week of</h2>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              {rosters.map((roster, index) =>
                roster.employees.map((emp, empIndex) => (
                  <tr key={`${index}-${empIndex}`}>
                    <td>{emp.name}</td>
                    <td>{emp.days.Monday}</td>
                    <td>{emp.days.Tuesday}</td>
                    <td>{emp.days.Wednesday}</td>
                    <td>{emp.days.Thursday}</td>
                    <td>{emp.days.Friday}</td>
                    <td>{emp.days.Saturday}</td>
                    <td>{emp.days.Sunday}</td>
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

export default Roster;
