const express = require('express')
const userService = require('../service/userService')

exports.getUserData = (req,res) => {
    const user = userService.getUsers()
    res.status(200).json({
        success: true,
        data: user
    })
}

exports.getUserbyId = (req,res)=> {
    const newid = req.params.id
    const user = userService.getUsersbyId(newid)
    if(!user.success) {
        return res.status(404).json({
            statusCode: user.StatusCode,
            user
        })
    }
}

exports.updateUser = (req,res)=> {
    const newid = req.params.id
    const newuser = req.body

    const user = userService.updateUser(newid,newuser)
    if(!user.success) {
        res.status(200).json({
            error: user.error
        })
    }
}

exports.createUser = (req,res)=> {
    const user = userService.createUser(req.body)
    res.status(201).json({
        status: "success",
        data: {
            user
        }
    })
}

exports.deleteUser = (req,res)=> {
    const id = req.params.id

    const user = userService.deleteUser(id)
    if(!user.success) {
        res.status(400).json({
            error: user.error
        })
    res.status(204).json({
        message: "User has been deleted"
    })
    }
}