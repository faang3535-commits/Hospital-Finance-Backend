const db = require("../../models");
const { Category, PaymentMethod } = db;

export const addCategory = async (req: any, res: any) => {
    try {
        const { label, type } = req.body;

        if (!label || !type) {
            return res.status(400).json({
                status: false,
                message: "Label and type are required"
            });
        }

        const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

        if (formattedType !== "Income" && formattedType !== "Expense") {
            return res.status(400).json({
                status: false,
                message: "Type must be either 'Income' or 'Expense'"
            });
        }

        const generatedValue = label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        const newCategory = await Category.create({
            value: generatedValue,
            name: label,
            type: formattedType,
            status: 'active'
        });

        return res.status(201).json({
            status: true,
            message: "Category added successfully",
            data: newCategory
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error adding category",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const addPaymentMethod = async (req: any, res: any) => {
    try {
        const { label, type } = req.body;

        if (!label || !type) {
            return res.status(400).json({
                status: false,
                message: "Label and type are required"
            });
        }

        const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

        if (formattedType !== "Income" && formattedType !== "Expense" && formattedType !== "Both") {
            return res.status(400).json({
                status: false,
                message: "Type must be 'Income', 'Expense', or 'Both'"
            });
        }

        const generatedValue = label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_+|_+$/g, '');

        const newPaymentMethod = await PaymentMethod.create({
            value: generatedValue,
            name: label,
            type: formattedType,
            status: 'active'
        });

        return res.status(201).json({
            status: true,
            message: "Payment method added successfully",
            data: newPaymentMethod
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error adding payment method",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const getMasterData = async (req: any, res: any) => {
    try {
        const categories = await Category.findAll();
        const paymentMethods = await PaymentMethod.findAll();

        return res.status(200).json({
            status: true,
            data: {
                categories,
                paymentMethods
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error fetching master data",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
