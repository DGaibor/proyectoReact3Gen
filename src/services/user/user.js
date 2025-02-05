import {db} from "../firebase/firebase.js";
import {collection, addDoc, query, where, getDocs , getDoc, doc, updateDoc} from "firebase/firestore";

export class UserService {
    
    constructor() {
        
    }
    
    async createUser(user) {
        const userCollectionRef = collection(db, "users");
        
        try {
            const result = await addDoc(userCollectionRef, user)
            
            return {data: {...user, id: result.id}, message: 'User created successfully.'};
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
                const id= resultQuery.docs[0].id
                return {data: {...userResult,password:'', id: id}, message: 'User login successfully.'};
            }else{
                return {data: null, message: 'Incorrect email or password'};
            }
        }catch (error) {
            return {data: null, message: 'Incorrect email or password'};
        }
    }
    
    async getUser(id) {
        
        const userRef = doc(db, "users",id);
        const result = await getDoc(userRef);
        return {data:  result.data()};
        
    }
    
    async updateUser(user, id) {
        const userRef = doc(db, "users",id);
        
        if (user.password === ''){
            delete user.password
        }
        
        await updateDoc(userRef, user)
        return {data: {...user,id, password: ''}, message: 'User updated successfully.'};
    }
    
     async getUsers(filters) {
        console.log(filters);

         const userCollectionRef = collection(db, "users");
         const conditions = [];

         if (filters.firstName) {

             const startText = filters.firstName;
             const endText = filters.firstName + '\uf8ff';
             conditions.push(where("firstName", ">=", startText));
             conditions.push(where("firstName", "<=", endText));
         }
         if (filters.role && filters.role.code) {
             conditions.push(where("role", "==", filters.role.code));
         }
         
         const setQuery = query(userCollectionRef, ...conditions);
         const resultQuery = await getDocs(setQuery);

         if (!resultQuery.empty) {
             const users = resultQuery.docs.map(doc => ({...doc.data(), id: doc.id, password: ''}));
             return {data: users, message: 'Users gets successfully.'};
         }
         return {data: [], message: 'No data'};
     }
}
