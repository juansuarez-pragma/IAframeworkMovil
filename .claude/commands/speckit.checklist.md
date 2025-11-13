---
description: Generar un checklist personalizado para la funcionalidad actual basado en requisitos del usuario.
---

## Propósito del Checklist: "Pruebas Unitarias para Inglés"

**CONCEPTO CRÍTICO**: Los checklists son **PRUEBAS UNITARIAS PARA ESCRITURA DE REQUISITOS** - validan la calidad, claridad y completitud de los requisitos en un dominio dado.

**NO para verificación/pruebas**:

- ❌ NO "Verificar que el botón se hace clic correctamente"
- ❌ NO "Probar que el manejo de errores funciona"
- ❌ NO "Confirmar que la API retorna 200"
- ❌ NO verificar si el código/implementación coincide con la especificación

**PARA validación de calidad de requisitos**:

- ✅ "¿Están definidos los requisitos de jerarquía visual para todos los tipos de tarjeta?" (completitud)
- ✅ "¿Está 'visualización prominente' cuantificada con dimensionamiento/posicionamiento específico?" (claridad)
- ✅ "¿Son consistentes los requisitos de estado hover a través de todos los elementos interactivos?" (consistencia)
- ✅ "¿Están definidos los requisitos de accesibilidad para navegación con teclado?" (cobertura)
- ✅ "¿Define la especificación qué sucede cuando la imagen del logo falla al cargar?" (casos límite)

**Metáfora**: Si tu especificación es código escrito en inglés, el checklist es su suite de pruebas unitarias. Estás probando si los requisitos están bien escritos, completos, no ambiguos y listos para implementación - NO si la implementación funciona.

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBE** considerar la entrada del usuario antes de proceder (si no está vacía).

## Pasos de Ejecución

1. **Configuración**: Ejecutar `.specify/scripts/bash/check-prerequisites.sh --json` desde la raíz del repositorio y analizar JSON para FEATURE_DIR y lista AVAILABLE_DOCS.
   - Todas las rutas de archivo deben ser absolutas.
   - Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

2. **Aclarar intención (dinámico)**: Derivar hasta TRES preguntas de aclaración contextual iniciales (sin catálogo pre-elaborado). DEBEN:
   - Ser generadas desde el fraseo del usuario + señales extraídas de spec/plan/tasks
   - Solo preguntar sobre información que cambie materialmente el contenido del checklist
   - Ser omitidas individualmente si ya no son ambiguas en `$ARGUMENTS`
   - Preferir precisión sobre amplitud

   Algoritmo de generación:
   1. Extraer señales: palabras clave del dominio de funcionalidad (ej., auth, latencia, UX, API), indicadores de riesgo ("crítico", "debe", "cumplimiento"), pistas de stakeholder ("QA", "revisión", "equipo de seguridad"), y entregables explícitos ("a11y", "rollback", "contratos").
   2. Agrupar señales en áreas de enfoque candidatas (máx 4) clasificadas por relevancia.
   3. Identificar audiencia y temporización probable (autor, revisor, QA, release) si no es explícito.
   4. Detectar dimensiones faltantes: amplitud de alcance, profundidad/rigor, énfasis de riesgo, límites de exclusión, criterios de aceptación medibles.
   5. Formular preguntas elegidas de estos arquetipos:
      - Refinamiento de alcance (ej., "¿Debería incluir puntos de contacto de integración con X e Y o permanecer limitado a corrección de módulo local?")
      - Priorización de riesgo (ej., "¿Cuáles de estas áreas de riesgo potenciales deberían recibir verificaciones de compuerta obligatorias?")
      - Calibración de profundidad (ej., "¿Es esta una lista de cordura ligera pre-commit o una compuerta de release formal?")
      - Encuadre de audiencia (ej., "¿Será usado solo por el autor o por pares durante revisión de PR?")
      - Exclusión de límites (ej., "¿Deberíamos excluir explícitamente elementos de ajuste de rendimiento esta ronda?")
      - Brecha de clase de escenario (ej., "No se detectaron flujos de recuperación—¿están en alcance las rutas de rollback / fallo parcial?")

   Reglas de formato de preguntas:
   - Si se presentan opciones, generar una tabla compacta con columnas: Option | Candidate | Why It Matters
   - Limitar a opciones A–E máximo; omitir tabla si una respuesta de forma libre es más clara
   - Nunca pedir al usuario que repita lo que ya dijo
   - Evitar categorías especulativas (sin alucinaciones). Si es incierto, preguntar explícitamente: "Confirmar si X pertenece al alcance."

   Valores predeterminados cuando la interacción es imposible:
   - Profundidad: Estándar
   - Audiencia: Revisor (PR) si está relacionado con código; Autor de lo contrario
   - Enfoque: Top 2 clusters de relevancia

   Generar las preguntas (etiquetar Q1/Q2/Q3). Después de las respuestas: si ≥2 clases de escenario (Alternativo / Excepción / Recuperación / dominio No Funcional) permanecen poco claras, PUEDE hacer hasta DOS seguimientos enfocados adicionales (Q4/Q5) con una justificación de una línea cada uno (ej., "Riesgo de ruta de recuperación no resuelto"). No exceder cinco preguntas totales. Omitir escalación si el usuario declina explícitamente más.

