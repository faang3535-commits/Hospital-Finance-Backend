const jwt = require("jsonwebtoken");
const db = require("../models");
const { User } = db;

const checkRole = (allowedRoles: string[]) => {
    return async (req: any, res: any, next: any) => {
        try {
            const token = req.headers.authorization?.split(" ")[1];

            if (!token) {
                return res.status(401).json({
                    status: false,
                    message: "Access Denied! No token provided"
                });
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findByPk(decoded.id);

            if (!user) {
                return res.status(404).json({
                    status: false,
                    message: "User not found"
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    status: false,
                    message: `Access Denied! Requires one of these roles: ${allowedRoles.join(", ")}`
                });
            }

            req.user = user;
            return next();
        } catch (error: any) {
            return res.status(401).json({
                status: false,
                message: "Invalid or Expired Token",
                error: error.message
            });
        }
    };
};

module.exports = {
    checkRole
};


