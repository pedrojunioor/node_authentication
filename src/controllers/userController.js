const db = require('../db')

module.exports = {
    async createUser(req, res) {
        await db.createUser(req.body)
        res.json(req.body)
    },
    async getUser (req, res) {
        const {id} = req.params
        const user = await db.getUser(id); 
        res.send(user[0])
    },
    async getUsers(req, res) {
        const users = await db.getUsers(); 
        res.send(users[0])
    },
    async editUser (req, res) {
        const {id} = req.params
        const user = await db.editUser(id,req.body)
        res.send(user)  
    },
    async deleteUser(req, res) {
        const {id} = req.params
        const user = await db.deleteUser(id)
        res.send(user)  
    }
}