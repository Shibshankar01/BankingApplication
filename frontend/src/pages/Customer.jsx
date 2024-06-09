import React, {useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "../modal/Modal"

const Customer = () => {

    const {state} = useLocation()

    const [transactions, setTransactions] = useState([])
    const [showModal, setShowModal] = useState(false)
    const depOrCred = "";
    useEffect(() => {
        const fetchAllTransactions = async ()=> {
            try {
                const res = await axios.get("http://localhost:8800/transactions/"+state.Id);
                setTransactions(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllTransactions()
    }, [])

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-11/12">
                <h1 className="text-3xl font-extrabold">Available Balance:- {state.AvailableBalance}</h1>
                <div className="grid grid-cols-4 gap-4">
                    {transactions.map(transaction => (
                        <div className='transaction' key={transaction.id}>
                            <h3>DepositedAmount:- {transaction.DepositedAmount}</h3>
                            <h3>WithdrawnAmount:- {transaction.WithdrawnAmount}</h3>
                        </div> 
                    ))}
                </div>
                <button className="mt-4 w-full flex items-center justify-center px-5 py-3 font-medium rounded-md bg-black text-white"
                onClick={() => setShowModal(true)}>Deposit Money</button>
                <button className="mt-4 w-full flex items-center justify-center px-5 py-3 font-medium rounded-md bg-black text-white"
                onClick={() => setShowModal(true)}>Withdraw Money</button>
                {showModal && <Modal onClose={() => setShowModal(false)}/>}
            </div>
        </div>
    )
}

export default Customer