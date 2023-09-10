const router = require("express").Router();
const passport = require("passport");

router.get("/login/succeed",(req,res)=>{
    if(req.user){
        res.status(200).json({
            user:req.user
        })
    }
})

router.get("/login/failed",(req,res)=>{
    res.status(401).end()
})

router.get("/", passport.authenticate("google",{ scope : ["profile"]}));

router.get("/callback/google",passport.authenticate("google",{
    successRedirect: "",
    failureRedirect: "/login/failed"
}))
