# Contexto y Flujo de Trabajo: Arquitectura Escalable y Segura

Este documento describe el plan de acción estratégico para el desarrollo de la aplicación, priorizando una arquitectura segura, multi-inquilino y escalable. Este plan reemplaza guías anteriores y debe ser el punto de partida.

---

## Flujo de Trabajo por Prioridad

### **Fase 1: Implementar Autenticación y Autorización Segura (Prioridad: CRÍTICA)**

**Objetivo:** Establecer un sistema de autenticación robusto utilizando los servicios nativos de Supabase y configurar la autorización para que cada administrador solo pueda acceder a sus propios datos.

1.  **Revisión del Flujo de Autenticación (Conceptual):**
    *   **Tarea:** Confirmar la comprensión del flujo de Supabase Auth.
    *   **Detalles:**
        *   **Creación de Usuarios:** El administrador del sistema crea las credenciales (email/contraseña) para los usuarios de la aplicación a través de la interfaz de **Supabase Studio (Sección Authentication > Users > Add user)**. Esto garantiza que las contraseñas se encripten (hasheen y saleen) de forma segura usando `bcrypt` antes de guardarse en la tabla `auth.users`. **No se debe insertar en la tabla `auth.users` manualmente.**
        *   **Inicio de Sesión:** La aplicación utiliza `supabase.auth.signInWithPassword()` para verificar las credenciales. Supabase maneja la comparación segura de contraseñas encriptadas.
        *   **Gestión de Sesión:** Tras un login exitoso, Supabase emite un **JWT (JSON Web Token)** que se almacena de forma segura en el cliente y se envía automáticamente en cada petición subsecuente.
        *   **Cierre de Sesión:** La aplicación utiliza `supabase.auth.signOut()` para invalidar el JWT en el servidor y eliminarlo del cliente.
        *   **Seguridad Adicional:** Se utilizarán las funcionalidades nativas de Supabase para la protección contra ataques de fuerza bruta (Rate Limiting y Account Lockout), configurables en Supabase Studio.
    *   **Estado:** **Comprendido.**

2.  **Ajustar UI de Login:**
    *   **Tarea:** Modificar el componente `AuthForm.jsx` para eliminar el botón/enlace de "¿Olvidaste tu contraseña?", simplificando la interfaz según los requisitos.
    *   **Estado:** Pendiente.

3.  **Modificar Esquema de Base de Datos para RLS:**
    *   **Tarea:** Añadir una columna `user_id` (de tipo `UUID`, con clave foránea a `auth.users.id`) a las tablas `test_sessions` y `edah_forms`.
    *   **Estado:** Pendiente (Requiere acción manual en Supabase Studio).

4.  **Activar y Configurar Row Level Security (RLS):**
    *   **Tarea:** En Supabase Studio, activar RLS para las tablas `test_sessions` y `edah_forms`. Crear políticas de seguridad para las operaciones `SELECT`, `INSERT`, `UPDATE`, `DELETE` basadas en la regla `auth.uid() = user_id`.
    *   **Estado:** Pendiente (Requiere acción manual en Supabase Studio).

5.  **Actualizar Lógica de Creación de Datos:**
    *   **Tarea:** Modificar el código del frontend (`testSessionService.js`) y las Edge Functions (`add-test-session`, `submit-edah-form`) para que siempre incluyan el `user_id` del usuario autenticado al crear registros.
    *   **Estado:** Pendiente.

### **Fase 2: Finalizar el Flujo EDAH sobre la Base Segura (Prioridad: ALTA)**

**Objetivo:** Completar la funcionalidad de la prueba EDAH, asegurando que opera bajo el nuevo modelo de seguridad.

1.  **Pruebas End-to-End del Flujo EDAH con Seguridad:**
    *   **Tarea:** Realizar una prueba completa del flujo, incluyendo la verificación explícita del aislamiento de datos entre dos cuentas de administrador diferentes.
    *   **Estado:** Pendiente.

### **Fase 3 y 4: Escalabilidad y Mantenimiento (Prioridad: MEDIA/BAJA)**

**Objetivo:** Preparar la aplicación para crecer de forma ordenada.

*   Estas fases (construcción de un `core` genérico y migración de módulos) se mantienen como se definieron anteriormente, para ser abordadas una vez que se decida añadir una segunda prueba a la aplicación.