3. **Entender solicitud del usuario**: Combinar `$ARGUMENTS` + respuestas de aclaración:
   - Derivar tema del checklist (ej., seguridad, revisión, despliegue, ux)
   - Consolidar elementos imprescindibles explícitos mencionados por el usuario
   - Mapear selecciones de enfoque a andamiaje de categorías
   - Inferir cualquier contexto faltante de spec/plan/tasks (NO alucinar)

4. **Cargar contexto de funcionalidad**: Leer desde FEATURE_DIR:
   - spec.md: Requisitos de funcionalidad y alcance
   - plan.md (si existe): Detalles técnicos, dependencias
   - tasks.md (si existe): Tareas de implementación

   **Estrategia de Carga de Contexto**:
   - Cargar solo las porciones necesarias relevantes a áreas de enfoque activas (evitar volcado de archivo completo)
   - Preferir resumir secciones largas en viñetas de escenario/requisito concisas
   - Usar divulgación progresiva: agregar recuperación de seguimiento solo si se detectan brechas
   - Si los documentos fuente son grandes, generar elementos resumen intermedios en lugar de incrustar texto crudo

5. **Generar checklist** - Crear "Pruebas Unitarias para Requisitos":
   - Crear directorio `FEATURE_DIR/checklists/` si no existe
   - Generar nombre de archivo de checklist único:
     - Usar nombre corto y descriptivo basado en dominio (ej., `ux.md`, `api.md`, `security.md`)
     - Formato: `[domain].md`
     - Si el archivo existe, agregar al archivo existente
   - Numerar elementos secuencialmente comenzando desde CHK001
   - Cada ejecución de `/speckit.checklist` crea un archivo NUEVO (nunca sobrescribe checklists existentes)

   **PRINCIPIO CENTRAL - Probar los Requisitos, No la Implementación**:
   Cada elemento del checklist DEBE evaluar los REQUISITOS MISMOS para:
   - **Completitud**: ¿Están presentes todos los requisitos necesarios?
   - **Claridad**: ¿Son los requisitos no ambiguos y específicos?
   - **Consistencia**: ¿Se alinean los requisitos entre sí?
   - **Medibilidad**: ¿Pueden los requisitos ser verificados objetivamente?
   - **Cobertura**: ¿Están atendidos todos los escenarios/casos límite?

   **Estructura de Categorías** - Agrupar elementos por dimensiones de calidad de requisitos:
   - **Completitud de Requisitos** (¿Están documentados todos los requisitos necesarios?)
   - **Claridad de Requisitos** (¿Son específicos y no ambiguos los requisitos?)
   - **Consistencia de Requisitos** (¿Se alinean los requisitos sin conflictos?)
   - **Calidad de Criterios de Aceptación** (¿Son medibles los criterios de éxito?)
   - **Cobertura de Escenarios** (¿Están atendidos todos los flujos/casos?)
   - **Cobertura de Casos Límite** (¿Están definidas las condiciones límite?)
   - **Requisitos No Funcionales** (Rendimiento, Seguridad, Accesibilidad, etc. - ¿están especificados?)
   - **Dependencias y Suposiciones** (¿Están documentadas y validadas?)
   - **Ambigüedades y Conflictos** (¿Qué necesita aclaración?)

   **CÓMO ESCRIBIR ELEMENTOS DEL CHECKLIST - "Pruebas Unitarias para Inglés"**:

   ❌ **INCORRECTO** (Probando implementación):
   - "Verificar que la página de inicio muestre 3 tarjetas de episodios"
   - "Probar que los estados hover funcionen en escritorio"
   - "Confirmar que el clic en el logo navegue a inicio"

   ✅ **CORRECTO** (Probando calidad de requisitos):
   - "¿Están especificados el número exacto y diseño de episodios destacados?" [Completitud]
   - "¿Está 'visualización prominente' cuantificada con dimensionamiento/posicionamiento específico?" [Claridad]
   - "¿Son consistentes los requisitos de estado hover a través de todos los elementos interactivos?" [Consistencia]
   - "¿Están definidos los requisitos de navegación con teclado para toda la UI interactiva?" [Cobertura]
   - "¿Está especificado el comportamiento de respaldo cuando la imagen del logo falla al cargar?" [Casos Límite]
   - "¿Están definidos los estados de carga para datos de episodios asíncronos?" [Completitud]
   - "¿Define la especificación la jerarquía visual para elementos de UI competidores?" [Claridad]

   **ESTRUCTURA DE ELEMENTO**:
   Cada elemento debe seguir este patrón:
   - Formato de pregunta preguntando sobre calidad de requisito
   - Enfocarse en lo que ESTÁ ESCRITO (o no escrito) en la spec/plan
   - Incluir dimensión de calidad entre corchetes [Completitud/Claridad/Consistencia/etc.]
   - Referenciar sección de spec `[Spec §X.Y]` al verificar requisitos existentes
   - Usar marcador `[Gap]` al verificar requisitos faltantes

   **EJEMPLOS POR DIMENSIÓN DE CALIDAD**:

   Completitud:
   - "¿Están definidos los requisitos de manejo de errores para todos los modos de fallo de API? [Gap]"
   - "¿Están especificados los requisitos de accesibilidad para todos los elementos interactivos? [Completitud]"
   - "¿Están definidos los requisitos de breakpoint móvil para diseños responsivos? [Gap]"

   Claridad:
   - "¿Está 'carga rápida' cuantificada con umbrales de tiempo específicos? [Claridad, Spec §NFR-2]"
   - "¿Están los criterios de selección de 'episodios relacionados' explícitamente definidos? [Claridad, Spec §FR-5]"
   - "¿Está 'prominente' definido con propiedades visuales medibles? [Ambigüedad, Spec §FR-4]"

   Consistencia:
   - "¿Se alinean los requisitos de navegación a través de todas las páginas? [Consistencia, Spec §FR-10]"
   - "¿Son consistentes los requisitos de componente de tarjeta entre páginas de inicio y detalle? [Consistencia]"

   Cobertura:
   - "¿Están definidos los requisitos para escenarios de estado cero (sin episodios)? [Cobertura, Caso Límite]"
   - "¿Están atendidos los escenarios de interacción de usuario concurrente? [Cobertura, Gap]"
   - "¿Están especificados los requisitos para fallos de carga de datos parcial? [Cobertura, Flujo de Excepción]"

   Medibilidad:
   - "¿Son medibles/testeables los requisitos de jerarquía visual? [Criterios de Aceptación, Spec §FR-1]"
   - "¿Puede 'peso visual balanceado' ser verificado objetivamente? [Medibilidad, Spec §FR-2]"

   **Clasificación y Cobertura de Escenarios** (Enfoque de Calidad de Requisitos):
   - Verificar si existen requisitos para: escenarios Primarios, Alternos, Excepción/Error, Recuperación, No Funcionales
   - Para cada clase de escenario, preguntar: "¿Son los requisitos de [tipo de escenario] completos, claros y consistentes?"
   - Si falta clase de escenario: "¿Están los requisitos de [tipo de escenario] intencionalmente excluidos o faltantes? [Gap]"
   - Incluir resiliencia/rollback cuando ocurre mutación de estado: "¿Están definidos los requisitos de rollback para fallos de migración? [Gap]"

   **Requisitos de Trazabilidad**:
   - MÍNIMO: ≥80% de los elementos DEBEN incluir al menos una referencia de trazabilidad
   - Cada elemento debe referenciar: sección de spec `[Spec §X.Y]`, o usar marcadores: `[Gap]`, `[Ambiguity]`, `[Conflict]`, `[Assumption]`
   - Si no existe sistema de ID: "¿Está establecido un esquema de ID de requisito y criterios de aceptación? [Trazabilidad]"

   **Evidenciar y Resolver Problemas** (Problemas de Calidad de Requisitos):
   Hacer preguntas sobre los requisitos mismos:
   - Ambigüedades: "¿Está el término 'rápido' cuantificado con métricas específicas? [Ambigüedad, Spec §NFR-1]"
   - Conflictos: "¿Entran en conflicto los requisitos de navegación entre §FR-10 y §FR-10a? [Conflicto]"
   - Suposiciones: "¿Está validada la suposición de 'podcast API siempre disponible'? [Suposición]"
   - Dependencias: "¿Están documentados los requisitos de API de podcast externa? [Dependencia, Gap]"
   - Definiciones faltantes: "¿Está 'jerarquía visual' definida con criterios medibles? [Gap]"

   **Consolidación de Contenido**:
   - Límite suave: Si los elementos candidatos crudos > 40, priorizar por riesgo/impacto
   - Fusionar casi duplicados verificando el mismo aspecto de requisito
   - Si >5 casos límite de bajo impacto, crear un elemento: "¿Están los casos límite X, Y, Z atendidos en requisitos? [Cobertura]"

   **🚫 ABSOLUTAMENTE PROHIBIDO** - Estos lo convierten en una prueba de implementación, no de requisitos:
   - ❌ Cualquier elemento que comience con "Verificar", "Probar", "Confirmar", "Chequear" + comportamiento de implementación
   - ❌ Referencias a ejecución de código, acciones de usuario, comportamiento del sistema
   - ❌ "Se muestra correctamente", "funciona apropiadamente", "funciona como se espera"
   - ❌ "Hacer clic", "navegar", "renderizar", "cargar", "ejecutar"
   - ❌ Casos de prueba, planes de prueba, procedimientos de QA
   - ❌ Detalles de implementación (frameworks, APIs, algoritmos)

   **✅ PATRONES REQUERIDOS** - Estos prueban calidad de requisitos:
   - ✅ "¿Están [tipo de requisito] definidos/especificados/documentados para [escenario]?"
   - ✅ "¿Está [término vago] cuantificado/aclarado con criterios específicos?"
   - ✅ "¿Son consistentes los requisitos entre [sección A] y [sección B]?"
   - ✅ "¿Puede [requisito] ser medido/verificado objetivamente?"
   - ✅ "¿Están [casos límite/escenarios] atendidos en requisitos?"
   - ✅ "¿Define la especificación [aspecto faltante]?"

