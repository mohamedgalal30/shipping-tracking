import ApiBase from '../core/ApiBase'

class TasksApi extends ApiBase {
    static fetchTasks(params) {
        return this.request("/tasks", {
            method: 'GET',
            params
        });
    }

    static updateStatus(taskId, status) {
        return this.request(`/tasks/${taskId}/edit_status`, {
            method: 'PUT',
            body: { status },
        });
    }
}

export default TasksApi;