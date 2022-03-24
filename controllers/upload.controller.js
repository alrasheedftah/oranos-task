

exports.uploadFiles=(req,res,next)=>{
    // req.body.sender = req.user._id
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let files = req.files.files;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            files.mv('./assets/files/' + files.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: files.name,
                    mimetype: files.mimetype,
                    size: files.size
                }
            });
        }
    } catch (err) {
        console.log(req.files.files);
        res.status(500).send(err);
    }

}