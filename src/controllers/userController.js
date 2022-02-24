const db = require('../db')

module.exports = {
    async createUser(req, res) {
        const response = await db.createUser(req.body)
        if(response[0].affectedRows > 0){
            const users = await db.getUsers();
            res.send(users[0])
        }
        return response
    },
    async getUser(req, res) {
        const { id } = req.params
        const user = await db.getUser(id);
        res.send(user[0])
    },
    async getUsers(req, res) {
        const users = await db.getUsers();
        res.send(users[0])
    },
    async editUser(req, res) {
        const { id } = req.params
        const user = await db.editUser(id, req.body)
        res.send(user)
    },
    async deleteUser(req, res) {
        const { id } = req.params
        const user = await db.deleteUser(id)
        res.send(user)
    },
    async login(req, res) {
        const {email, password} = req.body
        const result = await db.login(email, password);
        res.send(result)
    }
}