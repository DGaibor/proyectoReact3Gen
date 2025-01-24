import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {LocalStorageService} from "../../../services/localStorage/localStorage.js";
import {UserTable} from "../../../components/userTable/UserTable.jsx";

export const Users = () => {
    
    const localStorageService = new LocalStorageService();
    const navigate = useNavigate();
    useEffect(()=>{
        const userLogged = localStorageService.getLoggedUser()
        if (userLogged.role !== 'admin') {
            navigate('/')
        }
    },[])
    
    return (
        <>
        <UserTable/>
        </>
        
        
    )
}
