class Task {

    constructor(name, fn, ...params){
        this.name = name;
        this.operation = fn;
        this.params = params;
        this.status = "scheduled"
    }

    executeOperation() {
        console.log(`task with name ${this.name} is being executed.`)
        if (this.params.length > 0) {
            return this.operation(...this.params)
        }
        return this.operation()  
    }

    execute() {
        console.log(`task with name ${this.name} is being executed.`)
        this.status = "running"
        var out = this.executeOperation()
        this.status = "completed"
        return out
    }
}

class ConcurrentEngine {

    constructor(name, taskQueue=[], concurrencyLimit=5, endlessRun=true) {
        this.name = name;
        if (typeof concurrencyLimit  != 'number' || concurrencyLimit <= 1) {
            throw "Invalid concurrency limit."
        }
        this.concurrencyLimit = concurrencyLimit;
        this.endlessRun = endlessRun;
        this.taskQueue = taskQueue;
        this.backlog = [];
        this.status = "running"
        this.updateBacklogsAndTaskQueues()
    }

    updateBacklogsAndTaskQueues() {
        if (this.taskQueue.length > this.concurrencyLimit) {
            this.backlog.unshift(...this.taskQueue.slice(this.concurrencyLimit, this.taskQueue.length));
            this.taskQueue.splice(this.concurrencyLimit);
            return
        }
    }

    addTask(name, operation, ...params) {
        var task = new Task(name, operation, ...params);
        this.taskQueue.push(task);
        this.updateBacklogsAndTaskQueues();
    }

    start() {
        console.log(`${this.name} engine has started.`);
        if (this.taskQueue.length == 0) {
            throw "Engine has started but has no tasks to perform";
        }
        // setImmediate(this.runEngine);
        this.runEngine();
        let interval = setInterval(() => {
            // console.log('tick!')
            if (this.status === "completed" || this.status === "waiting") clearInterval(interval)
        }, 0)
    }

    get_status() {
        return this.status;
    }

    runEngine() {
        // console.log("Task queue:");
        // console.log(this.taskQueue);
        if (this.taskQueue.length == 0){
            console.log("No tasks left to be executed, in the queue. Checking backlogs.....");
            if (this.backlog.length == 0) {
                if (this.endlessRun) {
                    // wait till the taskQueue gets populated with atleast one value.
                    while (this.taskQueue.length == 0) {
                        // console.log("No tasks to be run by concurrent engine. Waiting for the task.")
                        this.status = "waiting"
                    }
                } else {
                    console.log("All tasks have been executed successfully stopping this engine.");
                    this.status = "completed";
                    return;
                }
            } else {
                console.log(`Pushing backlogs to tasks.`);
                console.log(this.backlog);
                this.taskQueue.push(...this.backlog.splice(0, this.concurrencyLimit))
                console.log("Task Queue after pushing backlogs to task Queue::");
                console.log(this.taskQueue)
                setImmediate(this.runEngine.bind(this))
            }
        } else {
        this.status = "running";
        console.log(`Concurrent engine with name ${this.name} is executing a task.`);
        let task = this.taskQueue.shift();
        task.execute();
        if (task.status == "completed") {
            console.log(`Task with name ${task.name} is executed successfully.`)
        }
        console.log("Task queue::");
        console.log(this.taskQueue);
        setImmediate(this.runEngine.bind(this))
        }
    }
}

module.exports.ConcurrentEngine = ConcurrentEngine
