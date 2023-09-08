// Set imports
import express from "express"
import bodyParser from "body-parser"

// Set constant parameters
const app = express()
const port = 3000

// Define middleware to parse ejs sheets and use static files
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// Initialize variables
let dailyH1 = "Daily Tasks: "
let dailyTasks = []
let dailyCount = 0
let workH1 = "Work Tasks: "
let workTasks = []
let workCount = 0

// Load root 
app.get("/", function(req, res){
    // Clear any previous task data
    dailyTasks.splice(0, dailyTasks.length)
    workTasks.splice(0, workTasks.length)
    // Reset counters
    dailyCount = 0
    workCount = 0
    // Render ejs template with data parameters
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1}})
})

// Load /goToDailyTasks (Called from Daily Tasks button)
app.get("/goToDailyTasks", function(req, res){
    if(dailyTasks.length > 0){
        // If there is previously added tasks, pass them into the ejs template
        res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
    } else {
        // No previous tasks, just update the h1 header
        res.render("dailyTasks.ejs", {data: {h1Value: dailyH1}})
    }
})

// Load /dailyTasks (Called when a new task is entered into the form)
app.post("/dailyTasks", function(req, res){
    // Get the data entered into the form
    let task = req.body["task"]
    // Set id to the dialyCount variable to be used in new form attribute
    let id = dailyCount
    // Create a new form for each task (This allows me to check tasks and 
    // have them remain checked after a  new task is entered)
    let formStart = createFormStart("updateDailyTask")
    let type = createInputCheckbox(id)

    // Create label for checkbox and set the span id
    let label = createLabel(id, task)
    let formEnd = createFormEnd()

    // Add new task to dailyTasks list
    dailyTasks.push({"id": id, "formStart": formStart, "type": type, "label": label, "formEnd": formEnd})
    // pass dailyTasks lists to dailyTasks.ejs template
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
    // Increase counter
    dailyCount++
})

// Load /updateDailyTask (Called when a checkbox for an individual task is checked)
app.post("/updateDailyTask", function(req, res){
    // Get id from checkbox form
    let id = req.body["task"]
    // Update the list index of form id to retain the checked box and disable the checkbox
    dailyTasks[id].type = updateCheckboxStatus(id)

    // add the strikethrough class attribute to strikethrough checkbox text
    let tempString = dailyTasks[id].label
    let newString = tempString.replace("class=''", "class='strikethrough'")
    dailyTasks[id].label = newString
    // Send updated dailyTask data to dailyTasks.ejs template
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
})


// Load /goToWorkTasks (Called from Work Tasks button)
app.get("/goToWorkTasks", function(req, res){
    if(workTasks.length > 0){
        // If there is previously added tasks, pass them into the ejs template
        res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
    } else {
        // No previous tasks, just update the h1 header
        res.render("workTasks.ejs", {data: {h1Value: workH1}})
    }
})

// Load /workTasks (Called when a new task is entered into the form)
app.post("/workTasks", function(req, res){
    // Get the data entered into the form
    let task = req.body["task"]
    // Set id to the workCount variable to be used in new form attribute
    let id = workCount
    // Create a new form for each task (This allows me to check tasks and 
    // have them remain checked after a  new task is entered)
    let formStart = createFormStart("updateWorkTask")
    let type = createInputCheckbox(id)

    // Create label for checkbox and set the span id
    let label = createLabel(id, task)
    let formEnd = createFormEnd()

    // Add new task to workTasks list
    workTasks.push({"id": id, "formStart": formStart, "type": type, "label": label, "formEnd": formEnd})
    // pass workTasks lists to workTasks.ejs template
    res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
    // Increase counter
    workCount++
})

// Load /updateWorkTask (Called when a checkbox for an individual task is checked)
app.post("/updateWorkTask", function(req, res){
    // Get id from checkbox form
    let id = req.body["task"]
    // Update the list index of form id to retain the checked box and disable the checkbox
    workTasks[id].type = updateCheckboxStatus(id)
    
    // add the strikethrough class attribute to strikethrough checkbox text
    let tempString = workTasks[id].label
    let newString = tempString.replace("class=''", "class='strikethrough'")
    workTasks[id].label = newString
    // Send updated workTasks data to workTasks.ejs template
    res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
})

// Set the port for the server to listen on
app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})

/**
 * Helper method to generate open form tag for checkbox forms
 * @param {*} formName 
 * @returns String value - opening form tag
 */
function createFormStart(formName){
    return `<form action="/${formName}" method="POST">`
}

function createInputCheckbox(id){
    return  `<input type='checkbox' id='${id}' name='task' 
        value='${id}' class='checks' onclick='this.form.submit()'></input>`
}

function createLabel(id, task){
    return  `<label for='task'><span id='span${id}' class=''>${task}</span></label><br>`
}

function createFormEnd(){
    return '</form><br>'
}

function updateCheckboxStatus(id){
    return `<input type='checkbox' id='${id}' name='task${id}' value='${id}' 
        class='checks' checked='yes' disabled='disabled'></input>`
}