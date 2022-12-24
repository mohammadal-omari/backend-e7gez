
const Post = require('../../models/post.model')
const jwt = require('jsonwebtoken');
const postController = {};

postController.create = async (req, res, next) => {
    console.log("dddddd: "+req.body.postobj);
    try {
        //console.log("dddddd: "+req.headers.authorization);
        const data = jwt.decode(req.headers.authorization.split(" ")[1]);
        // let filePath = req.files.uploads[0].path.substr(req.files.uploads[0].path.lastIndexOf('\\') + 1);
        
        const { text, image, vendorId } = req.body.postobj;
        const newPost = new Post({
            text,
            image,
            vendorId,
            createdBy: data._id
        });
        console.log(newPost);
        newPost.save().then(doc => {
            console.log("doc: "+doc);
            return res.status(201).send({
                message: 'Created successfully'
            });
        }).catch(err => {
            console.log("doc: "+err);
            return res.status(500).send({
                message: err.message
            });
        });

    } catch (error) {
        next(error);
    }

}
module.exports = postController;