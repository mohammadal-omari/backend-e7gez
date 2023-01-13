const Item = require('../../models/vendor.model')
const PageLikeSubscribe = require('../../models/pageLikeSubscribe.model')
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
            createdBy: req.user._id
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

itemController.getByAdminId = async (req, res, next) => {
    try {
        const adminId =req.params.adminId//mongoose.Schema.Types.ObjectId.fromString(req.params) ;
        //{admins: { $elemMatch: {$eq: ObjectId('6325c8472ad02c31c5e47a3a')} }}
        //{admins:{ $in: [ObjectId('6325c8472ad02c31c5e47a3a')] } }
        Item.findOne({ admins: {$eq:adminId}}).populate([{
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
//PageLikeSubscribe
itemController.getPageLikeSubscribe = async (req, res, next) =>{
    try {
        const { vendorId } = req.params;
        //console.log("vendorId: "+vendorId);
        const subscribe = await PageLikeSubscribe.find({vendorId: vendorId})
        var vendor = await Item.findOne({ _id: vendorId}).populate(
        {
         path: 'image',
         model: 'file'
        });
        var result={name:"",image:"",likes:0,dislikes:0,subscribes:0}

        result.name = vendor.name;
        result.image = vendor.image==null?'':vendor.image.filePath,
        subscribe.forEach(p=>{
            if(p.likes) result.likes+=1; 
            if(p.dislikes) result.dislikes+=1; 
            if(p.subscribes) result.subscribes+=1; 
        });

        return res.json(result);
    } catch (error) {
        next(error);
    }
}
module.exports = itemController;
