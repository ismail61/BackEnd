const validator = require('validator')

const validateValue = (amount,type,note) =>{
    error = {}

    if(!amount){
        error.amount = 'Amount Please'
    }else if(amount<1){
        error.amount = 'Required Valid Number'
    }
    if(!type){
        error.type = 'Amount type Please'
    }
    if(!note){
        error.note = 'Note Please'
    }

    return {
        error,
        isValid : Object.keys(error).length === 0
    }
}

module.exports = validateValue