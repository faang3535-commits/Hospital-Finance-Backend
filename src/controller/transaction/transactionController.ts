const db = require("../../models");
const { Transaction, Category, PaymentMethod, User } = db;

export const addTransaction = async (req: any, res: any) => {
    try {
        const { 
            patient_file_no, 
            patient_name, 
            payee_name,
            date, 
            amount, 
            income_type, 
            payment_method, 
            notes,
            type
        } = req.body;

        const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
        if (formattedType !== "Income" && formattedType !== "Expense") {
            return res.status(400).json({
                status: false,
                message: "Type must be either 'Income' or 'Expense'"
            });
        }

        if (formattedType === "Income") {
            if (!patient_file_no) {
                return res.status(400).json({
                    status: false,
                    message: "Patient File No. is required for Income entries."
                });
            }
        }

        if (!date || !amount || !income_type || !payment_method) {
            return res.status(400).json({
                status: false,
                message: "Missing required fields: date, amount, category(income_type), and payment_method are required."
            });
        }

        const category = await Category.findOne({ where: { value: income_type, type: formattedType } });
        if (!category) {
            return res.status(404).json({
                status: false,
                message: `Category with value '${income_type}' and type '${formattedType}' not found.`
            });
        }

        const method = await PaymentMethod.findOne({ where: { value: payment_method } });
        if (!method) {
            return res.status(404).json({
                status: false,
                message: `Payment method with value '${payment_method}' not found.`
            });
        }

        const creator_id = req.user.id;

        const newTransaction = await Transaction.create({
            file_no: patient_file_no,
            patient_name: patient_name,
            payee_name: payee_name,
            amount,
            transaction_date: date,
            type: formattedType,
            category_id: category.id,
            payment_method_id: method.id,
            created_by: creator_id,
            notes
        });

        return res.status(201).json({
            status: true,
            message: "Transaction recorded successfully",
            data: newTransaction
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error recording transaction",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};

export const getTransactions = async (req: any, res: any) => {
    try {
        const transactions = await Transaction.findAll({
            include: [
                { model: Category, as: 'category', attributes: ['name', 'type'] },
                { model: PaymentMethod, as: 'paymentMethod', attributes: ['name'] },
                { model: User, as: 'creator', attributes: ['name', 'email'] }
            ],
            order: [['transaction_date', 'DESC'], ['createdAt', 'DESC']]
        });

        return res.status(200).json({
            status: true,
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error fetching transactions",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
