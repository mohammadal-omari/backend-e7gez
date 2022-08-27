const Item = require('../../models/item')

const itemController = {};

itemController.create = async (req, res, next) => {

    try {
        // let filePath = req.files.uploads[0].path.substr(req.files.uploads[0].path.lastIndexOf('\\') + 1);
        const { name, location, country, menu, admins, category, locationUrl, city, image } = req.body.itemDto;
        const newItem = new Item({
            name,
            location,
            country,
            menu,
            category,
            locationUrl,
            admins,
            city,
            image,
            createdBy: '62e5b1e9ba47892c09024424'
        });

        newItem.save().then(doc => {
            return res.status(200).send({
                message: 'Saved successfully'
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
        Item.find().populate({
            path: 'category',
            model: 'category'
        }).then(doc => {
                return res.status(200).send({
                    items: doc
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
        const { itemNumber } = req.params;
        Item.findOne({ itemNumber: itemNumber }).populate([{
            path: 'category',
            model: 'category'
        },
        {
         path: 'image',
         model: 'file'
        }]).then(doc => {
            return res.status(200).send({
                item: doc
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
        const { admins, name, locationUrl, country, menu, categoryName, itemNumber, city, isActive, image } = req.body.itemDto;
        Item.updateOne({ itemNumber: itemNumber }, { image,isActive, categoryName, locationUrl, admins, city, name, country, menu }).then(doc => {
            return res.status(200).send({
                message: 'Saved successfully'
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
