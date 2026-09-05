const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('dvision','root',process.env.PW, {
    host: process.env.HOST,
    dialect: 'postgres',
})

module.exports = sequelize