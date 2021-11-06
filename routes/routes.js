const userController = require('../controller/userController')
const transactionsController = require('../controller/transactionController')
const authenticate = require('../Auth/authenticate')
function routes(app){
    app.get('/users/login',userController().login)
    app.post('/users/login',userController().userLogin)
    app.post('/users/register',userController().userRegister)
    app.get('/users/transactions',authenticate,transactionsController().getAllTransaction)
    app.get('/users/transactions/:transactionId',authenticate,transactionsController().getATransaction)
    app.post('/users/transaction',authenticate,transactionsController().createUserTransaction)
    app.put('/users/transaction/:transactionId',authenticate,transactionsController().putUserTransaction)
    app.delete('/users/transaction/:transactionId',authenticate,transactionsController().deleteUserTransaction)
    app.get('/',userController().home)
}

module.exports = routes