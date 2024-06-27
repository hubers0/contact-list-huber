import React, { useContext, useEffect } from "react"
import { Context } from "../store/appContext.js";
import { Contact } from "../views/contacto.js";
import { Link } from "react-router-dom";


export const ContactCard = () => {
    
    const { actions, store } = useContext(Context)

    const deleteContact = ()=>{
        actions.deleteContact(store.contactIdToDelete);
}
    useEffect(() => {

    }, [])

    return (
        <React.Fragment>
            <div className="container d-flex justify-content-end">
                <Link className="mt-4 mb-2" to="/addContact">
                    <button className="btn btn-success">Add contact</button>
                </Link>
            </div>
            <ul className="list-unstyled">
                {store.contacts.map((contact) => (
                        <Contact key={contact.id} name={contact.name} address={contact.address} phone={contact.phone} email={contact.email} id={contact.id}/>
                    ))}
            </ul>
        </React.Fragment>
    );
};