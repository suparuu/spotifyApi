export default (req , res) => {
    res.statusCode = 200;
    res.json({ name : req.query.id})
}