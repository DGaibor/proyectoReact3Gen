import {db} from "../firebase/firebase.js";
import {collection, addDoc, query, where, getDocs } from "firebase/firestore";

export class UserService {
    
    constructor() {
        
    }
    
    async createUser(user) {
        const userCollectionRef = collection(db, "users");
        
        try {
            await addDoc(userCollectionRef, user)
            return {data: user, message: 'User created successfully.'};
        }catch (error) {
            return {data: null, message: 'Error creating user'};
        }
    }
    
    async login(email, password) {

        const userCollectionRef = collection(db, "users");
        const setQuery = query(userCollectionRef, where("email", "==", email),where("password", "==", password));
        try{
            const resultQuery = await getDocs(setQuery);
            if (!resultQuery.empty) {
                const userResult = resultQuery.docs[0].data();
                return {data: {...userResult,password:''}, message: 'User login successfully.'};
            }else{
                return {data: null, message: 'Incorrect email or password'};
            }
        }catch (error) {
            return {data: null, message: 'Incorrect email or password'};
        }
      

    }
}
