import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {

    const { actions } = useContext(Context)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const Navigate = useNavigate();

    const createContact = async () => {
        await actions.newContact(name, phone, email, address)
        const newAgenda = await actions.getContacts();

        
        Navigate("/", { newAgenda });
    }

    return (
        <React.Fragment>
            <div className="container"> 
                <h1 className="text-center">Add a new contact</h1>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Full name</label>
                    <input required type="text" name="name" className="form-control" id="inputName" 
                        placeholder="Full name" value={name} onChange={(event) => {setName(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input required type="email" className="form-control" id="email"
                        placeholder="Enter Email"  value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input required type="number" className="form-control" id="phone"
                        placeholder="Enter Phone" value={phone} onChange={(event) => {setPhone(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input required type="text" className="form-control" id="address"
                        placeholder="Enter Address" value={address} onChange={(event) => {setAddress(event.target.value)}}/>
                </div>

                <button  type="button" className="btn btn-primary w-100"
                    onClick={createContact}> 
                    Save
                 </button>
                <Link to="/"> 
                <button className="btn btn-secondary w-100 mt-2">Back to contacts</button>
                </Link>
            </div>
        </React.Fragment>
    )
}