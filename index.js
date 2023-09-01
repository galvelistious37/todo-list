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
    dailyTasks.push(req.body["task"])
    res.render("index.ejs", {
        tasks: dailyTasks
    })
})

app.listen(port, () =>{
    console.log(`Listening on port ${port}`)
})