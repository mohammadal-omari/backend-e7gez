const Item = require('../../models/item')

const itemController = {};

itemController.creat = async (req, res, next) => {

    try {
    // let filePath = req.files.uploads[0].path.substr(req.files.uploads[0].path.lastIndexOf('\\') + 1);
        const { name, image, location, country, menu } = req.body;
        const newItem = new Item({
            name,
            image,
            location,
            country,
            menu,
            usertId: req.user._id
        });

        newItem.save().then(doc => {
            console.log(doc);
            return res.status(200).send({
                message: 'saved'
              });
        }).catch(err => {
            return res.status(500).send({
                message: err.message
              });
        });

    } catch (error) {
        next(error);
    }

}



module.exports = itemController;
