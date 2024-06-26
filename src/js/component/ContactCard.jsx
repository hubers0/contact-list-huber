import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Contact } from "../views/Contact.jsx";

export const ContactCard = () => {
    const { actions, store } = useContext(Context)
    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <div className="container d-flex justify-content-end">
                <Link to="/addContact/" className="btn btn-success mt-4 mb-2">Add a new contact</Link>
            </div>
            <div>
                {
                    store.contacts.map((item) =>
                    (
                        <Contact
                            id={item.id}
                            name={item.name}
                            address={item.address}
                            phone={item.phone}
                            email={item.email}
                            key={item.id}
                        />
                    )
                    )
                }
            </div>
        </React.Fragment>
    );
};