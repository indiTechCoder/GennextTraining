exports.render = function (req, res){
    res.render('index', {
        title : "GenNext Training",
        user : JSON.stringify(req.user)
    })
}