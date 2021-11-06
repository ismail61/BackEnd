module.exports = ()=>{
    return {
        serverError : (res,error)=>{
            console.log(error)
            res.status(500).json('Server error')
        },
        resourceError : (res,msg)=>{
            res.status(400).json(msg)
        }

    }
}