import {db} from "../firebase/firebase.js";
import {collection, addDoc, query, where, getDocs , getDoc, doc, updateDoc} from "firebase/firestore";

export class FlatService {
    
    constructor() {
        
    }
    
    async createFlat(flat) {
        const flatCollectionRef = collection(db, "flats");

        try {
            const result = await addDoc(flatCollectionRef, flat)

            return {data: {...flat, id: result.id}, message: 'Flat created successfully.'};
        } catch (error) {
            return {data: null, message: 'Error creating flat'};
        }
    }
    
    async getFlats() {
        const flatCollectionRef = collection(db, "flats");
        const setQuery = query(flatCollectionRef);
        const resultQuery = await getDocs(setQuery);
     
        if (!resultQuery.empty) {
            const flats = resultQuery.docs.map(doc => ({...doc.data(),id: doc.id}));
            return {data: flats, message: 'Flats gets successfully.'};
        }
        return {data: [], message: 'No data'};
        
    }
    
    
    
}
