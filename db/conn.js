const {Sequelize} = require('sequelize')

console.log(process.env.DB_USERNAME)
const sequelize = new Sequelize('dvision', process.env.DB_USERNAME, process.env.PW, {
    host: process.env.HOST,
    dialect: 'postgres',
})

module.exports = sequelize