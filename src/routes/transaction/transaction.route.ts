import { addTransaction, getTransactions } from "../../controller/transaction/transactionController";
const { checkRole } = require("../../middleware/permissionMiddleware");
const express = require("express");
const router = express.Router();

// Allow Admin and SuperAdmin to record transactions
router.route("/add").post(checkRole(["Admin", "SuperAdmin"]), addTransaction);

// Allow Admin and SuperAdmin to view transactions
router.route("/get-all").get(checkRole(["Admin", "SuperAdmin"]), getTransactions);

export default router;
