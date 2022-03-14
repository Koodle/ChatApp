//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const multer = require("multer")  //https://www.youtube.com/watch?v=EVOFt8Its6I
//filesystem module to perform operations on files
const fs = require("fs")
const path = require("path")


exports.userFile = ((req, res, next) => {

    const getFileType = (file) => {
        //mimeType is the extension of the file (e.g. docx, txt, js, csv)
        const mimeType = file.mimetype.split("/")
        return mimeType[mimeType.length - 1]

    }

    const generateFileName = (req, file, callback) => {
        const extension = getFileType(file)
        const filename = Date.now() + "-" + Math.round(Math.random() * 1E9) + "." + extension
        callback(null, file.fieldname + "-" + filename)  
    }

    const fileFilter = (req, file, callback) => {
        const extension = getFileType(file) 
        //use regex to test if extension is correct
        const allowedType = /jpeg|jpg|png/
        const passed = allowedType.test(extension)

        if (passed) {
            return callback(null, true)
        }

        return callback(null, false)
    
    }


    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            
            //create a user Destination
            const {id} = req.user
            const destination = `uploads/user/${id}`

            //check if file exists
            fs.access(destination, (error)=>{
                
                //if file doesn't exist 
                if(error){

                    //create the file
                    return fs.mkdir(destination, (error)=>{
                        callback(error, destination)
                    })
                    
                //it does exist
                }else{ 
                    
                    //replace the avatar
                    fs.readdir(destination, (error, files)=>{
                        if(error) throw error

                        //delete existing avatar
                        for (const file of files) {
                            fs.unlink(path.join(destination, file), error => {
                                if(error) throw error
                            })
                        }
                    })

                    return callback(null, destination)

                }
            })
        },
        filename: generateFileName //we haven't passed a callback? how does generateFileName() know what callback is?
    })

    //fileFilter to perform validation on the img upload
    return multer({ storage, fileFilter }).single("avatar")  // we only upload a single file

})()// self invoked