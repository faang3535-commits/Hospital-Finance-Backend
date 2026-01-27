import userRouter from "./user/user.route";
import masterDataRouter from "./master-data/master-data.route";
import transactionRouter from "./transaction/transaction.route";

export default function router(app: any) {
    app.use("/api/user", userRouter);
    app.use("/api/master-data", masterDataRouter);
    app.use("/api/transaction", transactionRouter);
}
