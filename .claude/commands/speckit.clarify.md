---
description: Identificar áreas subespecificadas en la especificación de la funcionalidad actual mediante hasta 5 preguntas de aclaración altamente enfocadas y codificar las respuestas de vuelta en la especificación.
---

## Entrada del Usuario

```text
$ARGUMENTS
```

**DEBE** considerar la entrada del usuario antes de proceder (si no está vacía).

## Esquema

Objetivo: Detectar y reducir la ambigüedad o puntos de decisión faltantes en la especificación de funcionalidad activa y registrar las aclaraciones directamente en el archivo de especificación.

Nota: Se espera que este flujo de trabajo de aclaración se ejecute (y complete) ANTES de invocar `/speckit.plan`. Si el usuario indica explícitamente que está omitiendo la aclaración (por ejemplo, exploración experimental), puede proceder, pero debe advertir que aumenta el riesgo de reelaboración posterior.

Pasos de ejecución:

1. Ejecutar `.specify/scripts/bash/check-prerequisites.sh --json --paths-only` desde la raíz del repositorio **una vez** (modo combinado `--json --paths-only` / `-Json -PathsOnly`). Analizar los campos mínimos del payload JSON:
   - `FEATURE_DIR`
   - `FEATURE_SPEC`
   - (Opcionalmente capturar `IMPL_PLAN`, `TASKS` para flujos encadenados futuros.)
   - Si falla el análisis de JSON, abortar e instruir al usuario para que vuelva a ejecutar `/speckit.specify` o verifique el entorno de la rama de funcionalidad.
   - Para comillas simples en args como "I'm Groot", usar sintaxis de escape: ej. 'I'\''m Groot' (o comillas dobles si es posible: "I'm Groot").

2. Cargar el archivo de especificación actual. Realizar un escaneo estructurado de ambigüedad y cobertura usando esta taxonomía. Para cada categoría, marcar estado: Claro / Parcial / Faltante. Producir un mapa de cobertura interno usado para priorización (no mostrar el mapa crudo a menos que no se hagan preguntas).

   Alcance y Comportamiento Funcional:
   - Objetivos principales del usuario y criterios de éxito
   - Declaraciones explícitas de fuera de alcance
   - Diferenciación de roles de usuario / personas

   Dominio y Modelo de Datos:
   - Entidades, atributos, relaciones
   - Reglas de identidad y unicidad
   - Transiciones de ciclo de vida/estado
   - Suposiciones de volumen/escala de datos

   Interacción y Flujo de UX:
   - Recorridos/secuencias críticas del usuario
   - Estados de error/vacío/carga
   - Notas de accesibilidad o localización

   Atributos de Calidad No Funcionales:
   - Rendimiento (objetivos de latencia, throughput)
   - Escalabilidad (horizontal/vertical, límites)
   - Confiabilidad y disponibilidad (expectativas de tiempo de actividad, recuperación)
   - Observabilidad (señales de logging, métricas, trazas)
   - Seguridad y privacidad (authN/Z, protección de datos, suposiciones de amenazas)
   - Restricciones de cumplimiento/regulatorias (si las hay)

   Integración y Dependencias Externas:
   - Servicios/APIs externos y modos de fallo
   - Formatos de importación/exportación de datos
   - Suposiciones de protocolo/versionado

   Casos Límite y Manejo de Fallos:
   - Escenarios negativos
   - Limitación de tasa / throttling
   - Resolución de conflictos (ej., ediciones concurrentes)

   Restricciones y Compensaciones:
   - Restricciones técnicas (lenguaje, almacenamiento, hosting)
   - Compensaciones explícitas o alternativas rechazadas

   Terminología y Consistencia:
   - Términos canónicos del glosario
   - Sinónimos evitados / términos obsoletos

   Señales de Completitud:
   - Testabilidad de criterios de aceptación
   - Indicadores medibles estilo Definición de Terminado

   Misceláneos / Placeholders:
   - Marcadores TODO / decisiones sin resolver
   - Adjetivos ambiguos ("robusto", "intuitivo") que carecen de cuantificación

   Para cada categoría con estado Parcial o Faltante, agregar una oportunidad de pregunta candidata a menos que:
   - La aclaración no cambiaría materialmente la estrategia de implementación o validación
   - La información se difiere mejor a la fase de planificación (notar internamente)

