import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";
export const partenairesService = {
    async addPartenaire(newPartenaire){
        
    try {
   
  
        const commandesCollection = collection(db, 'partners');
        const docRef = await addDoc(commandesCollection, { ...newPartenaire });
        console.log(`Partenaire created with ID: ${docRef.id}`);
        return docRef.id;
      } catch (error) {
        console.error('Error creating product:', error);
        throw error;
      }
    }
}