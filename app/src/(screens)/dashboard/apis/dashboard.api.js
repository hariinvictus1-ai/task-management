
 
export async function  getRecentTasks(params) {
    try {
        const res = await fetch("http://192.168.0.115:3000/api/v1/tasks");
        if(!res.ok){
            throw new Error("Something is wrong!!")
        }
        let data = await res.json();       
        return data
    } catch (error) {
        console.log(error.message)      
    }
}

