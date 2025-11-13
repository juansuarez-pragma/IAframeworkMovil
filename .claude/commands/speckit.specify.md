---
description: Crear o actualizar la especificación de funcionalidad desde una descripción de funcionalidad en lenguaje natural.
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBE** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

El texto que el usuario escribió después de `/speckit.specify` en el mensaje activador **es** la descripción de la funcionalidad. Asumir que siempre está disponible en esta conversación incluso si `$ARGUMENTS` aparece literalmente abajo. No pedir al usuario que lo repita a menos que haya proporcionado un comando vacío.

Dada esa descripción de funcionalidad, hacer esto:

1. **Generar un nombre corto conciso** (2-4 palabras) para la rama:
   - Analizar la descripción de la funcionalidad y extraer las palabras clave más significativas
   - Crear un nombre corto de 2-4 palabras que capture la esencia de la funcionalidad
   - Usar formato acción-sustantivo cuando sea posible (ej., "add-user-auth", "fix-payment-bug")
   - Preservar términos técnicos y acrónimos (OAuth2, API, JWT, etc.)
   - Mantenerlo conciso pero lo suficientemente descriptivo para entender la funcionalidad de un vistazo
   - Ejemplos:
     - "I want to add user authentication" → "user-auth"
     - "Implement OAuth2 integration for the API" → "oauth2-api-integration"
     - "Create a dashboard for analytics" → "analytics-dashboard"
     - "Fix payment processing timeout bug" → "fix-payment-timeout"

2. **Verificar ramas existentes antes de crear una nueva**:

   a. Primero, obtener todas las ramas remotas para asegurar que tenemos la información más reciente:
      ```bash
      git fetch --all --prune
      ```

   b. Encontrar el número de funcionalidad más alto a través de todas las fuentes para el short-name:
      - Ramas remotas: `git ls-remote --heads origin | grep -E 'refs/heads/[0-9]+-<short-name>$'`
      - Ramas locales: `git branch | grep -E '^[* ]*[0-9]+-<short-name>$'`
      - Directorios specs: Verificar directorios que coincidan con `specs/[0-9]+-<short-name>`

   c. Determinar el siguiente número disponible:
      - Extraer todos los números de las tres fuentes
      - Encontrar el número más alto N
      - Usar N+1 para el nuevo número de rama

   d. Ejecutar el script `.specify/scripts/bash/create-new-feature.sh --json "$ARGUMENTS"` con el número calculado y short-name:
      - Pasar `--number N+1` y `--short-name "your-short-name"` junto con la descripción de la funcionalidad
      - Ejemplo Bash: `.specify/scripts/bash/create-new-feature.sh --json "$ARGUMENTS" --json --number 5 --short-name "user-auth" "Add user authentication"`
      - Ejemplo PowerShell: `.specify/scripts/bash/create-new-feature.sh --json "$ARGUMENTS" -Json -Number 5 -ShortName "user-auth" "Add user authentication"`

   **IMPORTANTE**:
   - Verificar las tres fuentes (ramas remotas, ramas locales, directorios specs) para encontrar el número más alto
   - Solo coincidir ramas/directorios con el patrón exacto de short-name
   - Si no se encuentran ramas/directorios existentes con este short-name, comenzar con el número 1
   - Solo debes ejecutar este script una vez por funcionalidad
   - El JSON se proporciona en la terminal como salida - siempre referirse a él para obtener el contenido real que estás buscando
   - La salida JSON contendrá las rutas BRANCH_NAME y SPEC_FILE
   - Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot")

3. Cargar `.specify/templates/spec-template.md` para entender las secciones requeridas.

4. Seguir este flujo de ejecución:

    1. Analizar descripción del usuario desde Input
       Si está vacía: ERROR "No se proporcionó descripción de funcionalidad"
    2. Extraer conceptos clave de la descripción
       Identificar: actores, acciones, datos, restricciones
    3. Para aspectos poco claros:
       - Hacer suposiciones informadas basadas en contexto y estándares de la industria
       - Solo marcar con [NEEDS CLARIFICATION: pregunta específica] si:
         - La elección impacta significativamente el alcance de la funcionalidad o experiencia del usuario
         - Existen múltiples interpretaciones razonables con diferentes implicaciones
         - No existe un valor predeterminado razonable
       - **LÍMITE: Máximo 3 marcadores [NEEDS CLARIFICATION] en total**
       - Priorizar aclaraciones por impacto: alcance > seguridad/privacidad > experiencia de usuario > detalles técnicos
    4. Llenar sección de Escenarios de Usuario y Pruebas
       Si no hay flujo de usuario claro: ERROR "No se pueden determinar escenarios de usuario"
    5. Generar Requisitos Funcionales
       Cada requisito debe ser testeable
       Usar valores predeterminados razonables para detalles no especificados (documentar suposiciones en sección de Suposiciones)
    6. Definir Criterios de Éxito
       Crear resultados medibles, agnósticos de tecnología
       Incluir tanto métricas cuantitativas (tiempo, rendimiento, volumen) como medidas cualitativas (satisfacción del usuario, completitud de tarea)
       Cada criterio debe ser verificable sin detalles de implementación
    7. Identificar Entidades Clave (si hay datos involucrados)
    8. Retornar: ÉXITO (especificación lista para planificación)

