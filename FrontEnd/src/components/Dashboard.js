import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import ModalTransaction from './Modal/ModalTransaction'
import EditModal from './Modal/EditModal'
import { ToastContainer, toast } from 'react-toastify';
import jwtDecode from 'jwt-decode'
import jwt from 'jsonwebtoken'
const Dashboard = () => {
    const history = useHistory()
    const token = localStorage.getItem('userToken')
    if(!token){
        history.push('/login');
    }else{
        jwt.verify(token.substring(7), 'secretKey', (error, decode) => {
            if(error){
                localStorage.clear();
                history.push('/login');
            }
        })
    }
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
    const [transactions, setTransactions] = useState([])
    //const token = localStorage.getItem('userToken')
    useEffect(() => {
        fetchData()
    }, [])
    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:4444/users/transactions', {
                headers: {
                    'Authorization': token
                }
            })
            if (response) {
                if (response.data) {
                    setTransactions(response.data)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteHandler = (Id) => {
        axios.delete(`http://localhost:4444/users/transaction/${Id}`, {
            headers: {
                'Authorization': token
            }
        }).then(response => {
            fetchData()
        }).catch(err => {
            return toastMsg('Server error')
        })
    }
    return (
        <div className="container">
            <ModalTransaction token={token} fetchData={fetchData} transactions={transactions} />
            {transactions.length > 0 ?
                <div className="row">
                    {transactions.map(transaction => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4">
                                <div className="card border-success m-3">
                                    <div className="card-header text-center">
                                        {transaction.type === 'income' ? <h5 className="card-title text-success">{transaction.type}</h5> :
                                            <h5 className="card-title text-danger">{transaction.type}</h5>}
                                    </div>
                                    <div className="card-body text-center">
                                        <p className="card-text">{transaction.note}</p>
                                        <p className="card-text">Amount : {transaction.amount}</p>

                                    </div>
                                    <div className="card-footer bg-transparent border-success">
                                        <a className="float-left card-link">
                                            <EditModal token={token} fetchData={fetchData} transactions={transaction} />
                                        </a>
                                        <a onClick={() => deleteHandler(transaction._id)} className="btn btn-danger float-right card-link">

                                            <DeleteIcon />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div> : <div className="text-center text-danger">There Is No Transaction</div>}

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

export default Dashboard;