const API_URL = "http://localhost:8080/employees"; // backend base

// Buscar todos employees
export const getEmployees = async () => {
  const res = await fetch(API_URL, {
  method: "GET",
  headers: {
    "Authorization": "Basic " + btoa("Olivia:admin")
  }
});

  if (!res.ok) throw new Error("Erro ao buscar funcionários");
  return res.json();
};

// Criar novo employee
export const createEmployee = async (employee) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
       "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("Olivia:admin") 
      },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Erro ao criar funcionário");
  return res.json();
};

// Atualizar employee existente
export const updateEmployee = async (id, employee) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
       "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("Olivia:admin") 
      },
    body: JSON.stringify(employee),
  });
  if (!res.ok) throw new Error("Erro ao atualizar funcionário");
  return res.json();
};

// Excluir employee
export const deleteEmployee = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { 
    method: "DELETE" ,
    headers: {
       "Content-Type": "application/json",
        "Authorization": "Basic " + btoa("Olivia:admin") 
      },
  });
  if (!res.ok) throw new Error("Erro ao excluir funcionário");
  return true;
};
