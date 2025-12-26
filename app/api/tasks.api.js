import axios from "axios";

export async function getUserTasks(){
    
    try {
        const employeeId = 13;
        let res = await axios.get(`http://192.168.0.115:3000/api/v1/tasks?employee_id=${employeeId}`);
        return res.data
        
    } catch (error) {
        console.log(error.message)
    }

}

