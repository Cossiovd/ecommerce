import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { veterinaryProducts } from './src/mockdata/pruducts.js';

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    
    // Opcional: Borrar productos anteriores para evitar duplicados
    console.log("Limpiando productos anteriores...");
    const snapshot = await getDocs(productsRef);
    for (const document of snapshot.docs) {
      await deleteDoc(doc(db, "products", document.id));
    }
    console.log("¡Colección limpia!");

    console.log("Iniciando la importación de productos a Firebase con IDs personalizados...");
    let count = 0;
    
    for (let i = 0; i < veterinaryProducts.length; i++) {
      const product = veterinaryProducts[i];
      // Crear un ID personalizado, ej: prod_1, prod_2...
      const customId = `prod_${i + 1}`;
      
      // Usamos setDoc con el ID personalizado en lugar de addDoc
      await setDoc(doc(db, "products", customId), product);
      count++;
    }
    
    console.log(`¡Éxito! Se han importado ${count} productos a Firebase.`);
    process.exit(0);
  } catch (error) {
    console.error("Error al subir productos a Firebase: ", error);
    process.exit(1);
  }
};

uploadProducts();
