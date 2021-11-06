const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    name : {
        type  : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        require : true,
        trim : true
    },
    password : {
        type : String,
        required : true
    },
    balance : {
        type : Number,
        default : 0
    },
    income :{
        type : Number,
        default : 0
    },
    expense : {
        type : Number,
        default : 0
    },
    transactions : [{
        type : Schema.Types.ObjectId,
        ref : 'Transaction'
    }]
},{
    timestamps : true
})

module.exports  = model('User',userSchema)