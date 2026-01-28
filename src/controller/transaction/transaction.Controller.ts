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
            category, 
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

        // if (formattedType === "Income") {
        //     if (!patient_file_no) {
        //         return res.status(400).json({
        //             status: false,
        //             message: "Patient File No. is required for Income entries."
        //         });
        //     }
        // }

        if (formattedType === "Income") {
            if (!date || !amount || !category || !payment_method) {
                return res.status(400).json({
                    status: false,
                    message: "Missing required fields: date, amount, income type, and payment method are required."
                });
            }
        }
        
        if (formattedType === "Expense") {
            if (!date || !amount || !category || !payment_method) {
                return res.status(400).json({
                    status: false,
                    message: "Missing required fields: date, amount, expense type, and payment method are required."
                });
            }
        }

        const categoryData = await Category.findOne({ where: { value: category, type: formattedType } });
        if (!categoryData) {
            return res.status(404).json({
                status: false,
                message: `Category with value '${category}' and type '${formattedType}' not found.`
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
            category_id: categoryData.id,
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
        const { page = 1, limit = 10, startDate, endDate, type, category, search, income_type, expense_type, date } = req.query;
        const { Op } = db.Sequelize;

        const limitVal = parseInt(limit as string) || 10;
        const pageVal = parseInt(page as string) || 1;
        const offset = (pageVal - 1) * limitVal;

        const where: any = {};

        if (startDate) where.transaction_date = { ...where.transaction_date, [Op.gte]: new Date(startDate as string) };
        if (endDate) where.transaction_date = { ...where.transaction_date, [Op.lte]: new Date(endDate as string) };

        if (date) {
            const dateParams = Array.isArray(date) ? date : [date];
            dateParams.forEach((d: string) => {
                if (d.startsWith('gte.')) where.transaction_date = { ...where.transaction_date, [Op.gte]: new Date(d.replace('gte.', '')) };
                if (d.startsWith('lte.')) where.transaction_date = { ...where.transaction_date, [Op.lte]: new Date(d.replace('lte.', '')) };
            });
        }

        if (type) {
            where.type = type;
        }
        let categoryValue = category || income_type || expense_type;
        if (categoryValue && typeof categoryValue === 'string') {
            categoryValue = categoryValue.replace('eq.', '');
        }

        if (search) {
            where[Op.or] = [
                { patient_name: { [Op.iLike]: `%${search}%` } },
                { file_no: { [Op.iLike]: `%${search}%` } },
                { payee_name: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const { count, rows } = await Transaction.findAndCountAll({
            where,
            include: [
                { 
                    model: Category, 
                    as: 'category', 
                    attributes: ['name', 'type', 'value'],
                    where: categoryValue ? { value: categoryValue } : undefined
                },
                { model: PaymentMethod, as: 'paymentMethod', attributes: ['name', 'value'] },
                { model: User, as: 'creator', attributes: ['name', 'email'] }
            ],
            limit: limitVal,
            offset: offset,
            order: [['transaction_date', 'DESC'], ['createdAt', 'DESC']],
            distinct: true
        });

        return res.status(200).json({
            status: true,
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: Math.ceil(count / limitVal),
                currentPage: pageVal,
                limit: limitVal
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Error fetching transactions",
            error: error instanceof Error ? error.message : String(error)
        });
    }
};
