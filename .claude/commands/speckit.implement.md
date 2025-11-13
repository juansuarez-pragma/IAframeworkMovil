---
description: Ejecutar el plan de implementación procesando y ejecutando todas las tareas definidas en tasks.md
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBES** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

1. Ejecutar `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` desde la raíz del repo y analizar FEATURE_DIR y lista AVAILABLE_DOCS. Todas las rutas deben ser absolutas. Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

2. **Verificar estado de checklists** (si FEATURE_DIR/checklists/ existe):
   - Escanear todos los archivos de checklist en el directorio checklists/
   - Para cada checklist, contar:
     - Total de items: Todas las líneas que coincidan con `- [ ]` o `- [X]` o `- [x]`
     - Items completados: Líneas que coincidan con `- [X]` o `- [x]`
     - Items incompletos: Líneas que coincidan con `- [ ]`
   - Crear una tabla de estado:

     ```text
     | Checklist   | Total | Completado | Incompleto | Estado  |
     |-------------|-------|------------|------------|---------|
     | ux.md       | 12    | 12         | 0          | ✓ PASS  |
     | test.md     | 8     | 5          | 3          | ✗ FAIL  |
     | security.md | 6     | 6          | 0          | ✓ PASS  |
     ```

   - Calcular estado general:
     - **PASS**: Todos los checklists tienen 0 items incompletos
     - **FAIL**: Uno o más checklists tienen items incompletos

   - **Si algún checklist está incompleto**:
     - Mostrar la tabla con conteo de items incompletos
     - **DETENER** y preguntar: "Algunos checklists están incompletos. ¿Deseas proceder con la implementación de todos modos? (sí/no)"
     - Esperar respuesta del usuario antes de continuar
     - Si el usuario dice "no" o "espera" o "detener", detener ejecución
     - Si el usuario dice "sí" o "proceder" o "continuar", proceder al paso 3

   - **Si todos los checklists están completos**:
     - Mostrar la tabla mostrando que todos los checklists pasaron
     - Proceder automáticamente al paso 3

3. Cargar y analizar el contexto de implementación:
   - **REQUERIDO**: Leer tasks.md para la lista completa de tareas y plan de ejecución
   - **REQUERIDO**: Leer plan.md para tech stack, arquitectura, y estructura de archivos
   - **SI EXISTE**: Leer data-model.md para entidades y relaciones
   - **SI EXISTE**: Leer contracts/ para especificaciones API y requisitos de prueba
   - **SI EXISTE**: Leer research.md para decisiones técnicas y restricciones
   - **SI EXISTE**: Leer quickstart.md para escenarios de integración

