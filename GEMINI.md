# Contexto del Proyecto para Gemini

Este archivo contiene información clave sobre el proyecto para ayudar a Gemini a entender el contexto rápidamente en futuras sesiones.

## Nombre del Proyecto
Aplicación de Gestión de Pruebas EDAH para Psicólogos

## Propósito General
Plataforma para que una psicóloga administre y recolecte resultados de la prueba EDAH, con funcionalidades de autenticación, generación de credenciales y persistencia de datos en una base de datos PostgreSQL (Supabase).

## Estructura y Flujo de Credenciales

Para asegurar la coherencia entre la generación y el acceso a las pruebas, se establece la siguiente estructura y flujo para las credenciales:

1.  **Generación de Credenciales (`CredentialGenerator`):**
    *   Se generará un `testId` único para cada prueba.
    *   Se generarán **dos credenciales únicas**: `credential_tutor_a` y `credential_tutor_b`, asociadas a este `testId`.
    *   Estas credenciales serán alfanuméricas y de un solo uso por tutor.

2.  **Acceso a la Prueba (`CredentialsForm`):**
    *   El formulario de acceso requerirá **dos campos**:
        *   **`testId`**: El ID de la prueba generado.
        *   **`credential`**: Una de las dos credenciales (`credential_tutor_a` o `credential_tutor_b`) proporcionadas al tutor.
    *   El campo `EMAIL` actualmente presente en `CredentialsForm.jsx` es **redundante** para el flujo de acceso de tutores y debe ser **eliminado** o su propósito redefinido para un flujo de autenticación de psicólogos. El acceso de tutores se basará únicamente en el `testId` y la `credential`.

Esta aclaración es crucial para la implementación de `edahFormService.js` y `useEdahForm.js`, asegurando que la validación de credenciales en el backend (Supabase Edge Function) se base en el `testId` y la `credential` proporcionada.

## Estado Actual del Desarrollo
**Fase 1: Reestructuración del Dashboard y Creación del Layout Principal** - **COMPLETADA**

*   Dashboard reestructurado para ser el layout principal.
*   Sidebar colapsable implementado con un botón de caret.
*   MainContent dinámico que muestra el CredentialGenerator o un placeholder.
*   Componente CredentialGenerator creado y funcional (genera credenciales con 7 días de validez).
*   `README.md` actualizado con documentación detallada.

**Fase 2: Refactorización de Arquitectura Frontend (Base)** - **COMPLETADA**

*   Implementación de una arquitectura frontend limpia y desacoplada (Modelos, Servicios, Hooks, Componentes UI).
*   Definición de contratos de datos (JSDoc) para `User`, `TestSession`, `EdahFormResponse`.
*   Implementación del flujo de autenticación con `useAuth` y `AuthProvider`.
*   Refactorización de `AuthForm.jsx` para la nueva arquitectura.
*   Integración de `AuthProvider` y `react-router-dom` en `main.jsx`.
*   Limpieza de archivos de lógica obsoletos y corrección de errores de compilación.

## Próximos Pasos (Fase 2 - Continuación)
Implementación del panel de generación de credenciales y lógica de persistencia de datos en archivos JSON protegidos.