6. **Referencia de Estructura**: Generar el checklist siguiendo la plantilla canónica en `.specify/templates/checklist-template.md` para título, sección meta, encabezados de categoría y formato de ID. Si la plantilla no está disponible, usar: título H1, líneas meta de purpose/created, secciones de categoría `##` conteniendo líneas `- [ ] CHK### <elemento de requisito>` con IDs incrementales globalmente comenzando en CHK001.

7. **Reportar**: Generar ruta completa del checklist creado, conteo de elementos, y recordar al usuario que cada ejecución crea un archivo nuevo. Resumir:
   - Áreas de enfoque seleccionadas
   - Nivel de profundidad
   - Actor/temporización
   - Cualquier elemento imprescindible especificado explícitamente por el usuario incorporado

**Importante**: Cada invocación del comando `/speckit.checklist` crea un archivo de checklist usando nombres cortos y descriptivos a menos que el archivo ya exista. Esto permite:

- Múltiples checklists de diferentes tipos (ej., `ux.md`, `test.md`, `security.md`)
- Nombres de archivo simples y memorables que indican el propósito del checklist
- Identificación y navegación fácil en la carpeta `checklists/`

Para evitar desorden, usar tipos descriptivos y limpiar checklists obsoletos cuando terminen.

## Tipos de Checklist de Ejemplo e Elementos de Muestra

