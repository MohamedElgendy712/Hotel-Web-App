module.exports = (req , res , next) => {
    
    req.session.destroy(() =>{
        
        res.statusCode = 200
        res.setHeader("content-type" , "application/json")
        res.json({msg : "Session is destroied successfuly"})

    })
}