const validator = require("../validator/transactionValidator");
const Transaction = require("../model/transaction");
const User = require("../model/user");

const error = require("../error/error");
module.exports = () => {
    return {
        createUserTransaction: (req, res) => {
            const { amount, type, note } = req.body;
            const validatorTransaction = validator(amount, type, note);
            const authorId = req.user._id;
            if (validatorTransaction.isValid) {
                const transaction = new Transaction({
                    amount,
                    type,
                    note,
                    author: authorId,
                });
                transaction
                    .save()
                    .then((trans) => {
                        const updateUser = { ...req.user._doc };
                        
                        if (type === "income") {
                            updateUser.balance = updateUser.balance + amount;
                            updateUser.income = updateUser.income + amount;
                        }
                        if (type === "expense") {
                            updateUser.balance = updateUser.balance - amount;
                            updateUser.expense = updateUser.expense + amount;
                        }
                        updateUser.transactions.unshift(trans._id);
                        console.log(updateUser)
                        User.findByIdAndUpdate(
                            updateUser._id,
                            {
                                $set: updateUser,
                            },
                            {
                                new: true,
                            }
                        ).catch(err=>{
                            return error().serverError(res, err);
                        })
                        return res.status(201).json({
                            message: "Transaction Created Successful",
                            ...trans._doc,
                        });
                    })
                    .catch((err) => {
                        return error().serverError(res, err);
                    });
            } else {
                res.status(400).json(validatorTransaction.error);
            }
        },
        getAllTransaction: (req, res) => {
            const {_id} = req.user
            Transaction.find({
                    author : _id
                })
                .then((trans) => {
                    if (trans.length === 0) {
                        res.status(200).json({
                            message: "No Transaction Found",
                        });
                    }
                    return res.status(200).json(trans);
                })
                .catch((err) => {
                    return error().serverError(res, err);
                });
        },
        getATransaction: (req, res) => {
            const { transactionId } = req.params;
            Transaction.findById(transactionId)
                .then((trans) => {
                    if (!trans) {
                        return res.json(200).json({
                            message: "transaction Not Found",
                        });
                    } else {
                        return res.json(200).json(trans);
                    }
                })
                .catch((err) => {
                    return error().serverError(res, err);
                });
        },
        putUserTransaction: (req, res) => {
            const { transactionId } = req.params;
            Transaction.findByIdAndUpdate(
                transactionId,
                { $set: req.body },
                { new: true }
                )
                .then((trans) => {
                    return res.status(200).json({
                        message: "updated Successful",
                        ...trans._doc,
                    });
                })
                .catch((err) => {
                    return error().serverError(res, err);
                });
        },
        deleteUserTransaction : (req, res) => {
            const { transactionId } = req.params;
            console.log(transactionId)
            Transaction.findByIdAndDelete(transactionId)
                .then((trans) => {
                    return res.status(200).json({
                        message: "Deleted Successful",
                        ...trans._doc
                    });
                })
                .catch((err) => {
                    return error().serverError(res, err);
                });
        },
    };
};
