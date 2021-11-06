const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/user')
const error = require('../error/error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const transaction = require('../model/transaction')
function userController() {
    return {
        home: (req, res) => {
            res.send('MEAN Stack Project')
        },
        login: (req, res) => {
            res.send('Login Page')
        },
        userLogin: (req, res) => {
            const {email,password} = req.body
            const validator = loginValidator(email,password)
            if(validator.isValid){
                //populate transactions from Transaction database
                User.findOne({
                    email : email
                }).then((user)=>{
                    if(!user){
                        return error().resourceError(res,'Invalid Credentials')
                    }else{
                        bcrypt.compare(password,user.password,(err,match)=>{
                            if(err){
                                return error().serverError(res,err)
                            }else if(!match){
                                return error().resourceError(res,'Invalid Credentials')
                            }else{
                                const token = jwt.sign({
                                    _id : user._id,
                                    name : user.name,
                                    email : user.email,
                                    balance : user.balance,
                                    income : user.balance,
                                    expense : user.expense,
                                    transactions : user.transactions
                                },'secretKey',{
                                    expiresIn : '2h'
                                })
                                return res.status(200).json({
                                    message : 'Login successful',
                                    token : `Bearer ${token}`
                                })
                            }
                        })
                    }                    
                }).catch((err)=>{
                    return error().serverError(res,err)
                })
            }else{
                res.status(400).json(validator.error)
            }
           
        },
        userRegister: (req, res) => {
            const { name, email, password, confirmPassword } = req.body
            console.log(req.body)
            const validator = registerValidator(req.body)
            if (validator.isValid) {

                User.findOne({
                    email: email
                }).then((user) => {                       
                        if (user) {
                            return res.status(400).send('Email Already exists')
                        }else{
                            bcrypt.hash(password,10,(err,hash)=>{
                                if(err){
                                    return error().serverError(res,err)
                                }else{
                                    const user = new User({
                                        name, email, password:hash
                                    })
                                    user.save()
                                        .then((data) => {
                                            res.json(data)
                                        })
                                        .catch((err) => {
                                            return error().serverError(res,err)
                                        })
                                }
                            })
                            
                        }
                    }).catch((err) => {
                        return error().serverError(res,err)
                    })

            } else {
                res.status(400).json(validator.error)
            }
        }

    }
}
module.exports = userController