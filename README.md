# 🐾 VetCare eCommerce

VetCare es una plataforma de comercio electrónico moderna, rápida y completamente funcional, diseñada para clínicas veterinarias y tiendas de mascotas. Permite a los usuarios explorar productos, gestionar su carrito de compras y realizar transacciones de forma segura.

**🔗 Demo en vivo:** [https://cossiovd.github.io/ecommerce/](https://cossiovd.github.io/ecommerce/)

## 🚀 Características Principales

- **Catálogo de Productos:** Búsqueda en tiempo real
- **Carrito de Compras y Checkout:** Gestión de carrito y una pasarela simulada de pago con cálculo automático de envíos (con soporte para COP) e impuestos.
- **Autenticación (Firebase):** Registro, inicio de sesión seguro y gestión de perfiles de usuario.
- **Diseño Responsivo:** Interfaz moderna y adaptada a dispositivos móviles, tablets y escritorio.
- **Internacionalización de Precios:** Funciones utilitarias para formatear y mostrar precios consistentes en toda la aplicación.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Enrutamiento:** [React Router](https://reactrouter.com/)
- **Gestión de Estado:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Backend & Base de Datos:** [Firebase](https://firebase.google.com/) (Authentication & Firestore)

## 📦 Instalación y Configuración Local

Sigue estos pasos para clonar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Cossiovd/ecommerce.git
   cd ecommerce
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de configuración de Firebase:
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```

4. **Importar datos iniciales:**
   Si tienes configurado tu archivo `.env`, puedes popular o sincronizar la base de datos de Firestore ejecutando el script de importación de productos base:
   ```bash
   node --env-file=.env import-script.js
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## 📜 Scripts Disponibles

- `npm run dev`: Inicia el entorno de desarrollo en `http://localhost:5173/`.
- `npm run build`: Construye la aplicación optimizada para producción en la carpeta `dist`.
- `npm run preview`: Previsualiza la *build* de producción localmente.
- `npm run deploy`: Ejecuta el script que sube la aplicación lista a GitHub Pages.

## ✍️ Autora

**Dayana Cossio**
