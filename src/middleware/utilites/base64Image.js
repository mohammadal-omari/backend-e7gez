const path = require('path');
const fs = require('fs')
const File = require('../../models/file')

module.exports = (req, res, next) => {
    console.log(base64FileHeaderMapper(req.body.postobj.image));
    if (req.body.postobj.image!=null) {
       // var imageFileId=null;
        const { text, image, vendorId } = req.body.postobj;
        console.log(base64FileHeaderMapper(image));
        const buffer = Buffer.from(image, "base64");
        var nameWithExt=Date.now().toString()+'.'+base64FileHeaderMapper(image);
        fs.writeFileSync(path.join(__dirname + '/../../upload/'+nameWithExt), buffer);
        var imageContentType = 'application/json';//getFileData(buffer);
        
        const newFile = new File({
            filePath: nameWithExt,
            fileName: nameWithExt,
            fileContentType: imageContentType,
            fileContentType: imageContentType
        });
        // newFile.save().then(doc => {
        //     console.log('newFile: '+ doc);
        //     req.body ={postobj:{text:text, image:doc._id, vendorId:vendorId}} ;
        // }).catch(err => {
        //     console.log(err);
        //     req.body ={postobj:{text:text, image:null, vendorId:vendorId}} ;
        // });
        
        next(()=>{
            newFile.save().then(doc => {
                console.log('newFile: '+ doc);
                req.body ={postobj:{text:text, image:doc._id, vendorId:vendorId}} ;
            }).catch(err => {
                console.log(err);
                req.body ={postobj:{text:text, image:null, vendorId:vendorId}} ;
            });
        });
    } else {
        next();
    }
};


        
                
function base64FileHeaderMapper(fileBase64) {

    let fileHeader = new Map();

    //get the first 3 char of base64
    fileHeader.set("/9j", "JPG")
    fileHeader.set("iVB", "PNG")
    //fileHeader.set("Qk0", "BMP")
    //fileHeader.set("SUk", "TIFF")
    //fileHeader.set("JVB", "PDF")
    //fileHeader.set("UEs", "OFD")

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