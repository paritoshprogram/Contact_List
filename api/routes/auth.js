const express = require("express")
const router = express.Router();
const db = require('../connect')
const authController = require('../controllers/auth')


router.get("/profile/:id",authController.checkAuth,(req,res)=>{

    res.status(200).json({message:req.params.id+" is logged in"})


})

router.post("/profile/:id/add",authController.checkAuth,authController.addContact)
router.post("/profile/:id/delete",authController.checkAuth,authController.deleteContact)
router.post("/profile/:id/update",authController.checkAuth,authController.updateContact)

router.get("/profile/:id/contacts",authController.checkAuth,authController.display_contacts)
router.post("/register",authController.register)
router.post("/login",authController.login,(req,res)=>{

    if(res.statusCode === 200)
    {
        const id = req.body.username
        console.log(res.statusCode)

        return res.redirect(`/auth/profile/${id}`)
    }

    else {
        return res.redirect('auth/login')
    }
})

router.get("/logout",authController.logout)


module.exports = router

