
function demo(req,res){
    var params = req.params;

    return res.status(200).send({message: "wena wena", dato_entrada: params})
}
module.exports = {
    demo
}