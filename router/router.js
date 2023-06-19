const express = require("express")
const router = express.Router()
const {popup , getPopups , sortPopup , dupilicatepopups}= require("../controller/popupController")
const {enquiryRequest, getenquiries , sortenquiries ,dupilicateEnquiries } =require("../controller/enquirycontroller")
router.get("/test-me", function (req, res) {
    res.send("this is successfully created");
  });

  //==============================================================
  router.post("/popup",popup)
router.get("/getPopups",getPopups)
router.get("/sortPopup",sortPopup)
router.get("/dupilicatepopups",dupilicatepopups)
//==================================================================
router.post("/enquiryRequest",enquiryRequest)
router.get("/getenquiries",getenquiries)
 router.get("/sortenquiries", sortenquiries)
 router.get("/dupilicateEnquiries",dupilicateEnquiries)
module.exports = router 