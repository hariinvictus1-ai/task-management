import axios from "axios";

export async function login({ email, password }) {
   try {
      const res = await axios.post(
         "http://192.168.1.16:3000/api/v1/session",
         { email, password }
      );

      return res.data
   } catch (error) {
      console.log("LOGIN ERROR 👉", error.message);
      throw error;
   }
}
