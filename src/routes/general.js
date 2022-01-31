const router = require("express").Router();
const generalController = require("../controller/general");
const loginMiddleware = require("../middleware/login");

router.get("/isciler-getir", generalController.empGet);
router.delete("/isci-sil", generalController.empDelete);
router.post("/isci-elave", generalController.empAdd);
router.get("/mail-yoxla", generalController.checkEmail);
router.put("/isci-update", generalController.empUpdate);
router.post("/login", generalController.login);

router.get("/me", loginMiddleware, generalController.me);


module.exports = router;