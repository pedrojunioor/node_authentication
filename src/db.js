const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')

dotenv.config({path:'src/.env'})

async function connect(){

    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection
    }
    const connection = await mysql.createConnection(`mysql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:3306/${process.env.DATABASE}`)
    console.log('conectou')

    global.connection = connection;
    return connection
}

async function createUser(user) {
    const {user_name, password, phone, email} = user;
    const conn = await connect();
    const sql = `INSERT INTO tbUser(user_name, password, phone, email) VALUES (?,?,?,?);`;
    const values = [user_name, password, phone, email]
    return conn.query(sql, values)
}

async function getUser(id){
    const conn = await connect();
    const sql = 'SELECT * FROM api_authentication.tbuser WHERE user_id=?;';
    const values = [id]
    return conn.query(sql,values)
}

async function getUsers(){
    const conn = await connect();
    const sql = 'SELECT * FROM api_authentication.tbuser;';
    return conn.query(sql)
}


async function editUser(id, user){
    const {user_name, password, phone, email} = user;
    const conn = await connect();
    const sql = `UPDATE api_authentication.tbuser SET user_name = '${user_name}', password = '${password}', phone = '${phone}', email = '${email}' WHERE (user_id = '${id}');`;
    return conn.query(sql)
}

async function deleteUser(id){
    const conn = await connect();
    const sql = `DELETE FROM api_authentication.tbuser WHERE (user_id = '${id}');`;
    return conn.query(sql)
}

async function login(email,password){
    if(!email || !password){
        return {message: 'Please provide a email and password.'};
    }

    const conn = await connect();
    const sql = `SELECT * from api_authentication.tbuser WHERE email='${email}'`

    try {
        const result = await conn.query(sql)
        console.log(result)
        if(result[0].length === 0){
            return {message: 'Email incorrect.'};
        }
        else if(password !== result[0][0].password){
            return {message: 'Password incorrect.'};
        }
        else{
            const id = result[0][0].user_id;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES})

            console.log('O TOKEN GERADO FOI:', token)
            return {token,id};
        }

    } catch (error) {
        throw error;
    }
}

connect();

module.exports = {createUser,getUser,getUsers,editUser, deleteUser,login}