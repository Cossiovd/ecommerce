import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { veterinaryProducts } from "../mockdata/pruducts";

export const uploadProductsToFirebase = async () => {
  try {
    const productsRef = collection(db, "products");
    
    for (const product of veterinaryProducts) {
      // Opcionalmente podrías agregar una fecha de creación si la necesitas:
      // product.createdAt = new Date();
      await addDoc(productsRef, product);
    }
    
    console.log("¡Todos los productos subidos exitosamente a Firebase!");
    return { success: true };
  } catch (error) {
    console.error("Error al subir productos a Firebase: ", error);
    return { success: false, error };
  }
};
