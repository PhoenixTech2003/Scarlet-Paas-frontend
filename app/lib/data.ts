import axios from "axios";

export async function saveUserDataToMongo(
  emailAddress: string,
  firstName: string,
  lastName: string
) {
  const user = { emailAddress, firstName, lastName };
  await axios.post("http://localhost:8083/users", user);
}

export async function getMongoUserId(email: string) {
  return axios.get(`http://localhost:8083/users/${email}`);
}