4. **Verificación de Setup del Proyecto**:
   - **REQUERIDO**: Crear/verificar archivos ignore basados en setup real del proyecto:

   **Lógica de Detección y Creación**:
   - Verificar si el siguiente comando tiene éxito para determinar si el repositorio es un repo git (crear/verificar .gitignore si lo es):

     ```sh
     git rev-parse --git-dir 2>/dev/null
     ```

   - Verificar si Dockerfile* existe o Docker en plan.md → crear/verificar .dockerignore
   - Verificar si .eslintrc* o eslint.config.* existe → crear/verificar .eslintignore
   - Verificar si .prettierrc* existe → crear/verificar .prettierignore
   - Verificar si .npmrc o package.json existe → crear/verificar .npmignore (si se publica)
   - Verificar si archivos terraform (*.tf) existen → crear/verificar .terraformignore
   - Verificar si .helmignore es necesario (charts helm presentes) → crear/verificar .helmignore

   **Si archivo ignore ya existe**: Verificar que contenga patrones esenciales, agregar solo patrones críticos faltantes
   **Si archivo ignore falta**: Crear con conjunto completo de patrones para tecnología detectada

   **Patrones Comunes por Tecnología** (desde tech stack de plan.md):
   - **Node.js/JavaScript/TypeScript**: `node_modules/`, `dist/`, `build/`, `*.log`, `.env*`
   - **Python**: `__pycache__/`, `*.pyc`, `.venv/`, `venv/`, `dist/`, `*.egg-info/`
   - **Java**: `target/`, `*.class`, `*.jar`, `.gradle/`, `build/`
   - **C#/.NET**: `bin/`, `obj/`, `*.user`, `*.suo`, `packages/`
   - **Go**: `*.exe`, `*.test`, `vendor/`, `*.out`
   - **Ruby**: `.bundle/`, `log/`, `tmp/`, `*.gem`, `vendor/bundle/`
   - **PHP**: `vendor/`, `*.log`, `*.cache`, `*.env`
   - **Rust**: `target/`, `debug/`, `release/`, `*.rs.bk`, `*.rlib`, `*.prof*`, `.idea/`, `*.log`, `.env*`
   - **Kotlin**: `build/`, `out/`, `.gradle/`, `.idea/`, `*.class`, `*.jar`, `*.iml`, `*.log`, `.env*`
   - **C++**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.so`, `*.a`, `*.exe`, `*.dll`, `.idea/`, `*.log`, `.env*`
   - **C**: `build/`, `bin/`, `obj/`, `out/`, `*.o`, `*.a`, `*.so`, `*.exe`, `Makefile`, `config.log`, `.idea/`, `*.log`, `.env*`
   - **Swift**: `.build/`, `DerivedData/`, `*.swiftpm/`, `Packages/`
   - **R**: `.Rproj.user/`, `.Rhistory`, `.RData`, `.Ruserdata`, `*.Rproj`, `packrat/`, `renv/`
   - **Universal**: `.DS_Store`, `Thumbs.db`, `*.tmp`, `*.swp`, `.vscode/`, `.idea/`

   **Patrones Específicos de Herramientas**:
   - **Docker**: `node_modules/`, `.git/`, `Dockerfile*`, `.dockerignore`, `*.log*`, `.env*`, `coverage/`
   - **ESLint**: `node_modules/`, `dist/`, `build/`, `coverage/`, `*.min.js`
   - **Prettier**: `node_modules/`, `dist/`, `build/`, `coverage/`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
   - **Terraform**: `.terraform/`, `*.tfstate*`, `*.tfvars`, `.terraform.lock.hcl`
   - **Kubernetes/k8s**: `*.secret.yaml`, `secrets/`, `.kube/`, `kubeconfig*`, `*.key`, `*.crt`

5. Analizar estructura de tasks.md y extraer:
   - **Fases de tareas**: Setup, Tests, Core, Integration, Polish
   - **Dependencias de tareas**: Reglas de ejecución secuencial vs paralela
   - **Detalles de tareas**: ID, descripción, rutas de archivo, marcadores paralelos [P]
   - **Flujo de ejecución**: Orden y requisitos de dependencia

6. Ejecutar implementación siguiendo el plan de tareas:
   - **Ejecución fase por fase**: Completar cada fase antes de pasar a la siguiente
   - **Respetar dependencias**: Ejecutar tareas secuenciales en orden, tareas paralelas [P] pueden ejecutarse juntas
   - **Seguir enfoque TDD**: Ejecutar tareas de test antes de sus correspondientes tareas de implementación
   - **Coordinación basada en archivos**: Tareas que afectan los mismos archivos deben ejecutarse secuencialmente
   - **Puntos de validación**: Verificar completación de cada fase antes de proceder

7. Reglas de ejecución de implementación:
   - **Setup primero**: Inicializar estructura del proyecto, dependencias, configuración
   - **Tests antes de código**: Si necesitas escribir tests para contratos, entidades, y escenarios de integración
   - **Desarrollo core**: Implementar modelos, servicios, comandos CLI, endpoints
   - **Trabajo de integración**: Conexiones de base de datos, middleware, logging, servicios externos
   - **Pulido y validación**: Tests unitarios, optimización de rendimiento, documentación

8. Seguimiento de progreso y manejo de errores:
   - Reportar progreso después de cada tarea completada
   - Detener ejecución si cualquier tarea no paralela falla
   - Para tareas paralelas [P], continuar con tareas exitosas, reportar las que fallaron
   - Proporcionar mensajes de error claros con contexto para debugging
   - Sugerir próximos pasos si la implementación no puede proceder
   - **IMPORTANTE** Para tareas completadas, asegúrate de marcar la tarea como [X] en el archivo de tareas.

9. Validación de completación:
   - Verificar que todas las tareas requeridas están completadas
   - Verificar que las features implementadas coincidan con la especificación original
   - Validar que los tests pasen y la cobertura cumpla requisitos
   - Confirmar que la implementación sigue el plan técnico
   - Reportar estado final con resumen del trabajo completado

Nota: Este comando asume que existe un desglose completo de tareas en tasks.md. Si las tareas están incompletas o faltan, sugerir ejecutar `/speckit.tasks` primero para regenerar la lista de tareas.
