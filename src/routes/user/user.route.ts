import  {
   addUser,
   userLogin,
   getUserDetails,
   updateUser,
   userDelete,
   changeUserPassword,
   manageUser,
} from "../../controller/user/user.Controller";
const { checkRole } = require("../../middleware/permissionMiddleware");
const express = require("express")
const router = express.Router();

router.route("/login").post(userLogin);

router.route("/addUser").post(checkRole(["Admin","SuperAdmin"]), addUser);

router.route("/updateUser").put(checkRole(["SuperAdmin", "Admin"]), updateUser)
router.route("/getDetails").get(checkRole(["SuperAdmin", "Admin"]), getUserDetails)

// router.route("/delete").put(checkRole(["SuperAdmin"]), userDelete)

// router.route("/change-password/:userId").put(
//   checkRole(["SuperAdmin"]),
//   changeUserPassword
// )

router.route("/manage-user").post(checkRole(["SuperAdmin"]), manageUser)

export default router