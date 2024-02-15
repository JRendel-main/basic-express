const fs = require('fs')

const users = JSON.parse(fs.readFileSync('data/users.json'))

function getUsers () {
    return users
}
function createUser (userData) {
    const newid = users[users.length -1].id + 1
    const newUsers = Object.assign({id: newid}, userData)

    users.push(newUsers)
    fs.writeFile('./data/users.json', JSON.stringify(users), (err) => {
        console.log(err);
    })

    return newUsers
}
function updateUser (newid, newuser) {

    const user = users.find((user) => user.id === parseInt(newid))
    if(!user) {
        return {
            success: failed,
            error: `User with id of ${newid} is not found!`
        }
    }

    const index = users.indexOf(user)
    const newRecord = Object.assign(user, newuser)
    users[index] = newRecord
    users.push(newRecord)

    fs.writeFile('./data/users.json', JSON.stringify(users), (err)=>{
        return {
            success: true,
            user: {
                user: newRecord,
            }
        }
    })
}
function getUsersbyId (newid) {

    const user = users.find((user) => user.id === parseInt(newid))
    if(!user) {
        return {
            statusCode: 404,
            success: false,
            error: `User with id of ${newid} is not found!`
        }
    }
    return {
        success: true,
        statusCode: 200,
        data: { user }
    }
}

function deleteUser (id) {
    const user = users.find((user) => user.id === parseInt(id));
    if(!user){
        return {
            success: false,
            statusCode: 404,
            error: `User with id of ${id} is not found!`
        }
    }
}

module.exports = {getUsers,
    createUser,
    updateUser,
    getUsersbyId,
    deleteUser
}