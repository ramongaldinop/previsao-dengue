const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const casos = db.define('caso', {
    municipio_nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    semana_epidemiologica: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    casos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    casos_estimados: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    rt: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    temp_media: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    umid_media: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

module.exports = casos