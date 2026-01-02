import instance from "../(auth)/axios.instance";

export async function getUserTasks(scope = 'assigned') {
  try {
    const res = await instance.get(`/tasks?scope=${scope}`);
    return res.data;
  } catch (error) {
    console.error('getUserTasks failed:', error);
    throw error;
  }
}


export async function updateTask({ status, progress, id }) {
  try {
    const res = await instance.patch(`/tasks/${id}`, {
      task: {
        status,
        progress,
      },
    });

    return res.data;
  } catch (error) {
    console.error('updateTask failed:', error);
    throw error;
  }
}



export async function getEmployeesForTaskCreation() {
  try {
    const res = await instance.get("/employees");
    return res.data
  } catch (error) {
    console.error('updateTask failed:', error);
    throw error;
  }
}

export async function getParentTasks(params) {

  try {
    const res = await instance.get("/tasks?scope=parent_tasks")
    return res.data;
  } catch (error) {
    console.error('updateTask failed:', error);
    throw error;
  }
}

export async function createTask(params) {
  try {
    const res = await instance.post("/tasks", params.task);
    return res;
  } catch (error) {
    console.error('updateTask failed:', error);
    throw error;
  }
}