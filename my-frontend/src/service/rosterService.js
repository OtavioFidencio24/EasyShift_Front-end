const API_URL = "http://localhost:8080/roster";

const authHeader = {
  "Authorization": "Basic " + btoa("Olivia:admin"),
  "Content-Type": "application/json"
};

// Buscar todas as rosters
export const getRosters = async () => {
  const res = await fetch(API_URL, { headers: authHeader });
  if (!res.ok) throw new Error("Erro ao buscar rosters");
  return res.json();
};

// Criar nova roster
export const createRoster = async (roster) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: authHeader,
    body: JSON.stringify(roster),
  });
  if (!res.ok) throw new Error("Erro ao criar roster");
  return res.json();
};
