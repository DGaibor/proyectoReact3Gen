export class LocalStorageService {
    
    constructor() {
        
    }
    
    addLoggedUser(user){

        localStorage.setItem('userLogged', JSON.stringify(user));
    }
    
    checkLoggedUser(){
        const user = localStorage.getItem('userLogged');
        if (user) {
            return true
        }
        return false;
    }
}
