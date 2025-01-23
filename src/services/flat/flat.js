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
    
    async getFlats(filters) {

        const flatCollectionRef = collection(db, "flats");
        const conditions = [];
        
        
        if (filters.city) {
            
            const startText = filters.city;
            const endText = filters.city + '\uf8ff';
            conditions.push(where("city", ">=", startText));
            conditions.push(where("city", "<=", endText));
        }
        if (filters.minPrice !== null) {
            conditions.push(where("price", ">=", filters.minPrice));
        }
        if (filters.maxPrice !== null) {
            conditions.push(where("price", "<=", filters.maxPrice));
        }
        
        const setQuery = query(flatCollectionRef, ...conditions);
        const resultQuery = await getDocs(setQuery);
     
        if (!resultQuery.empty) {
            const flats = resultQuery.docs.map(doc => ({...doc.data(),id: doc.id}));
            return {data: flats, message: 'Flats gets successfully.'};
        }
        return {data: [], message: 'No data'};
        
    }
    
    
    
}
