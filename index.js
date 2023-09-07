import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.render("dailyTasks.ejs")
})

let dailyTasks = []
let dailyCount = 0
let workTasks = []
let workCount = 0

app.post("/goToDailyTasks", function(req, res){
    console.log("size(): " + dailyTasks.length)
    if(dailyTasks.length > 0){
        res.render("dailyTasks.ejs", {tasks: dailyTasks})
    } else {
        res.render("dailyTasks.ejs")
    }
})

app.post("/dailyTasks", function(req, res){
    let task = req.body["task"]
    let id = dailyCount
    let formStart = '<form action="/updateDailyTask" method="POST">'
    let type = "<input type='checkbox' id='" + id 
        + "' name='task' value='" + id + "' class='checks' onclick='this.form.submit()'></input>"

    let label = "<label for='task'><span id='span" + id + "' class=''>" + task + "</span></label><br>"
    let formEnd = '</form><br>'

    dailyTasks.push({"id": id, "formStart": formStart, "type": type, "label": label, "formEnd": formEnd})
    res.render("dailyTasks.ejs", {tasks: dailyTasks})
    dailyCount++
})

app.post("/updateDailyTask", function(req, res){
    let id = req.body["task"]
    dailyTasks[id].type = "<input type='checkbox' id='" + id 
    + "' name='task" + id 
    + "' value='" + id + "' class='checks' checked='yes' disabled='disabled'></input>"

    let tempString = dailyTasks[id].label
    let newString = tempString.replace("class=''", "class='strikethrough'")
    dailyTasks[id].label = newString
    res.render("dailyTasks.ejs", {tasks: dailyTasks})
})


app.post("/goToWorkTasks", function(req, res){
    console.log("size(): " + workTasks.length)
    if(workTasks.length > 0){
        res.render("workTasks.ejs", {tasks: workTasks})
    } else {
        res.render("workTasks.ejs")
    }
})

app.post("/workTasks", function(req, res){
    let task = req.body["task"]
    let id = workCount
    let formStart = '<form action="/updateWorkTask" method="POST">'
    let type = "<input type='checkbox' id='" + id 
        + "' name='task' value='" + id + "' class='checks' onclick='this.form.submit()'></input>"

    let label = "<label for='task'><span id='span" + id + "' class=''>" + task + "</span></label><br>"
    let formEnd = '</form><br>'

    workTasks.push({"id": id, "formStart": formStart, "type": type, "label": label, "formEnd": formEnd})
    res.render("workTasks.ejs", {tasks: workTasks})
    workCount++
})

app.post("/updateWorkTask", function(req, res){
    let id = req.body["task"]
    workTasks[id].type = "<input type='checkbox' id='" + id 
    + "' name='task" + id 
    + "' value='" + id + "' class='checks' checked='yes' disabled='disabled'></input>"

    let tempString = workTasks[id].label
    let newString = tempString.replace("class=''", "class='strikethrough'")
    workTasks[id].label = newString
    res.render("workTasks.ejs", {tasks: workTasks})
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})