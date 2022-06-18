const express = require("express")
const app = express()
const port = 3000
const exphbs = require("express-handlebars")
const restaurant = require("./restaurant.json")


//setting template engine
app.engine("handlebars", exphbs({ defaultLayout:"main" }))
app.set("view engine", "handlebars")

//setting static files 
app.use(express.static("public"))

//main page render
app.get("/",(req,res) => {
    //console.log(restaurant.results)
    res.render("index", { restaurantList: restaurant.results})
})
//restaurant info page 
app.get("/restaurants/:id", (req,res) => {
    console.log(req.params.id)
    const restaurantInfo = restaurant.results.find((x) => {
       return x.id.toString() === req.params.id
    })
   
    res.render("show", {restaurantList: restaurantInfo})
})

//search result
app.get("/search",(req,res) => {
    const keyword = req.query.keyword.trim()
    const searchResult = restaurant.results.filter((x) =>{
        return x.name.toLowerCase().includes(keyword.toLowerCase()) || x.category.toLowerCase().includes(keyword.toLowerCase())
    })

  
    res.render("index", { restaurantList: searchResult, keyword: keyword})
})

//listen
app.listen(port,() => {
    console.log("app is on")
})