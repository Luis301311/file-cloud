import db from "./db/mysql.js";
const table = 'file'; 
function add(file){
    const  data = {
        
    }
     db.add(table,file)
     .then(respon =>{
       return db.getById(respon.id);
     })
     .catch(err =>{

     }); 

/* {
    "fieldname": "file",
    "originalname": "METRICAS DEL SOFTWARE - Modelos Medicion PP.pdf",
    "encoding": "7bit",
    "mimetype": "application/pdf",
    "destination": "/home/luis/Proyects Visual/uploadcare-example/uploads",
    "filename": "METRICAS DEL SOFTWARE - Modelos Medicion PP-1717098435016.pdf",
    "path": "/home/luis/Proyects Visual/uploadcare-example/uploads/METRICAS DEL SOFTWARE - Modelos Medicion PP-1717098435016.pdf",
    "size": 1892517
} */
}

const constroller = {
    add, 
}
export default constroller; 