3. Generar (internamente) una cola priorizada de preguntas de aclaración candidatas (máximo 5). NO mostrarlas todas a la vez. Aplicar estas restricciones:
    - Máximo de 10 preguntas totales en toda la sesión.
    - Cada pregunta debe ser contestable con CUALQUIERA de:
       - Una selección de opción múltiple corta (2–5 opciones distintas, mutuamente exclusivas), O
       - Una respuesta de una palabra / frase corta (restricción explícita: "Responder en <=5 palabras").
    - Solo incluir preguntas cuyas respuestas impacten materialmente la arquitectura, modelado de datos, descomposición de tareas, diseño de pruebas, comportamiento de UX, preparación operacional, o validación de cumplimiento.
    - Asegurar balance de cobertura de categorías: intentar cubrir primero las categorías sin resolver de mayor impacto; evitar hacer dos preguntas de bajo impacto cuando un área de alto impacto (ej., postura de seguridad) está sin resolver.
    - Excluir preguntas ya respondidas, preferencias estilísticas triviales, o detalles de ejecución a nivel de plan (a menos que bloqueen corrección).
    - Favorecer aclaraciones que reduzcan el riesgo de reelaboración posterior o prevengan pruebas de aceptación desalineadas.
    - Si más de 5 categorías permanecen sin resolver, seleccionar las 5 principales por la heurística (Impacto * Incertidumbre).

4. Bucle de cuestionamiento secuencial (interactivo):
    - Presentar EXACTAMENTE UNA pregunta a la vez.
    - Para preguntas de opción múltiple:
       - **Analizar todas las opciones** y determinar la **opción más adecuada** basándose en:
          - Mejores prácticas para el tipo de proyecto
          - Patrones comunes en implementaciones similares
          - Reducción de riesgos (seguridad, rendimiento, mantenibilidad)
          - Alineación con cualquier objetivo o restricción explícita del proyecto visible en la especificación
       - Presentar su **opción recomendada prominentemente** en la parte superior con razonamiento claro (1-2 oraciones explicando por qué esta es la mejor opción).
       - Formatear como: `**Recomendado:** Opción [X] - <razonamiento>`
       - Luego renderizar todas las opciones como una tabla Markdown:

       | Option | Description |
       |--------|-------------|
       | A | <Option A description> |
       | B | <Option B description> |
       | C | <Option C description> (add D/E as needed up to 5) |
       | Short | Provide a different short answer (<=5 words) (Include only if free-form alternative is appropriate) |

       - Después de la tabla, agregar: `Puedes responder con la letra de la opción (ej., "A"), aceptar la recomendación diciendo "yes" o "recommended", o proporcionar tu propia respuesta corta.`
    - Para estilo de respuesta corta (sin opciones discretas significativas):
       - Proporcionar tu **respuesta sugerida** basada en mejores prácticas y contexto.
       - Formatear como: `**Sugerido:** <tu respuesta propuesta> - <razonamiento breve>`
       - Luego mostrar: `Formato: Respuesta corta (<=5 palabras). Puedes aceptar la sugerencia diciendo "yes" o "suggested", o proporcionar tu propia respuesta.`
    - Después de que el usuario responda:
       - Si el usuario responde con "yes", "recommended", o "suggested", usar tu recomendación/sugerencia previamente declarada como la respuesta.
       - De lo contrario, validar que la respuesta mapee a una opción o cumpla con la restricción de <=5 palabras.
       - Si es ambiguo, pedir una desambiguación rápida (el conteo aún pertenece a la misma pregunta; no avanzar).
       - Una vez satisfactorio, registrarlo en memoria de trabajo (aún no escribir en disco) y pasar a la siguiente pregunta en cola.
    - Dejar de hacer más preguntas cuando:
       - Todas las ambigüedades críticas se resuelvan temprano (los elementos restantes en cola se vuelven innecesarios), O
       - El usuario señale completitud ("done", "good", "no more"), O
       - Se alcancen 5 preguntas realizadas.
    - Nunca revelar preguntas futuras en cola por adelantado.
    - Si no existen preguntas válidas al inicio, reportar inmediatamente que no hay ambigüedades críticas.

