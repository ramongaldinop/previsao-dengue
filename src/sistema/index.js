const express = require('express')
const router = express.Router()

router.get('/', (req,res)=> {
    res.send('Sistema rodando com sucesso.')
})

module.exports = router