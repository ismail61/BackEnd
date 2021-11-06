const {Schema,model} = require('mongoose')
const { schema } = require('./user')

const transactionSchema = new Schema({
    amount : {
        type : Number,
        required : true,
        trim : true
    },
    type : {
        type : String,
        required : true
    },
    note : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    }
},{
    timestamps : true
})

module.exports = model('Transaction',transactionSchema)