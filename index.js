const express = require('express')
const fs = require('fs')

const users = JSON.parse(fs.readFileSync("./data/users.json"))

const app = express()       
const PORT = 8000

app.use(express.json())

app.get('/users', (req,res)=>{
    res.status(200).json({
        status: 'success',
        count: users.length,
        data: {
            users
        }
    })
})

app.get('/users/:id', (req,res)=> {
    const newid = req.params.id

    const user = users.find((user) => user.id === parseInt(newid))
    if(!user) {
        res.status(404).json({
            status: "Failed",
            error: `User with id of ${newid} is not found!`
        })
    }
    res.status(200).json({
        status: "Success",
        data: { user }
    })
})

app.patch('/users/:id', (req,res)=> {
    const newid = req.params.id
    const newuser = req.body

    const user = users.find((user) => user.id === parseInt(newid))
    if(!user) {
        res.status(404).json({
            status: "Failed",
            error: `User with id of ${newid} is not found!`
        })
    }

    const index = users.indexOf(user)
    const newRecord = Object.assign(user, newuser)
    users[index] = newRecord
    users.push(newRecord)

    fs.writeFile('./data/users.json', JSON.stringify(users), (err)=>{
        res.status(200).json({
            status: "Success",
            data: {
                user: newRecord,
            }
        })
    })
})

app.post('/users', (req,res)=> {
    const user = req.body
    const newid = users[users.length -1].id + 1

    const newUsers = Object.assign({id: newid}, user)
    
    fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                newUsers
            }
        })
    })
})

app.delete('/users/:id', (req,res)=> {
    const id = req.params.id

    const user = users.find((user) => user.id === parseInt(id));
    if(!user){
        console.log("error")
    }


})

app.listen(PORT, () => {
    console.log("Server Running");
})