**Calidad de Requisitos UX:** `ux.md`

Elementos de muestra (probando los requisitos, NO la implementación):

- "¿Están definidos los requisitos de jerarquía visual con criterios medibles? [Claridad, Spec §FR-1]"
- "¿Están explícitamente especificados el número y posicionamiento de elementos de UI? [Completitud, Spec §FR-1]"
- "¿Están consistentemente definidos los requisitos de estado de interacción (hover, focus, active)? [Consistencia]"
- "¿Están especificados los requisitos de accesibilidad para todos los elementos interactivos? [Cobertura, Gap]"
- "¿Está definido el comportamiento de respaldo cuando las imágenes fallan al cargar? [Caso Límite, Gap]"
- "¿Puede 'visualización prominente' ser medida objetivamente? [Medibilidad, Spec §FR-4]"

**Calidad de Requisitos API:** `api.md`

Elementos de muestra:

- "¿Están especificados los formatos de respuesta de error para todos los escenarios de fallo? [Completitud]"
- "¿Están cuantificados los requisitos de limitación de tasa con umbrales específicos? [Claridad]"
- "¿Son consistentes los requisitos de autenticación a través de todos los endpoints? [Consistencia]"
- "¿Están definidos los requisitos de reintento/timeout para dependencias externas? [Cobertura, Gap]"
- "¿Está documentada la estrategia de versionado en requisitos? [Gap]"

