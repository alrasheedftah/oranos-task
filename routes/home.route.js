const router=require('express').Router()

const bodyParser=require('body-parser').urlencoded({extended:true})

const HomeController=require('../controllers/home.controller')

router.get('/',bodyParser,HomeController.getHomeAna)
router.get('/:id',bodyParser,HomeController.getHomeAna)


module.exports=router