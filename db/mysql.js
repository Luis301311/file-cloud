import mysql from 'mysql'; 
import config  from '../config.js'



const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection; 

function conectionMysql(){
    connection = mysql.createConnection(dbconfig);
    connection.connect((err)=>{
        if(err){
            console.log(err)
            setTimeout(conectionMysql, 200);
        }else{
            console.log("database connection successful")
        }
    });
    connection.on('error', err =>{
        console.log(err);
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            conectionMysql();
        }else{
            throw err; 
        }
    }); 
}

conectionMysql(); 

function getAll(table){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`, (err, result)=>{
            return err ?  reject(err) :  resolve(result);
        })
    })
}

function add(table, data){
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`,data, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}



function getById(table, id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE ?`, [id], (err, result)=>{
            if (err) {
                reject(err);
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    const error = new Error();
                    reject(error);
                }
            }
        });
    });
}
const db ={
    add, 
    getAll, 
    getById, 
}
 export default db; 