**Roadmap Detallado:**
1.  **Refactorización de `CredentialsForm.jsx`**: El formulario de acceso ahora solicita `testId` y `credential` para el flujo de tutores. - **COMPLETADA**
2.  **Centralización del cliente de Supabase**: Se ha creado `src/utils/supabase.js` para inicializar y exportar el cliente de Supabase. - **COMPLETADA**
3.  **Implementar `testSessionService.js`**: Conexión del frontend a Supabase para la gestión de sesiones de prueba (crear, obtener todas, obtener por ID). - **COMPLETADA**
4.  **Refactorización de `authService.js`**: Ahora utiliza el cliente de Supabase centralizado. - **COMPLETADA**
5.  **Implementar `useTestSessions.js`**: Crear un hook de React para interactuar con los datos y acciones de las sesiones de prueba. - **COMPLETADA**
6.  **Integrar `useTestSessions` con la UI**: Refactorizar `CredentialGenerator.jsx` y `Dashboard.jsx` para utilizar el nuevo hook. - **COMPLETADA**
7.  **Implementar `edahFormService.js`**: Conectar el frontend a Supabase para la validación de credenciales y el envío de formularios EDAH.
8.  **Implementar `useEdahForm.js`**: Crear un hook de React para manejar la validación y envío de formularios EDAH.
9.  **Integrar `useEdahForm` con la UI**: Refactorizar `CredentialsAccess.jsx` y `EdahForm.jsx`.
10. **Refactorizar `FormEdah/EdahForm.jsx` (arreglo temporal)**: Aplicar un arreglo temporal para eliminar dependencias de archivos `.logic.js` eliminados. - **COMPLETADA**

## Tareas en la rama `feat/test-session-service`
Las siguientes tareas son el enfoque principal de esta rama:
1.  **Implementar `useTestSessions.js`**: Crear un hook de React para interactuar con los datos y acciones de las sesiones de prueba. - **COMPLETADA**
2.  **Integrar `useTestSessions` con la UI**: Refactorizar `CredentialGenerator.jsx` y `Dashboard.jsx` para utilizar el nuevo hook. - **COMPLETADA**
3.  **Recuperar `EdahForm.logic.js`**: Se ha recuperado el archivo `src/components/forms/FormEdah/EdahForm.logic.js` para el correcto funcionamiento de `EdahForm.jsx`. - **COMPLETADA**

## Próximas Tareas (Próxima Sesión)
**Prioridad: Adecuación y Refactorización de `EdahForm.jsx`**
1.  **Modificar `EdahForm.logic.js` (el hook `useEdahForm`):**
    *   Añadir `testId` al estado `studentInfo`.
    *   Asegurar `testId` en el objeto retornado por `generateReport`.
2.  **Modificar `EdahForm.jsx` (UI y Lógica de Carga):**
    *   Cambiar título: "Información del Estudiante" a "Información del Paciente".
    *   Cambiar etiqueta: "Evaluador" a "Tutor Evaluado".
    *   Añadir campo `testId` en la UI: Incluir un nuevo campo de entrada para `testId` en la sección de información del paciente. Este campo debería ser de solo lectura si se recibe un `testId` por URL.
    *   Leer `testId` de la URL: Implementar la lógica para leer el `testId` de los parámetros de la URL (por ejemplo, `/edah-form?testId=XYZ`) y usarlo para inicializar el campo `testId` en el estado `studentInfo`.
3.  **Refactorizar `EdahForm.jsx` en componentes por etapas:**
    *   `EdahInfoForm.jsx`: Componente para la información del paciente/tutor.
    *   `EdahQuestionsForm.jsx`: Componente para las 20 preguntas con escalas.
    *   `EdahResultsSummary.jsx`: Componente para la visualización de resultados simplificada para el tutor (lo que queda de la etapa 3 para el tutor).
4.  **Crear `EdahAnalyticsView.jsx`**: Componente para la visualización de resultados detallada para el psicólogo.
5.  **Adaptar `EdahAnalyticsView.jsx`**:
    *   Eliminar análisis descriptivo y puntaje total de la prueba.
    *   Añadir sección para que el superusuario haga sus propios análisis personalizados.
    *   Vincular con la lógica de lectura de datos de la base de datos de los formularios ya llenos, asociados al paciente.
6.  **Integrar `EdahAnalyticsView.jsx`**: Añadir un nuevo ítem en el Sidebar para "Analytics" que dirija a esta vista.

## Convenciones Clave
*   **Gestor de Paquetes:** pnpm
*   **Ramas de Git:** `main` (producción), `develop` (desarrollo).

## Notas Adicionales
*   La persistencia de datos se realizará en archivos JSON en un directorio protegido, ya que no se utiliza una base de datos.
*   Las credenciales generadas tienen una validez de 7 días.