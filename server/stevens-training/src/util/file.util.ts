import * as fs from 'fs';
import { diskStorage } from "multer";
import { extname } from "path";
import { v4 as uuid } from 'uuid';

export const savefile = (path: string, data) => {
    fs.writeFile(path, 
        data,
        { 
          encoding: "base64"
        },
        (err) => {
          if(err) {
            console.error("Error while saving file");
            return;
          }
          console.log("New file written successfully with path " + path);
    });
}

export const removefile = (userId, fileId) => {
    fs.stat(`./uploads/${userId}/${fileId}`, (err, stats) => {
        if(err) {
            console.error("File to remove doesnt exist, not deleting");
            return;
        }
        console.log("File to remove exists, now deleting");
        fs.unlink(`./uploads/${userId}/${fileId}`, (err) => {
            if(err) {
            console.error("Error while deleting file for user ", userId);
            return;
            }
            console.log("Successfully deleted old file.");
        })
    });
}


const maxSize = 10 * 1024 * 1024; //10MB should be enough ;

export const storage = diskStorage({
    destination: "./tmp",
    filename: (req, file, callback) => {
      callback(null, generateFilename(file));
    }
});
  
export const limits = {
  fileSize: maxSize
}

export const fileFilter = (req, file, cb) => {
    switch(file?.mimetype){
      case "image/jpeg" : cb(null, true); break;
      case "image/bmp" : cb(null, true);  break;
      case "image/gif" : cb(null, true);  break;
      case "image/png" : cb(null, true);  break;
      case "image/webp" : cb(null, true);  break;
      case "video/mp4" : cb(null, true);  break;
      default: {
        console.log("Error: file uploaded does not have allowabe mimetype ")
        cb(null, false); 
        break;
      }
    }
}

function generateFilename(file: any) {
    return `tmp-file-${uuid()}${extname(file.originalname)}`;
}
  