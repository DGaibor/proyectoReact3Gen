import {LocalStorageService} from "../../services/localStorage/localStorage.js";


export const Header = () => {
    
    const localStorageService = new LocalStorageService();
    
    const userLogged = localStorageService.getLoggedUser();
    
    console.log(userLogged.role);
    
    
    
    return (
        <nav className="navbar navbar-default">
            <div className="container">
                <a className="navbar-brand" href="/">Home</a>
                <br/>
                <a className="navbar-brand" href="/flat/create">Create Flat</a>
                <br/>
                { userLogged?.role && userLogged?.role === 'admin' && <a className="navbar-brand" href="/user/all">All Users</a>}
            </div>
        </nav>
    )
}
