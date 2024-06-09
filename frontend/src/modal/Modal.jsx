import React from "react";
import { X } from 'lucide-react'

const Modal = ({onClose}, props) => {

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/deposit");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-white">
                <button onClick={onClose} className="place-self-end"><X size={30}/></button>    
                <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-extrabold">Enter the {props.depOrCred} amount</h1>
                    <form>
                        <input type="number" placeholder="Enter the amount" required 
                        className="w-full px-4 py-3 text-black border-gray-300 rounded-md"/>
                        <button onClick={handleClick} className="mt-4 w-full flex items-center justify-center px-5 py-3 font-medium rounded-md bg-black">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal