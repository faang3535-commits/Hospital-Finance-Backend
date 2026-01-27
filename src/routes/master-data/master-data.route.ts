import {
    addCategory,
    addPaymentMethod,
    getMasterData
} from "../../controller/master-data/masterDataController";
const { checkRole } = require("../../middleware/permissionMiddleware");
const express = require("express");
const router = express.Router();

router.route("/add-category").post(checkRole(["SuperAdmin"]), addCategory);
router.route("/add-payment-method").post(checkRole(["SuperAdmin"]), addPaymentMethod);
router.route("/get-all").get(checkRole(["Admin", "SuperAdmin"]), getMasterData);

export default router;
