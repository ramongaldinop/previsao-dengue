const express = require('express')
const router = express.Router()

router.post('/', (req,res)=> {
    const password = req.body.senha
    
    if (password === process.env.SYS_PASSWORD) {
        req.session.auth = true
        res.redirect('/')
    } else {
        const error = "Senha incorreta!"
        res.render('error', {error: {login: true, description: error}, unauthorized: true})
    }
})

router.post('/logout', (req,res) => {
    req.session.destroy()

    res.redirect('/')
})

module.exports = router