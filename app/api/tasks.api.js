import instance from "../(auth)/axios.instance";

export async function getUserTasks() {
  try {
    const res = await instance.get('/tasks');
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

