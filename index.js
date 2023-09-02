import express from "express"
import bodyParser from "body-parser"

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", function(req, res){
    res.render("index.ejs")
})

let dailyTasks = []
let count = 0


app.post("/daily", function(req, res){
    let task = req.body["task"]
    let id = count
    let type = "<input type='checkbox' id='" + id 
        + "' name='task" + id 
        + "' value='" + id + "' class='checks' onclick='this.form.submit()'></input>"

    let label = "<label for='task" + id +"'><span id='span" + id + "' class=''>" + task + "</span></label><br>"
    dailyTasks.push({"id": id, "type": type, "label": label})
    console.log(dailyTasks)
    res.render("index.ejs", {tasks: dailyTasks})
    console.log("Get latest only")
    count++
})

app.post("/update", function(req, res){
    let id = req.body["task0"]
    dailyTasks[id].type = "<input type='checkbox' id='" + id 
    + "' name='task" + id 
    + "' value='" + id + "' class='checks' checked='yes' onclick='this.form.submit()'></input>"

    let tempString = dailyTasks[id].label
    let newString = tempString.replace("class=''", "class='strikethrough'")
    dailyTasks[id].label = newString
    console.log("update label")
    console.log(dailyTasks[id].label)


    console.log("update")
    console.log(req.body["task0"])
    console.log("wut")
    res.render("index.ejs", {tasks: dailyTasks})
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})