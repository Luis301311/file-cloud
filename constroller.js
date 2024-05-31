import db from "./db/mysql.js";
const table = 'files'; 
 async function add(file){
    const  data = {
        Id_file : file.Id_file,
        Url : file.Url,
        filename: file.filename,
        mimetype : file.mimetype,
        originalname : file.originalname
    }; 
    try {
        const result = await db.add(table, data);
        return data;
    } catch (err) {
        return err;
    }
}
function getAll(){
    return db.getAll(table);
}


const constroller = {
    add, 
    getAll,
}
export default constroller; 
//save
