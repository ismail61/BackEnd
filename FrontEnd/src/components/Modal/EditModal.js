import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const EditModal = ({ token, transactions, fetchData }) => {
    const toastMsg = (msg) => {
        toast.error(msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    }
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('')
    const [transaction, setTransaction] = useState({
        amount: transactions.amount,
        type: transactions.type,
        note: transactions.note
    })
    const modalOpen = () => {
        setIsOpen(true)
    }
    const closeOpen = () => {
        setIsOpen(false)
        setTransaction({
            amount: transactions.amount,
            type: transactions.type,
            note: transactions.note
        })
        setError('')
    }

    const inputChangeHandler = (event) => {
        if (event.target.name === 'amount') {
           
            if (event.target.value < 0) {
                return setError('Enter Positive Value')
            }
            setError('')
        }
        setTransaction((oldValue) => {
            return {
                ...oldValue,
                [event.target.name]: event.target.value
            }
        }

        )
    }
    const createTransaction = event => {

        event.preventDefault()
        if (!transaction.amount || !transaction.note) {
            setTransaction({
                amount: transactions.amount,
                type: transactions.type,
                note: transactions.note
            })
            return toastMsg('All Fields Are Required')
        }

        axios.put(`http://localhost:4444/users/transaction/${transactions._id}`, {
            amount: parseInt(transaction.amount),
            type: transaction.type,
            note: transaction.note
        }, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            setTransaction({
                amount: response.data.amount,
                type: response.data.type,
                note: response.data.note
            })
            setError('')
            fetchData()
        }).catch(err => {
            return toastMsg('Server error')
        })
    }
    return (
        <div>
            <div className="btn btn-success" onClick={modalOpen}>
               Edit
            </div>
            <Modal show={isOpen} onHide={closeOpen}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Transaction</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={createTransaction}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Type</Form.Label>
                            <Form.Control value={transaction.type} onChange={inputChangeHandler} name='type' as="select">
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>
                                <span className="float-left">
                                    Amount
                                </span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="float-right m-30 text-danger">{error}</span> </Form.Label>
                            <Form.Control onChange={inputChangeHandler} value={transaction.amount} name="amount" type="number" />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Note</Form.Label>
                            <Form.Control value={transaction.note} onChange={inputChangeHandler} name="note" as="textarea" rows={3} />
                        </Form.Group>
                        <Button className="float-left" variant="secondary" onClick={closeOpen}>
                            Close
                        </Button>
                        <Button onClick={() => setIsOpen(false)} className="float-right" type="submit">
                            Save
                        </Button>

                    </Form>
                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
            />
        </div>
    );
};

export default EditModal;
