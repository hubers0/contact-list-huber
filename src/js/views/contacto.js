import React, { useContext } from "react";
import userImagen  from "../../img/balon.jpg";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

export const Contact = ({ id, name, address, phone, email }) => {
    const { actions } = useContext(Context)
    const navigate = useNavigate()

    const handleDelete = async () => {
        actions.deleteContact(id)
    }

    const handleEdit = async () => {
        let url = "/EditContact/" + id
        navigate(url)
    }
    return (

        <div className="card container">
            <div className="row m-2">
                <div className="col-2 container d-flex align-items-center">
                    <img src={userImagen} className="img-fluid rounded-circle" alt="Contact Image" />
                </div>
                <div className="col-6 card-body m-0 px-5">
                    <h5 className="card-title mx-2">{name}</h5>
                    <h6 className="card-text text-muted">
                        <i className="fa fa-map-marker-alt me-2"></i>{address}</h6>
                    <p className="card-text text-muted mb-1">
                        <i className="fa fa-phone me-2"></i>{phone}</p>
                    <p className="card-text text-muted">
                        <i className="fa fa-envelope me-2"></i>{email}</p>

                </div>
                <div className="col-md-4 my-2 text-end">
                    <button className="btn btn-primary fa fa-edit"
                        onClick={handleEdit}
                    ></button>
                    <button className="btn btn-danger fa fa-trash"
                        onClick={handleDelete}
                    ></button>
                </div>
            </div>
        </div>

    )
}