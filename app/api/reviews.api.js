import instance from "../(auth)/axios.instance";

export async function getUserReviews() {
    try {
        const res = await instance.get("/reviews");
        return res.data;
    } catch (error) {
        console.log(error.message);
        throw new Error("Error")
    }
}