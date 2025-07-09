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
1.  **Implementar `testSessionService.js`**: Conectar el frontend a Supabase para la gestión de sesiones de prueba (crear, obtener todas, obtener por ID).
2.  **Implementar `useTestSessions.js`**: Crear un hook de React para interactuar con los datos y acciones de las sesiones de prueba.
3.  **Integrar `useTestSessions` con la UI**: Refactorizar `CredentialGenerator.jsx` y `Dashboard.jsx`.
4.  **Implementar `edahFormService.js`**: Conectar el frontend a Supabase para la validación de credenciales y el envío de formularios EDAH.
5.  **Implementar `useEdahForm.js`**: Crear un hook de React para manejar la validación y envío de formularios EDAH.
6.  **Integrar `useEdahForm` con la UI**: Refactorizar `CredentialsAccess.jsx` y `EdahForm.jsx`.
7.  **Refactorizar `FormEdah/EdahForm.jsx` (arreglo temporal)**: Aplicar un arreglo temporal para eliminar dependencias de archivos `.logic.js` eliminados.

## Convenciones Clave
*   **Gestor de Paquetes:** pnpm
*   **Ramas de Git:** `main` (producción), `develop` (desarrollo).

## Notas Adicionales
*   La persistencia de datos se realizará en archivos JSON en un directorio protegido, ya que no se utiliza una base de datos.
*   Las credenciales generadas tienen una validez de 7 días.
