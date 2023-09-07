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
let count = 0


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
    let id = count
    let formStart = '<form action="/updateDailyTask" method="POST">'
    let type = "<input type='checkbox' id='" + id 
        + "' name='task' value='" + id + "' class='checks' onclick='this.form.submit()'></input>"

    let label = "<label for='task'><span id='span" + id + "' class=''>" + task + "</span></label><br>"
    let formEnd = '</form><br>'

    dailyTasks.push({"id": id, "formStart": formStart, "type": type, "label": label, "formEnd": formEnd})
    res.render("dailyTasks.ejs", {tasks: dailyTasks})
    count++
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

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})