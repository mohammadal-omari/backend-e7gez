const Item = require('../../models/item')

const itemController = {};

itemController.create = async (req, res, next) => {

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

itemController.getAll = async (req, res, next) => {

    try {
        Item.find().then(doc => {
            return res.status(200).send({
                data: doc
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

itemController.getById = async (req, res, next) => {
    try {
        const {itemNumber} = req.params;
        Item.findOne({itemNumber: itemNumber}).then(doc => {
            return res.status(200).send({
                data: doc
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

itemController.update = async (req, res, next) => {
    try {
        const { name, image, location, country, menu, itemNumber } = req.body;
        Item.updateOne({itemNumber: itemNumber},{name, image, location, country, menu,usertId: req.user._id}).then(doc => {
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
