import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const EditContact = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate();
    const [edit, setEdit] = useState(
        {
            name: "",
            phone: "",
            email: "",
            address: ""
        }
    )
    const params = useParams()

    const editedContact = async (name, phone, email, address, id) => {
        await actions.getContacts()
        const prevContact = store.contacts.filter((contact) => contact.id == id)
        await actions.editContact(
            name == "" ? prevContact.name : name,
            phone == "" ? prevContact.phone : phone,
            email == "" ? prevContact.email : email,
            address == "" ? prevContact.address : address,
            id,
        )
        navigate("/")
        actions.getContacts()
    }

    return (
        <React.Fragment>
            <div className="container">
                <h1 className="text-center">Edit contact</h1>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">Full name</label>
                    <input required type="text" name="name" className="form-control" id="inputName" 
                        placeholder="Full name" value={edit.name} onChange={(event) => {setName(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input required type="text" className="form-control" id="email"
                        placeholder="Enter Email"  value={edit.email} onChange={(event) => {setEmail(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input required type="text" className="form-control" id="phone"
                        placeholder="Enter Phone" value={edit.phone} onChange={(event) => {setPhone(event.target.value)}}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input required type="text" className="form-control" id="address"
                        placeholder="Enter Address" value={edit.address} onChange={(event) => {setAddress(event.target.value)}}/>
                </div>
                <button className="container btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault()
                        editedContact(edit.name, edit.email, edit.phone, edit.address, params.id)}}>save</button>
                <Link to="/">
                <button className="btn btn-secondary w-100 mt-2">Back to contacts</button>
                </Link>
            </div>
        </React.Fragment>
    )
}