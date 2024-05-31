import db from "./db/mysql.js";
const table = 'files'; 
function add(file){
    const  data = {
        Id_file : file.Id_file,
        Url : file.Url,
        filename: file.filename,
        mimetype : file.mimetype,
        originalname : file.originalname
    }; 
    return db.add(table,data); 
}

const constroller = {
    add, 
}
export default constroller; 
//save
