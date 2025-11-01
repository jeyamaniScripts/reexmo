const API_URL = "ur render url/api/employees";

export const getEmployees = async (query = "") => {
  console.log(`${API_URL}${query ? `?${query}` : ""}`);
  const res = await fetch(`${API_URL}${query ? `?${query}` : ""}`);
  const data = await res.json();
  // console.log(data);
  return data;
};

// post api/employees add employee
//  get api/employees all emplpyee get (limit, name, role)
// get api/employees/:id single object
// delete api/employees/:id delete object
