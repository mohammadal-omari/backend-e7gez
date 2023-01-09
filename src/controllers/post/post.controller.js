
const Post = require('../../models/post.model')
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs')
const File = require('../../models/file')

//const fromBuffer = require('file-type');
const postController = {};

postController.create = async (req, res, next) => {
    //console.log("dddddd: "+JSON.parse(req.body.postobj));
    try {
        //console.log("dddddd: "+req.headers.authorization);
        const data = jwt.decode(req.headers.authorization.split(" ")[1]);
        // let filePath = req.files.uploads[0].path.substr(req.files.uploads[0].path.lastIndexOf('\\') + 1);
        //var imageFileId=null;
        const { text, image, vendorId } = req.body.postobj;
        //console.log("dddddd: " + text + image.substr(0,100) + vendorId);

        // if(image !=null){
        //     console.log(base64FileHeaderMapper(image));
        //     const buffer = Buffer.from(image, "base64");
        //     var nameWithExt=Date.now().toString()+'.'+base64FileHeaderMapper(image);
        //     fs.writeFileSync(path.join(__dirname + '/../../upload/'+nameWithExt), buffer);
        //     var imageContentType = 'application/json';//getFileData(buffer);
            
        //     const newFile = new File({
        //         filePath: nameWithExt,
        //         fileName: nameWithExt,
        //         fileContentType: imageContentType,
        //         fileContentType: imageContentType
        //     });
        //    newFile.save().then(doc => {
        //         console.log('newFile: '+ doc);
        //         imageFileId= doc._id;
        //         const newPost = new Post({
        //             text:text,
        //             image:imageFileId,
        //             vendorId:vendorId,
        //             createdBy: data._id
        //         });
        //         console.log('newPost : '+newPost);
        //         newPost.save().then(doc => {
        //             console.log("doc: "+doc);
        //             return res.status(201).send({
        //                 message: 'Created successfully'
        //             });
        //         }).catch(err => {
        //             console.log("doc: "+err);
        //             return res.status(500).send({
        //                 message: err.message
        //             });
        //         });
        //     }).catch(err => {
        //         console.log(err);
        //         imageFileId= null
        //     });
        // }
        

        const newPost = new Post({
            text:text,
            image:image,
            vendorId:vendorId,
            createdBy: data._id
        });
        console.log('newPost : '+newPost);
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
postController.getAllByVendorId = async (req, res, next) => {
    // try {
    //     const { vendorId } = req.params;
    //     const posts = await Post.find({_id: vendorId}).populate({
    //         path: 'imagePath',
    //         model: 'file'}).exec();
    //     result = [];
    //     posts.forEach(p=>{
    //         result.append({
    //         text:p.text,
    //         imageFileId:p.image._id,
    //         vendorId,
    //         createdBy: data._id
    //         }) 
    //     })
        // .then(doc => {
        //         return res.status(200).send({
        //             items: doc
        //         });
        //     }).catch(err => {
        //         return res.status(500).send({
        //             message: err.message
        //         });
        //     });

    // } catch (error) {
    //     next(error);
    // }
}
module.exports = postController;

function base64FileHeaderMapper(fileBase64) {

    let fileHeader = new Map();

    //get the first 3 char of base64
    fileHeader.set("/9j", "JPG")
    fileHeader.set("iVB", "PNG")
    fileHeader.set("Qk0", "BMP")
    fileHeader.set("SUk", "TIFF")
    fileHeader.set("JVB", "PDF")
    fileHeader.set("UEs", "OFD")

    let res = ""

    fileHeader.forEach((v, k) => {
        if (k == fileBase64.substr(23, 3)) {
            res = v
        }
    })

    //if file is not supported
    if (res == "") {
        res = "unknown file"
    }

    //return map value
    return res;
}
const getFileData = async (buffer) => {
    // const mimeInfo = await fromBuffer(buffer)
    // console.log(mimeInfo);
    return 'application/json';//mimeInfo
}