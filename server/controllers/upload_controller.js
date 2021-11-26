const upload = require("../middleware/upload");

const uploadFile = async (req, res) => {
    try {
        await upload(req, res);
        if(req.files.length <= 0) {
            return res.send(`You must select a file`);
        }
        return res.json({file:req.files});
    } catch (error) {
        return res.send(`Error when trying upload image: ${error}`);
    }
};

const deleteFile = (req, res) => {
    var fs = require('fs');
    fs.unlinkSync(`./uploads/${req.params.id}`)
}; 

module.exports = {uploadFile, deleteFile};