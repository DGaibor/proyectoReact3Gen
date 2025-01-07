import {useEffect} from "react";
import {LocalStorageService} from "../../services/localStorage/localStorage.js";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    
    const localStorageService = new LocalStorageService();
    const navigate = useNavigate();
    useEffect(() =>{
        if (!localStorageService.checkLoggedUser()){
            navigate('/login');
        }
    })
    return <>
    Home
    </>
}
