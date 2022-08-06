const Item = require('../../models/item')
const Category = require('../../models/mainCategory')
const adminController = {};


adminController.getAll = async (req, res, next) => {

    try {
        Category.find({}).then(doc => {
            return res.status(200).send({
                categories: doc
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

adminController.getById = async (req, res, next) => {
    try {
        const { categoryNumber } = req.params;
        Category.findOne({ categoryNumber: categoryNumber }).then(doc => {
            return res.status(200).send({
                category: doc
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



adminController.createCatogery = async (req, res, next) => {
    try {
        const { categoryName, categoryCode } = req.body.categoryDto;
        const newCategory = new Category({
            categoryName,
            categoryCode,
            createdBy: '62e5b1e9ba47892c09024424'
        });

        newCategory.save().then(doc => {
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

adminController.updateCatogery = async (req,res, next) => {
    try {
        const { categoryName, categoryCode, isActive, categoryNumber } = req.body.categoryDto;
        
        Category.updateOne({categoryNumber:categoryNumber}, req.body.categoryDto).then(doc => {
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
module.exports = adminController;
