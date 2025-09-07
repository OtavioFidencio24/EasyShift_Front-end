import { useState, useEffect } from "react";
import { getEmployees } from "../service/employeeService";
import { getRosters } from "../service/rosterService";
import { mapRosterWithEmployees } from "../service/workHoursService";
import "../styles/style.css";

const weekDays = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];

function Roster() {
  const [showForm, setShowForm] = useState(false);
  const [rosters, setRosters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Carrega rosters e employees do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rostersData = await getRosters();
        const employeesData = await getEmployees();

        // Mapear os workHours para cada employee
        const mappedRosters = mapRosterWithEmployees(rostersData, employeesData);

        setRosters(mappedRosters);

        if (mappedRosters.length > 0) {
          const lastIndex = mappedRosters.length - 1;
          setCurrentIndex(lastIndex);
          setStartDate(mappedRosters[lastIndex].startDate);
          setEndDate(mappedRosters[lastIndex].endDate);
          setEmployees(mappedRosters[lastIndex].employees);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleNewRosterClick = async () => {
    setShowForm(true);
    setStartDate("");
    setEndDate("");
    setEmployees([]);

    try {
      const employeesData = await getEmployees();
      const employeesWithSchedule = employeesData.map(emp => ({
        ...emp,
        schedule: weekDays.map(day => ({ weekDay: day, startHour: "", finishHour: "", dayOff: false }))
      }));
      setEmployees(employeesWithSchedule);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <section className="hero center">
        <h1>Weekly Roster</h1>
      </section>

      {/* Tabela fixa para a última semana carregada */}
      <div className="roster-view">
        <h2>
          {`Week${currentIndex + 1}: from ${startDate || "____"} to ${endDate || "____"}`}
        </h2>
        <table className="roster-table">
          <thead>
            <tr>
              <th>Employee</th>
              {weekDays.map(day => (
                <th key={day} colSpan="3">{day}</th>
              ))}
            </tr>
            <tr>
              <th></th>
              {weekDays.map(() => (
                <>
                  <th>Start</th>
                  <th>Finish</th>
                  <th>Day Off</th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  {emp.schedule.map((day, idx) => (
                    <>
                      <td>{day.startHour || "-"}</td>
                      <td>{day.finishHour || "-"}</td>
                      <td>{day.dayOff ? "Yes" : "No"}</td>
                    </>
                  ))}
                </tr>
              ))
            ) : (
              [1,2,3].map(i => (
                <tr key={i}>
                  <td>Employee {i}</td>
                  {weekDays.map(() => (
                    <>
                      <td>-</td>
                      <td>-</td>
                      <td>-</td>
                    </>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Botão para abrir o formulário */}
      <button
        onClick={handleNewRosterClick}
        className="primary-btn"
      >
        {showForm ? "Close Form" : "New Roster"}
      </button>

      {/* Formulário de criação */}
      {showForm && (
        <section className="form-section">
          <h2 className="center">Create Weekly Roster</h2>
          <div className="week-dates center">
            <label>
              Start Date:
              <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            </label>
            <label>
              End Date:
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </label>
          </div>
          {/* Inputs para cada employee podem ser adicionados aqui */}
        </section>
      )}
    </main>
  );
}

export default Roster;
