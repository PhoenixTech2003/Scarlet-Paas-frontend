import axios from "axios";


export async function saveUserDataToMongo(
  id:string,
  emailAddress: string,
  firstName: string,
  lastName: string
) {
  const user = {id, emailAddress, firstName, lastName };
  await axios.post("http://localhost:8083/users", user);
}


export async function getUserDetails(id:string | undefined) {
    return (await axios.get(`http://localhost:8083/users/${id}/details`)).data
}

export async function postDeployment(formData: FormData){
  
  return axios.post("http://localhost:8083/deployments/", formData,{headers:{
    'Content-Type': 'multipart/form-data',
  }},)
}
