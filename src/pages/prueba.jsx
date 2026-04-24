import { useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../services/firebase"

const Prueba = () => {

    useEffect(() => {
        const testFirebase = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "users"))

                querySnapshot.forEach(doc => {
                    console.log("Usuario:", doc.data())
                })

                console.log("🔥 Firebase conectado correctamente")

            } catch (error) {
                console.error("❌ Error Firebase:", error)
            }
        }

        testFirebase()
    }, [])

    return <h1>Home</h1>
}

export default Prueba