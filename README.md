# Aplicación de gestión Empresas
Aplicación para la gestión de empresas y sus sucursales.

**Video Demo:**
https://www.youtube.com/watch?v=-2I8n7hwMvM

# Funcionalidades Principales
**Empresas:**

Crear, editar, eliminar empresas

Visualizar sucursales asociadas

**Sucursales:**

Crear, editar, eliminar sucursales

Acceso a categorías, productos y alérgenos

**Categorías:**

Crear y editar categorías

Gestión de subcategorías

**Productos:**

crear, editar y eliminar productos

Filtro por categoría

**Alérgenos:**

crear, editar y eliminar alérgenos

# Tecnologías utilizadas
**Frontend:**
- React + Typescript
- Vite
- Redux
- SweetAlert2
  
**Backend:**

 El proyecto consume una API externa para todas las operaciones de datos. Las llamadas se realizan mediante fetch y están encapsuladas en clases genéricas que permiten realizar operaciones CRUD sobre entidades como empresas, sucursales, productos, categorías y alérgenos.

- Las URLs de la API se configuran mediante variables de entorno.
- Las imágenes se gestionan a través de Cloudinary, incluyendo subida y eliminación.