5. Escribir la especificación en SPEC_FILE usando la estructura de la plantilla, reemplazando placeholders con detalles concretos derivados de la descripción de la funcionalidad (argumentos) mientras se preserva el orden de secciones y encabezados.

6. **Validación de Calidad de Especificación**: Después de escribir la especificación inicial, validarla contra criterios de calidad:

   a. **Crear Lista de Verificación de Calidad de Especificación**: Generar un archivo de checklist en `FEATURE_DIR/checklists/requirements.md` usando la estructura de plantilla de checklist con estos elementos de validación:

      ```markdown
      # Specification Quality Checklist: [FEATURE NAME]

      **Purpose**: Validate specification completeness and quality before proceeding to planning
      **Created**: [DATE]
      **Feature**: [Link to spec.md]

      ## Content Quality

      - [ ] No implementation details (languages, frameworks, APIs)
      - [ ] Focused on user value and business needs
      - [ ] Written for non-technical stakeholders
      - [ ] All mandatory sections completed

      ## Requirement Completeness

      - [ ] No [NEEDS CLARIFICATION] markers remain
      - [ ] Requirements are testable and unambiguous
      - [ ] Success criteria are measurable
      - [ ] Success criteria are technology-agnostic (no implementation details)
      - [ ] All acceptance scenarios are defined
      - [ ] Edge cases are identified
      - [ ] Scope is clearly bounded
      - [ ] Dependencies and assumptions identified

      ## Feature Readiness

      - [ ] All functional requirements have clear acceptance criteria
      - [ ] User scenarios cover primary flows
      - [ ] Feature meets measurable outcomes defined in Success Criteria
      - [ ] No implementation details leak into specification

      ## Notes

      - Items marked incomplete require spec updates before `/speckit.clarify` or `/speckit.plan`
      ```

   b. **Ejecutar Verificación de Validación**: Revisar la especificación contra cada elemento del checklist:
      - Para cada elemento, determinar si pasa o falla
      - Documentar problemas específicos encontrados (citar secciones relevantes de la especificación)

   c. **Manejar Resultados de Validación**:

      - **Si todos los elementos pasan**: Marcar checklist completo y proceder al paso 6

      - **Si los elementos fallan (excluyendo [NEEDS CLARIFICATION])**:
        1. Listar los elementos fallidos y problemas específicos
        2. Actualizar la especificación para atender cada problema
        3. Volver a ejecutar validación hasta que todos los elementos pasen (máx 3 iteraciones)
        4. Si aún falla después de 3 iteraciones, documentar problemas restantes en notas del checklist y advertir al usuario

      - **Si permanecen marcadores [NEEDS CLARIFICATION]**:
        1. Extraer todos los marcadores [NEEDS CLARIFICATION: ...] de la especificación
        2. **VERIFICACIÓN DE LÍMITE**: Si existen más de 3 marcadores, mantener solo los 3 más críticos (por impacto de alcance/seguridad/UX) y hacer suposiciones informadas para el resto
        3. Para cada aclaración necesaria (máx 3), presentar opciones al usuario en este formato:

           ```markdown
           ## Question [N]: [Topic]

           **Context**: [Quote relevant spec section]

           **What we need to know**: [Specific question from NEEDS CLARIFICATION marker]

           **Suggested Answers**:

           | Option | Answer | Implications |
           |--------|--------|--------------|
           | A      | [First suggested answer] | [What this means for the feature] |
           | B      | [Second suggested answer] | [What this means for the feature] |
           | C      | [Third suggested answer] | [What this means for the feature] |
           | Custom | Provide your own answer | [Explain how to provide custom input] |

           **Your choice**: _[Wait for user response]_
           ```

        4. **CRÍTICO - Formato de Tablas**: Asegurar que las tablas markdown estén correctamente formateadas:
           - Usar espaciado consistente con pipes alineados
           - Cada celda debe tener espacios alrededor del contenido: `| Content |` no `|Content|`
           - El separador de encabezado debe tener al menos 3 guiones: `|--------|`
           - Probar que la tabla se renderice correctamente en vista previa de markdown
        5. Numerar preguntas secuencialmente (Q1, Q2, Q3 - máx 3 total)
        6. Presentar todas las preguntas juntas antes de esperar respuestas
        7. Esperar que el usuario responda con sus elecciones para todas las preguntas (ej., "Q1: A, Q2: Custom - [detalles], Q3: B")
        8. Actualizar la especificación reemplazando cada marcador [NEEDS CLARIFICATION] con la respuesta seleccionada o proporcionada por el usuario
        9. Volver a ejecutar validación después de que todas las aclaraciones estén resueltas

   d. **Actualizar Checklist**: Después de cada iteración de validación, actualizar el archivo de checklist con el estado actual de pasa/falla

