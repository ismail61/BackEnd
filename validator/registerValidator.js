const validator = require('validator')

const validateValue = (user) =>{
    error = {}
    if(!user.name){
        error.name = 'Please Provide your Name'
    }
    if(!user.email){
        error.email = 'Please Provide your Email'
    }else if(!validator.isEmail(user.email)){
        error.email = 'Please Provide your Correct Email'
    }
    if(!user.password){
        error.password = 'Please Provide your Password'
    }else if(user.password.length < 6){
        error.password = 'Password must be greater than 6 characters'
    }
    if(!user.confirmPassword){
        error.confirmPassword = 'Please Provide your Confirm Password'
    }else if(user.password != user.confirmPassword){
        error.confirmPassword = 'confirm Password does\'t match'
    }

    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}

module.exports = validateValue