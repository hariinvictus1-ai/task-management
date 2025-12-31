import instance from "../(auth)/axios.instance";

export async function getGoals() {
    try {
        const res = await instance.get("/goals");
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error")
    }

}