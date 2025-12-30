import axios from "axios";

export async function login({ email, password }) {
   try {
      const res = await axios.post("http://192.168.0.115:3000//api/v1/session", {
         email, password
      })
      console.log("res login", res)
      return res;
   } catch (error) {
      console.log(error.message)
   }
}