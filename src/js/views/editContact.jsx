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
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Full Name"
                        onChange={(e) => setEdit((prev) => {
                            return {
                                ...prev,
                                name: e.target.value
                            }
                        })
                        }
                        value={edit.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        placeholder="Enter Email"
                        onChange={(e) => setEdit((prev) => {
                            return {
                                ...prev,
                                email: e.target.value
                            }
                        })}
                        value={edit.email}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Enter Phone"
                        onChange={(e) => setEdit((prev) => {
                            return {
                                ...prev,
                                phone: e.target.value
                            }
                        })}
                        value={edit.phone}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        placeholder="Enter Address"
                        onChange={(e) => setEdit((prev) => {
                            return {
                                ...prev,
                                address: e.target.value
                            }
                        }
                        )}
                        value={edit.address}
                    />
                </div>
                <button className="container btn btn-primary"
                    onClick={(e) => {
                        e.preventDefault()
                        editedContact(
                            edit.name,
                            edit.email,
                            edit.phone,
                            edit.address,
                            params.id
                        )
                    }}
                >save</button>
                <Link to="/" className="card-link">or get back to contacts</Link>
            </div>
        </React.Fragment>
    )
}