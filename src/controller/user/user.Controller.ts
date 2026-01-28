const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../models");
const { User, Transaction, Category, PaymentMethod } = db;

export const userLogin = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ 
                status: false,
                message: "Email and password are required!"
            });
        }

        const user = await User.findOne({
            where: { email }
        });
        
        if (!user) {
            return res.status(404).json({
                status: false,
                message: `No account found with email ${email}`
            });
        }

        if (user.status === "banned") {
            return res.status(403).json({
                status: false,
                message: "Your account has been banned. Please contact support."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                status: false,
                message: "Invalid credentials" 
            });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.SECRET_KEY, 
            { expiresIn: "30d" }
        );
        
        const userData = { 
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        
        res.status(200).json({ 
            status: true,
            message: "Successfully logged in!", 
            data: userData, 
            token 
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Error during login", 
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

export const addUser = async (req: any, res: any) => {
    try {
        const { name, email, password, role } = req.body;
        
        const validRoles = ["Admin", "SuperAdmin"];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ 
                status: false,
                data: null,
                message: "Invalid role. Role must be either 'Admin' or 'SuperAdmin'" 
            });
        }
        
        const existingUser = await User.findOne({ 
            where: { email }  
        });
        
        if (existingUser) {
            return res.status(400).json({ 
              status: false,
              data: null,
              message: "Email already exists" 
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await User.create({ 
            name, 
            email, 
            password: hashedPassword, 
            role
        });

        const userData = { 
            id: newUser.id, 
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        };
        
        res.status(201).json({ 
            status: true,
            message: "User account successfully created!", 
            data: userData 
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

export const getUserDetails = async (req: any, res: any) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'role', 'status', 'createdAt'],
            order: [['createdAt', 'DESC']]
        });

        const adminCount = await User.count({ 
            where: { role: 'Admin' } 
        });
        
        const superAdminCount = await User.count({ 
            where: { role: 'SuperAdmin' } 
        });

        const totalTransactions = await Transaction.count();
        
        const totalCategories = await Category.count();
        
        const totalPaymentMethods = await PaymentMethod.count();

        return res.status(200).json({
            status: true,
            data: {
                users,
                statistics: {
                    totalUsers: users.length,
                    adminCount,
                    superAdminCount,
                    totalTransactions,
                    totalCategories,
                    totalPaymentMethods
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error while fetching user details",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export const updateUser = async(req: any, res: any) => {
    try {
        const { userId, ...data } = req.body;
        
        if (!userId) {
            return res.status(400).json({ 
                status: false,
                message: "User ID is required." 
            });
        }

        const existingUser = await User.findByPk(userId);
        
        if (!existingUser) {  
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        if (data.role) {
            const validRoles = ["Admin", "SuperAdmin"];
            if (!validRoles.includes(data.role)) {
                return res.status(400).json({ 
                    status: false,
                    message: "Invalid role. Role must be either 'Admin' or 'SuperAdmin'" 
                });
            }
        }

        if (data.password) {
            delete data.password;
        }

        await existingUser.update(data);

        const response = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role
        };

        res.status(200).json({ 
            status: true,
            message: 'User details updated successfully', 
            data: response 
        });
        
    } catch(error) {
        res.status(500).json({ 
            status: false,
            message: "Error updating user", 
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

export const userDelete = async(req: any, res: any) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ 
                status: false,
                message: "User ID is required." 
            });
        }

        const existingUser = await User.findByPk(userId);
        
        if (!existingUser) {
            return res.status(404).json({ 
                status: false,
                message: "User not found." 
            });
        }
        
        await existingUser.destroy();

        return res.status(200).json({ 
            status: true,
            message: "User deleted successfully!" 
        });
    } catch(error) {
        return res.status(500).json({ 
            status: false,
            message: "Something went wrong", 
            error: error instanceof Error ? error.message : String(error) 
        });
    }
};

export const changeUserPassword = async (req: any, res: any) => {
    try {
        const { userId } = req.params;
        const { newPassword } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: false,
                data: null,
                message: "userId parameter is required"
            });
        }

        if (!newPassword) {
            return res.status(400).json({
                status: false,
                data: null,
                message: "New password is required"
            });
        }

        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                status: false,
                data: null,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const adminId = decoded.id;

        if (decoded.role !== "SuperAdmin") {
            return res.status(403).json({
                status: false,
                data: null,
                message: "Only super admin can update user passwords"
            });
        }

        const admin = await User.findOne({
            where: { 
                id: adminId,
                role: "SuperAdmin"
            }
        });

        if (!admin) {
            return res.status(403).json({
                status: false,
                data: null,
                message: "Super admin not found"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                data: null,
                message: "User not found"
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedNewPassword });

        return res.status(200).json({
            status: true,
            message: "Password updated successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            data: null,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const manageUser = async (req: any, res: any) => {
    try {
        const { action, userId, email, fullName, role } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "User ID is required"
            });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        switch (action) {
            case "toggle_ban":
                const newStatus = user.status === "banned" ? "active" : "banned";
                await user.update({ status: newStatus });
                return res.status(200).json({
                    status: true,
                    message: `User successfully ${newStatus === "banned" ? "banned" : "unbanned"}`,
                    data: { userId: user.id, status: user.status }
                });

            case "remove_role":
                await user.update({ role: null });
                return res.status(200).json({
                    status: true,
                    message: "User role removed successfully",
                    data: { userId: user.id, role: null }
                });

            case "delete":
                await user.destroy();
                return res.status(200).json({
                    status: true,
                    message: "User deleted successfully"
                });

            case "update":
                const updates: any = {};
                if (email) updates.email = email;
                if (fullName) updates.name = fullName;
                if (role) {
                    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
                    updates.role = ["Admin", "SuperAdmin"].includes(formattedRole) ? formattedRole : role;
                }
                
                await user.update(updates);
                return res.status(200).json({
                    status: true,
                    message: "User updated successfully",
                    data: {
                        userId: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role
                    }
                });

            default:
                return res.status(400).json({
                    status: false,
                    message: "Invalid action"
                });
        }

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};