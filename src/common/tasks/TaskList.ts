export class TaskList {
    public tasksRemaining: string[];
    public tasks: string[];
    public callback: () => void;

    constructor(tasks: string[], callback: () => void) {
        this.tasksRemaining = tasks;
        this.tasks = tasks;
        this.callback = callback;
    }

    public done(task: string) {
        const taskIndex: number = this.tasksRemaining.indexOf(task);
        if (taskIndex !== -1) {
            this.tasksRemaining.splice(taskIndex, 1);
        }

        if (this.tasksRemaining.length === 0) {
            if (this.callback !== undefined) {
                this.callback();
            }
        }
    }
}