7. Reportar completitud con nombre de rama, ruta del archivo de especificación, resultados del checklist, y preparación para la siguiente fase (`/speckit.clarify` o `/speckit.plan`).

**NOTA:** El script crea y hace checkout de la nueva rama e inicializa el archivo de especificación antes de escribir.

## Directrices Generales

## Directrices Rápidas

- Enfocarse en **QUÉ** necesitan los usuarios y **POR QUÉ**.
- Evitar CÓMO implementar (sin stack tecnológico, APIs, estructura de código).
- Escrito para stakeholders del negocio, no desarrolladores.
- NO crear ningún checklist que esté incrustado en la especificación. Eso será un comando separado.

### Requisitos de Sección

- **Secciones obligatorias**: Deben completarse para cada funcionalidad
- **Secciones opcionales**: Incluir solo cuando sean relevantes para la funcionalidad
- Cuando una sección no aplica, eliminarla completamente (no dejar como "N/A")

### Para Generación IA

Al crear esta especificación desde un prompt del usuario:

1. **Hacer suposiciones informadas**: Usar contexto, estándares de la industria y patrones comunes para llenar vacíos
2. **Documentar suposiciones**: Registrar valores predeterminados razonables en la sección de Suposiciones
3. **Limitar aclaraciones**: Máximo 3 marcadores [NEEDS CLARIFICATION] - usar solo para decisiones críticas que:
   - Impacten significativamente el alcance de la funcionalidad o experiencia del usuario
   - Tengan múltiples interpretaciones razonables con diferentes implicaciones
   - Carezcan de cualquier valor predeterminado razonable
4. **Priorizar aclaraciones**: alcance > seguridad/privacidad > experiencia de usuario > detalles técnicos
5. **Pensar como tester**: Cada requisito vago debería fallar el elemento de checklist "testeable y no ambiguo"
6. **Áreas comunes que necesitan aclaración** (solo si no existe un valor predeterminado razonable):
   - Alcance y límites de funcionalidad (incluir/excluir casos de uso específicos)
   - Tipos de usuario y permisos (si son posibles múltiples interpretaciones conflictivas)
   - Requisitos de seguridad/cumplimiento (cuando son legalmente/financieramente significativos)

**Ejemplos de valores predeterminados razonables** (no preguntar sobre estos):

- Retención de datos: Prácticas estándar de la industria para el dominio
- Objetivos de rendimiento: Expectativas estándar de aplicaciones web/móviles a menos que se especifique
- Manejo de errores: Mensajes amigables para el usuario con respaldos apropiados
- Método de autenticación: Basado en sesión estándar u OAuth2 para aplicaciones web
- Patrones de integración: APIs RESTful a menos que se especifique lo contrario

### Directrices de Criterios de Éxito

Los criterios de éxito deben ser:

1. **Medibles**: Incluir métricas específicas (tiempo, porcentaje, conteo, tasa)
2. **Agnósticos de tecnología**: Sin mención de frameworks, lenguajes, bases de datos o herramientas
3. **Enfocados en el usuario**: Describir resultados desde perspectiva de usuario/negocio, no internos del sistema
4. **Verificables**: Pueden ser probados/validados sin conocer detalles de implementación

**Buenos ejemplos**:

- "Los usuarios pueden completar el checkout en menos de 3 minutos"
- "El sistema soporta 10,000 usuarios concurrentes"
- "El 95% de las búsquedas retornan resultados en menos de 1 segundo"
- "La tasa de completitud de tareas mejora en un 40%"

**Malos ejemplos** (enfocados en implementación):

- "El tiempo de respuesta de API es menor a 200ms" (demasiado técnico, usar "Los usuarios ven resultados instantáneamente")
- "La base de datos puede manejar 1000 TPS" (detalle de implementación, usar métrica orientada al usuario)
- "Los componentes React renderizan eficientemente" (específico de framework)
- "Tasa de acierto de caché Redis superior al 80%" (específico de tecnología)
