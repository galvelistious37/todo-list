import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

let dailyH1 = "Daily Tasks: "
let dailyTasks = []
let dailyCount = 0
let workH1 = "Work Tasks: "
let workTasks = []
let workCount = 0

app.get("/", function(req, res){
    dailyTasks.splice(0, dailyTasks.length)
    workTasks.splice(0, workTasks.length)
    dailyCount = 0
    workCount = 0
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1}})
})

app.get("/goToDailyTasks", function(req, res){
    if(dailyTasks.length > 0){
        res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
    } else {
        res.render("dailyTasks.ejs", {data: {h1Value: dailyH1}})
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
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
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
    res.render("dailyTasks.ejs", {data: {h1Value: dailyH1, tasks: dailyTasks}})
})


app.get("/goToWorkTasks", function(req, res){
    if(workTasks.length > 0){
        res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
    } else {
        res.render("workTasks.ejs", {data: {h1Value: workH1}})
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
    res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
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
    res.render("workTasks.ejs", {data: {h1Value: workH1, tasks: workTasks}})
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})