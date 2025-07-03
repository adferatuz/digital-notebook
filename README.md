# Aplicación de Gestión de Pruebas EDAH para Psicólogos

Esta aplicación web está diseñada para psicólogos, específicamente para la gestión y administración de la prueba EDAH (Evaluación del Trastorno por Déficit de Atención con Hiperactividad). Permite generar credenciales de acceso para tutores, recolectar los resultados de la prueba de forma segura y, en futuras fases, analizar los datos para facilitar el diagnóstico.

## Características

*   **Autenticación de Usuarios:** Acceso seguro para el rol de psicólogo (administrador).
*   **Panel de Administración (Dashboard):** Interfaz centralizada para gestionar las funcionalidades.
*   **Generación de Credenciales:** Creación de credenciales únicas y temporales (7 días) para que los tutores realicen la prueba EDAH.
*   **Persistencia de Datos Segura:** Almacenamiento de los resultados de las pruebas en archivos JSON protegidos localmente (sin base de datos).
*   **Gestión de Pruebas por Tutor:** Relaciona las respuestas de dos tutores para una misma prueba EDAH.
*   **Interfaz Intuitiva:** Diseño con un sidebar colapsable para una navegación eficiente.

## Tecnologías

*   **Frontend:** React.js
*   **Build Tool:** Vite
*   **Manejo de Rutas:** React Router DOM
*   **Estilos:** CSS Modules
*   **Iconos:** React Icons
*   **Gestor de Paquetes:** pnpm

## Primeros Pasos

Sigue estas instrucciones para obtener una copia del proyecto en tu máquina local para propósitos de desarrollo y pruebas.

### Prerrequisitos

Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/en/) (versión LTS recomendada)
*   [pnpm](https://pnpm.io/installation) (o npm/yarn si prefieres)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/digital-notebook.git
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd digital-notebook
    ```
3.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Ejecutar la Aplicación

Para iniciar el servidor de desarrollo:
```bash
pnpm dev
```
La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

## Uso

Una vez que la aplicación esté en funcionamiento:

1.  **Inicio de Sesión:** Accede al panel de administración utilizando tus credenciales de psicólogo.
2.  **Generar Credenciales:** Desde el sidebar, selecciona "Generar Credenciales". Haz clic en el botón para crear un nuevo par de credenciales (Tutor A y Tutor B) con una validez de 7 días.
3.  **Compartir Credenciales:** Proporciona estas credenciales a los tutores para que puedan acceder y completar la prueba EDAH.
4.  **Visualización de Resultados:** (Esta sección se expandirá en futuras fases a medida que se implemente la funcionalidad de análisis de resultados).

## Estructura del Proyecto

El proyecto sigue una estructura modular para facilitar la escalabilidad y el mantenimiento:

```
src/
├── auth/             # Lógica y componentes de autenticación (Login, Register, etc.)
├── components/       # Componentes UI reutilizables (Botones, Layouts, etc.)
├── forms/            # Formularios específicos (CredentialGenerator, FormEdah, etc.)
├── pages/            # Componentes que representan vistas o páginas completas
├── styles/           # Estilos globales y variables CSS
├── utils/            # Funciones de utilidad y helpers
├── App.jsx           # Componente principal que define las rutas
└── main.jsx          # Punto de entrada de la aplicación
```

## Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:
1.  Haz un fork del repositorio.
2.  Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3.  Realiza tus cambios y asegúrate de que las pruebas pasen.
4.  Haz commit de tus cambios (`git commit -m 'feat: Añadir nueva funcionalidad X'`).
5.  Sube tu rama (`git push origin feature/nueva-funcionalidad`).
6.  Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Contacto

Para preguntas o soporte, por favor contacta a [Tu Nombre/Email/GitHub].