5. Integración después de CADA respuesta aceptada (enfoque de actualización incremental):
    - Mantener representación en memoria de la especificación (cargada una vez al inicio) más el contenido crudo del archivo.
    - Para la primera respuesta integrada en esta sesión:
       - Asegurar que exista una sección `## Clarifications` (crearla justo después de la sección contextual/general de más alto nivel según la plantilla de especificación si falta).
       - Debajo de ella, crear (si no está presente) un subencabezado `### Session YYYY-MM-DD` para hoy.
    - Agregar una línea de viñeta inmediatamente después de la aceptación: `- Q: <pregunta> → A: <respuesta final>`.
    - Luego aplicar inmediatamente la aclaración a la(s) sección(es) más apropiada(s):
       - Ambigüedad funcional → Actualizar o agregar una viñeta en Requisitos Funcionales.
       - Interacción de usuario / distinción de actor → Actualizar Historias de Usuario o subsección de Actores (si está presente) con rol aclarado, restricción, o escenario.
       - Forma de datos / entidades → Actualizar Modelo de Datos (agregar campos, tipos, relaciones) preservando el orden; notar restricciones agregadas sucintamente.
       - Restricción no funcional → Agregar/modificar criterios medibles en sección de Atributos No Funcionales / de Calidad (convertir adjetivo vago a métrica u objetivo explícito).
       - Caso límite / flujo negativo → Agregar una nueva viñeta bajo Casos Límite / Manejo de Errores (o crear dicha subsección si la plantilla proporciona placeholder para ella).
       - Conflicto de terminología → Normalizar término a través de la especificación; retener original solo si es necesario agregando `(anteriormente referido como "X")` una vez.
    - Si la aclaración invalida una declaración ambigua anterior, reemplazar esa declaración en lugar de duplicar; no dejar texto contradictorio obsoleto.
    - Guardar el archivo de especificación DESPUÉS de cada integración para minimizar el riesgo de pérdida de contexto (sobrescritura atómica).
    - Preservar formato: no reordenar secciones no relacionadas; mantener jerarquía de encabezados intacta.
    - Mantener cada aclaración insertada mínima y testeable (evitar deriva narrativa).

6. Validación (realizada después de CADA escritura más pase final):
   - La sesión de aclaraciones contiene exactamente una viñeta por respuesta aceptada (sin duplicados).
   - Total de preguntas realizadas (aceptadas) ≤ 5.
   - Las secciones actualizadas no contienen placeholders vagos persistentes que la nueva respuesta debía resolver.
   - No permanece ninguna declaración contradictoria anterior (escanear para eliminar opciones alternativas ahora inválidas).
   - Estructura Markdown válida; únicos encabezados nuevos permitidos: `## Clarifications`, `### Session YYYY-MM-DD`.
   - Consistencia de terminología: mismo término canónico usado a través de todas las secciones actualizadas.

7. Escribir la especificación actualizada de vuelta a `FEATURE_SPEC`.

8. Reportar completitud (después de que termine el bucle de cuestionamiento o terminación temprana):
   - Número de preguntas realizadas y respondidas.
   - Ruta a la especificación actualizada.
   - Secciones tocadas (listar nombres).
   - Tabla resumen de cobertura listando cada categoría de taxonomía con Estado: Resuelto (era Parcial/Faltante y fue atendido), Diferido (excede cuota de preguntas o más adecuado para planificación), Claro (ya suficiente), Pendiente (aún Parcial/Faltante pero bajo impacto).
   - Si quedan Pendiente o Diferido, recomendar si proceder a `/speckit.plan` o ejecutar `/speckit.clarify` nuevamente más tarde post-plan.
   - Comando siguiente sugerido.

Reglas de comportamiento:

- Si no se encuentran ambigüedades significativas (o todas las preguntas potenciales serían de bajo impacto), responder: "No se detectaron ambigüedades críticas que valgan aclaración formal." y sugerir proceder.
- Si falta el archivo de especificación, instruir al usuario para ejecutar `/speckit.specify` primero (no crear una nueva especificación aquí).
- Nunca exceder 5 preguntas totales realizadas (reintentos de aclaración para una sola pregunta no cuentan como preguntas nuevas).
- Evitar preguntas especulativas de stack tecnológico a menos que la ausencia bloquee claridad funcional.
- Respetar señales de terminación temprana del usuario ("stop", "done", "proceed").
- Si no se hacen preguntas debido a cobertura completa, mostrar un resumen de cobertura compacto (todas las categorías Claras) luego sugerir avanzar.
- Si se alcanza la cuota con categorías de alto impacto sin resolver restantes, marcarlas explícitamente bajo Diferido con razonamiento.

Contexto para priorización: $ARGUMENTS
