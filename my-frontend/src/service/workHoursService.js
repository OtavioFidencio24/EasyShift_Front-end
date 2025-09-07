// workHoursService.js

const API_URL = "http://localhost:8080/shifts";

const authHeader = {
  "Authorization": "Basic " + btoa("Olivia:admin"),
  "Content-Type": "application/json"
};

export const getWeeklySchedules = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: authHeader
  });
  if (!res.ok) throw new Error("Erro ao buscar escalas semanais");
  return res.json();
};

export const saveWeeklySchedule = async (weeklyScheduleList) => {
  const res = await fetch(`${API_URL}/schedule`, {
    method: "POST",
    headers: authHeader,
    body: JSON.stringify(weeklyScheduleList),
  });
  if (!res.ok) {
    const errorMsg = await res.text();
    throw new Error(errorMsg || "Erro ao salvar a escala semanal");
  }
  return res.json();
};

// ❗ Definindo weekDays dentro do service
const weekDays = ["MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY"];

export const mapRosterWithEmployees = (rosters, employees) => {
  return rosters.map((roster, weekIndex) => {
    const mappedEmployees = employees.map(emp => {
      const workHour = roster.workHours?.find(w => w.employeeId === emp.id);

      const schedule = weekDays.map(day => {
        if (workHour) {
          const dayInfo = workHour.week.find(d => d.weekDay === day);
          return {
            weekDay: day,
            startHour: dayInfo?.startHour || "",
            finishHour: dayInfo?.finishHour || "",
            dayOff: dayInfo?.dayOff || false
          };
        } else {
          return { weekDay: day, startHour: "", finishHour: "", dayOff: false };
        }
      });

      return {
        ...emp,
        schedule
      };
    });

    return {
      ...roster,
      employees: mappedEmployees
    };
  });
};
