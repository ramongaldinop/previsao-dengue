const express = require('express')
const router = express.Router()

router.post('/', (req,res)=> {
    const password = req.body.senha
    
    if (password === process.env.SYS_PASSWORD) {
        req.session.auth = true
        res.redirect('/')
    }
})

module.exports = router