const { response } = require("express")
const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql2")

const app = express()

app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

app.use(express.static("public"))

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.post("/register/save", (req, res) => {
    const { name, pageqty } = req.body

    const query = `
        INSERT INTO books (name, pageqty)
        VALUES ('${name}', '${pageqty} ')
        `

    conn.query (query, (error) => {
        if(error) {
            console.log(error)
            return
        }

        res.redirect("/")
        })
})

app.get("/register", (req, res) => {
    res.render("register")
})

app.get('/', (req, res) => {
    const sql = 'SELECT * FROM books'
    
    conn.query(sql, (error, data) => {
    if(error){
        console.log(error)
    }
    
    const books = data

    console.log(books)

    res.render("home", { books })
    })
})

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "nodemysql",
    port: 3306
})

conn.connect((error) => {
    if(error){
        console.log(error)
        return
    }

    console.log("Conectado ao MySQL!")

    app.listen(3000, () => {
        console.log("Servidor rodando na porta 3000!")
    })
})