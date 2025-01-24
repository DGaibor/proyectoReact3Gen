import {useEffect} from "react";
import {LocalStorageService} from "../../services/localStorage/localStorage.js";
import {useNavigate} from "react-router-dom";
import {FlatTable} from "../../components/flatTable/FlatTable.jsx";
import {Header} from "../../components/header/Header.jsx";

export const Home = () => {
    
    const localStorageService = new LocalStorageService();
    const navigate = useNavigate();
    useEffect(() =>{
        if (!localStorageService.checkLoggedUser()){
            navigate('/login');
        }
    })
    return <>
        <Header/>
        <h1>Home</h1>
    <FlatTable/>
    </>
}
