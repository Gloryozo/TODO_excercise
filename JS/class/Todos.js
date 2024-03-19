// Import the Task class from the specified file
import { Task } from "./Task.js";

// Define the Todos class
class Todos {
    // Private field to store tasks and backend URL
    #tasks = [];
    #backend_url = ''

    // Constructor to initialize the Todos instance with the backend URL
    constructor(url) {
        // Set the backend URL
        this.#backend_url = url
    }

    // Method to fetch tasks from the backend
    getTasks = () => {
        // Return a promise for asynchronous operation
        return new Promise(async (resolve, reject) => {
            // Fetch tasks from the backend
            fetch(this.#backend_url)
                .then((response) => response.json()) // Convert response to JSON
                .then((json) => {
                    // Process JSON data
                    this.#readJson(json);
                    // Resolve the promise with tasks
                    resolve(this.#tasks);
                },(error) => {
                    // Reject the promise with error if fetching fails
                    reject(error);
                });
        });
    };

    addTask = (text) => {
        // Return a promise for asynchronous operation
        return new Promise(async(resolve, reject) => {
            const json = JSON.stringify({description: text})
            // Fetch tasks from the backend
            fetch(this.#backend_url + '/new',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body: json
            })
                .then((response) => response.json()) // Convert response to JSON
                .then((json) => {
                 // Resolve the promise with tasks
                    resolve(this.#addToArray(json.id,text));
                },(error) => {
                    // Reject the promise with error if fetching fails
                    reject(error)
                })
            })
        }
    

    // Private method to process JSON data and create Task objects
    #readJson = (tasksAsJson) => {
        tasksAsJson.forEach((node) => {
            // Create a new Task object from JSON data
            const task = new Task(node.id, node.description);
            // Add the Task object to the tasks array
            this.#tasks.push(task);
        })
    };
    #addToArray = (id,text) => {
        const task = new Task(id,text)
        this.#tasks.push(task)
        return task
    }
}

// Export the Todos class for use in other modules
export { Todos };