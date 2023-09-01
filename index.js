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
app.post("/daily", function(req, res){
    let reqName = req.body["task"]
    let reqDone = req.body["done"]
    console.log("prevItems: " + req.body["prevItems"])
    // console.log("checking name: "+ reqName)
    // console.log("checking value: "+ reqDone)
    dailyTasks.push({"name":reqName, "done":reqDone})
    console.log(dailyTasks)
    res.render("index.ejs", {
        tasks: dailyTasks
    })
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})