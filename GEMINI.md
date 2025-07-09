# Contexto del Proyecto para Gemini

Este archivo contiene información clave sobre el proyecto para ayudar a Gemini a entender el contexto rápidamente en futuras sesiones.

## Nombre del Proyecto
Aplicación de Gestión de Pruebas EDAH para Psicólogos

## Propósito General
Plataforma para que una psicóloga administre y recolecte resultados de la prueba EDAH, con funcionalidades de autenticación, generación de credenciales y persistencia de datos en archivos locales.

## Estado Actual del Desarrollo
**Fase 1: Reestructuración del Dashboard y Creación del Layout Principal** - **COMPLETADA**

*   Dashboard reestructurado para ser el layout principal.
*   Sidebar colapsable implementado con un botón de caret.
*   MainContent dinámico que muestra el CredentialGenerator o un placeholder.
*   Componente CredentialGenerator creado y funcional (genera credenciales con 7 días de validez).
*   `README.md` actualizado con documentación detallada.

## Próximos Pasos (Fase 2)
Implementación del panel de generación de credenciales y lógica de persistencia de datos en archivos JSON protegidos.

## Convenciones Clave
*   **Gestor de Paquetes:** pnpm
*   **Ramas de Git:** `main` (producción), `develop` (desarrollo).

## Notas Adicionales
*   La persistencia de datos se realizará en archivos JSON en un directorio protegido, ya que no se utiliza una base de datos.
*   Las credenciales generadas tienen una validez de 7 días.
