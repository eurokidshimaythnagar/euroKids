const express = require("express")
const router = express.Router()
const {popup ,getpopup }= require("../controller/popupController")
const {enquiryRequest, getenquiries , sortenquiries ,dupilicateEnquiries } =require("../controller/enquirycontroller")
const {register , login}=require("../controller/userController")
const {authentication}=require("../middleware/auth")
router.get("/test-me", function (req, res) {
    res.send("this is successfully created");
  });
  //=========================================================================
router.post("/register",register)
router.post("/login",login)

  //==============================================================
  router.post("/popup",popup)
router.get("/getPopups",authentication,getpopup)
// router.get("/sortPopup",sortPopup)
// router.get("/dupilicatepopups",dupilicatepopups)
//==================================================================
router.post("/enquiryRequest",enquiryRequest)
router.get("/getenquiries",authentication,getenquiries)
 router.get("/sortenquiries", sortenquiries)
 router.get("/dupilicateEnquiries",dupilicateEnquiries)
module.exports = router 