**Calidad de Requisitos de Rendimiento:** `performance.md`

Elementos de muestra:

- "¿Están cuantificados los requisitos de rendimiento con métricas específicas? [Claridad]"
- "¿Están definidos los objetivos de rendimiento para todos los recorridos críticos del usuario? [Cobertura]"
- "¿Están especificados los requisitos de rendimiento bajo diferentes condiciones de carga? [Completitud]"
- "¿Pueden los requisitos de rendimiento ser medidos objetivamente? [Medibilidad]"
- "¿Están definidos los requisitos de degradación para escenarios de alta carga? [Caso Límite, Gap]"

**Calidad de Requisitos de Seguridad:** `security.md`

Elementos de muestra:

- "¿Están especificados los requisitos de autenticación para todos los recursos protegidos? [Cobertura]"
- "¿Están definidos los requisitos de protección de datos para información sensible? [Completitud]"
- "¿Está documentado el modelo de amenaza y los requisitos alineados a él? [Trazabilidad]"
- "¿Son los requisitos de seguridad consistentes con obligaciones de cumplimiento? [Consistencia]"
- "¿Están definidos los requisitos de respuesta a fallo/brecha de seguridad? [Gap, Flujo de Excepción]"

## Anti-Ejemplos: Qué NO Hacer

**❌ INCORRECTO - Estos prueban implementación, no requisitos:**

```markdown
- [ ] CHK001 - Verificar que la página de inicio muestre 3 tarjetas de episodios [Spec §FR-001]
- [ ] CHK002 - Probar que los estados hover funcionen correctamente en escritorio [Spec §FR-003]
- [ ] CHK003 - Confirmar que el clic en logo navegue a página de inicio [Spec §FR-010]
- [ ] CHK004 - Chequear que la sección de episodios relacionados muestre 3-5 elementos [Spec §FR-005]
```

**✅ CORRECTO - Estos prueban calidad de requisitos:**

```markdown
- [ ] CHK001 - ¿Están explícitamente especificados el número y diseño de episodios destacados? [Completitud, Spec §FR-001]
- [ ] CHK002 - ¿Están consistentemente definidos los requisitos de estado hover para todos los elementos interactivos? [Consistencia, Spec §FR-003]
- [ ] CHK003 - ¿Son claros los requisitos de navegación para todos los elementos de marca clicables? [Claridad, Spec §FR-010]
- [ ] CHK004 - ¿Están documentados los criterios de selección para episodios relacionados? [Gap, Spec §FR-005]
- [ ] CHK005 - ¿Están definidos los requisitos de estado de carga para datos de episodios asíncronos? [Gap]
- [ ] CHK006 - ¿Pueden los requisitos de "jerarquía visual" ser medidos objetivamente? [Medibilidad, Spec §FR-001]
```

**Diferencias Clave:**

- Incorrecto: Prueba si el sistema funciona correctamente
- Correcto: Prueba si los requisitos están escritos correctamente
- Incorrecto: Verificación de comportamiento
- Correcto: Validación de calidad de requisito
- Incorrecto: "¿Hace X?"
- Correcto: "¿Está X claramente especificado?"
