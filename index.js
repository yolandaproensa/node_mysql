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

app.post("/edit/save", (req, res) => {
    const { id, name, pageqty } = req.body

    const sql = `
    UPDATE books
    SET name = '${name}', pageqty = '${pageqty}'
    WHERE id = ${id}
    `

    conn.query (sql, (error) => {
    if (error){
        return console.log(error)
    }

    res.redirect("/")
    })
})

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

app.get('/edit/:id',  (request, response) => {
    const id = request.params.id

    const sql = `
        SELECT *
        FROM books
        WHERE id = ${id} 
        `

    conn.query(sql, (error, data) => {
        if (error) {
            return console.log (error)
        }

        const book = data[0]

        response.render ('edit', {book})
    })
})

app.get('/book/:id', (request, response) => {
    const id = request.params.id
    
    const sql =`
                SELECT * FROM books
                WHERE id=${id} 
                `
                conn.query(sql, (error, data) =>{
                        if(error) {
                                return console.log(error)
                        }
                        const book = data[0]
                        response.render('book', {book})
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