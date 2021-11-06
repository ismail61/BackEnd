const validator = require('validator')

const validateValue = (email,password) =>{
    error = {}

    if(!email){
        error.email = 'Invalid Credentials'
    }else if(!validator.isEmail(email)){
        error.email = 'Please Provide your Correct Email'
    }
    if(!password){
        error.password = 'Invalid Credentials'
    }

    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}

module.exports = validateValue