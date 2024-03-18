// this is to define the root URL for backend API
const BACKEND_ROOT_URL = 'http://localhost:3001'

// to Select the <ul> element from the DOM
const list = document.querySelector('ul')

// to Select the <input> element from the DOM
const input = document.querySelector('input')

// To disable the input element 
input.disabled = true


/*- Making HTTP calls from the front-end using JavaScript
- Get data from back-end
- Post data to back-end
- Error handling when making HTTP calls*/

// Function to render a task item
const renderTask = (task) => {
    // Create a new <li> element
    const li = document.createElement("li")
    
    // Set class attribute for the <li> element
    li.setAttribute('class', 'list-group-item')
    
    // Set innerHTML of the <li> element to the task value
    li.innerHTML = task
    
    // Append the <li> element to the <ul> list
    list.append(li)
}

// Function to fetch tasks from the backend
const getTasks = async () => {
    try {
        // Fetch tasks from the backend
        const response = await fetch(BACKEND_ROOT_URL)
        
        // Parse response as JSON
        const json = await response.json()
        
        // Iterate over each task in the JSON response
        json.forEach(task => {
            // Render each task
            renderTask(task.description)
        })
        
        // Enable the input element after tasks are fetched
        input.disabled = false
    } catch (error) {
        // Display an error message if fetching tasks fails
        alert("Error retrieving tasks: " + error.message)
    }
 }
 
 // Function to save task to the backend
const saveTask = async (task) => {
    try {
        // Send task data to the backend
       // Parse task data into JSON format
    const json = JSON.stringify({ description: task })

    // Send a POST request to the backend API to save the task
    const response = await fetch(BACKEND_ROOT_URL + '/new', {
    method: 'POST', // Use the POST method
    headers: {
        'Content-Type': 'application/json' // Specify content type as JSON
    },
    body: json // Set the request body to the JSON-formatted task data
})
        // Return the JSON response
        return response.json()
    } catch (error) {
        // Display error message if saving task fails
        alert("Error saving task " + error.message)
    }
}
// Event listener for keypress event on the input element
input.addEventListener('keypress', (event) => {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        // Prevent the default behavior of the 'Enter' key
        event.preventDefault()
        
        // Get the trimmed value of the input
        const task = input.value.trim()
        
        // Check if the input value is not empty
        if (task !== '') {
            saveTask(task).then((json)=> {
            // Call renderTask function to render the task
            renderTask(task)
            
            // Clear the input value
            input.value = ''
            })
        
        }
    }
})
// Call getTasks function to fetch tasks from the backend
getTasks()

