import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {LocalStorageService} from "../../../services/localStorage/localStorage.js";
import {UserForm} from "../../../components/userForm/UserForm.jsx";

export const UpdateProfile = () => {

    let { id } = useParams();
    const localStorageService = new LocalStorageService();
    
    if (!id){
        const user = localStorageService.getLoggedUser();
        id = user.id;
    }
    
    return (
        <>
            <UserForm id={id}/>
        </>
    )
}
