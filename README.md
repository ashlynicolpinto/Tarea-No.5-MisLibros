# Mis Libros - Proyecto POO y Separación de Responsabilidades

## Respuestas a la Reflexión

### 1. ¿Por qué es conveniente separar la lógica de los libros de App.tsx?
Separar la lógica permite aplicar el principio de responsabilidad única (SRP). Mantener App.tsx enfocado únicamente en la representación visual y el manejo de eventos de usuario previene el código complejo, facilita el mantenimiento, simplifica la depuración y permite reutilizar o cambiar la interfaz gráfica sin alterar la regla de negocio.

### 2. ¿Qué responsabilidad tiene LibroService?
LibroService actúa como el gestor de datos de la aplicación (capa de servicio). Su responsabilidad es administrar la colección de libros: crear nuevas instancias, almacenar la lista, consultar los libros guardados y ejecutar la lógica de eliminación. Desacopla el almacenamiento de la vista.

### 3. ¿Qué responsabilidad tiene la clase Libro?
La clase Libro representa el modelo del dominio (entidad). Su responsabilidad es definir la estructura interna de un libro (propiedades como id, titulo, autor, anio), garantizar el encapsulamiento de sus atributos mediante modificadores de acceso y exponer métodos propios relativos al comportamiento de un libro individual (como formatear su propia descripción).

# Mis Libros - Actualización Tarea 6

## Cambios Realizados
- **Patrón Singleton**: Implementación del patrón Singleton en `LibroRepository` para garantizar una única instancia del repositorio en toda la aplicación.
- **Patrón Repository**: Separación de la lógica de acceso a datos (`LibroRepository`) de la capa de servicios (`LibroService`).
- **Prueba de Instancia**: Validación por consola demostrando que ambas instancias son idénticas (`true`).

## Evidencias
- Captura del funcionamiento de la aplicación.
- Captura de la prueba del Singleton en consola (`¿Son ambas instancias idénticas?: true`).