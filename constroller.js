import db from "./db/mysql";
const table = 'file'; 
function add(file){
    return db.add(table,file); 
}

const constroller = {
    add, 
}
export default constroller; 
