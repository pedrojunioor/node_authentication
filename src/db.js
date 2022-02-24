const mysql = require('mysql2/promise');

async function connect(){

    if(global.connection && global.connection.state !== 'disconnected'){
        return global.connection
    }
    const connection = await mysql.createConnection("mysql://root:rootmysql@localhost:3306/api_authentication")
    console.log('conectou')

    global.connection = connection;
    return connection
}

async function createUser(user) {
    const {user_name, password, phone, email} = user;
    const conn = await connect();
    const sql = `INSERT INTO tbUser(user_name, password, phone, email) VALUES (?,?,?,?);`;
    const values = [user_name, password, phone, email]
    await conn.query(sql, values)
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
    const conn = await connect();
    const sql = `UPDATE api_authentication.tbuser SET user_name = '${user_name}', password = '${password}', phone = '${phone}', email = '${email}' WHERE (user_id = '${id}');`;
    return conn.query(sql)
}

async function deleteUser(id, user){
    const conn = await connect();
    const sql = `DELETE FROM api_authentication.tbuser WHERE (user_id = '${id}');`;
    return conn.query(sql)
}

connect();

module.exports = {createUser,getUser,getUsers,editUser, deleteUser}