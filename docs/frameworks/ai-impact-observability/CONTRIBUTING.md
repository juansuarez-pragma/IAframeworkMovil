# Guía de Contribución

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Última Actualización**: 2025-11-13

---

## Bienvenido

¡Gracias por tu interés en contribuir al Framework de Observabilidad del Impacto de IA para Flutter! Este documento te guiará a través del proceso de agregar nuevas métricas, KPIs, guías de medición, y casos de estudio al framework.

---

## Tabla de Contenidos

1. [Tipos de Contribuciones](#tipos-de-contribuciones)
2. [Cómo Agregar una Nueva Métrica](#cómo-agregar-una-nueva-métrica)
3. [Cómo Agregar un Nuevo KPI Ejecutivo](#cómo-agregar-un-nuevo-kpi-ejecutivo)
4. [Cómo Mejorar Guías de Medición](#cómo-mejorar-guías-de-medición)
5. [Cómo Contribuir Casos de Estudio](#cómo-contribuir-casos-de-estudio)
6. [Estándares de Calidad](#estándares-de-calidad)
7. [Proceso de Revisión](#proceso-de-revisión)
8. [Código de Conducta](#código-de-conducta)

---

## Tipos de Contribuciones

Aceptamos los siguientes tipos de contribuciones:

### 1. Nuevas Métricas DORA/SPACE
- Agregar métricas que no están actualmente en el framework
- Debe ser relevante para desarrollo Flutter multiplataforma
- Debe tener método de medición implementable

### 2. Nuevos KPIs Ejecutivos
- Solo si reemplaza uno de los 5 KPIs existentes O si amplía el framework a más de 5 KPIs (requiere justificación)
- Debe tener cálculo financiero claro (costo en $/año)
- Debe ser comprensible para stakeholders no técnicos (CTO, CFO)

### 3. Mejoras a Guías de Medición
- Agregar comandos más específicos o queries
- Corregir errores en fórmulas o metodologías
- Agregar alternativas para diferentes herramientas (ej: GitLab vs GitHub)

### 4. Casos de Estudio
- Documentar implementación real del framework en tu equipo
- Incluir datos reales (anonimizados si es necesario)
- Mostrar impacto medido (baseline vs post-IA)

### 5. Correcciones y Mejoras
- Typos, errores gramaticales
- Enlaces rotos
- Mejoras de formato o claridad

---

## Cómo Agregar una Nueva Métrica

### Paso 1: Verificar que la Métrica No Existe

Revisa `docs/frameworks/ai-impact-observability/metrics-table.md` para asegurarte de que la métrica que quieres agregar no está ya cubierta.

### Paso 2: Usar la Plantilla de Métrica

Copia el archivo plantilla:

```bash
cp docs/frameworks/ai-impact-observability/templates/metric-template.md \
   docs/frameworks/ai-impact-observability/drafts/[NOMBRE-DE-TU-METRICA].md
```

### Paso 3: Completar la Plantilla

Completa TODAS las secciones de la plantilla:

- **Identificación**: ID único, categoría DORA/SPACE, nombre
- **Descripción**: Qué mide la métrica (máximo 500 caracteres)
- **Adaptación Flutter**: Por qué es única/crítica para Flutter (debe mencionar conceptos Flutter-específicos)
- **Cómo Medirlo**: Herramientas, comandos exactos, fórmulas
- **Valores de Referencia**: Baseline sin IA y target con IA
- **Impacto en KPIs**: Qué KPIs ejecutivos se benefician de esta métrica
- **Ejemplo Trabajado**: Cálculo completo para un equipo de 15 developers

### Paso 4: Crear Definición JSON

Crea una definición JSON validada contra el schema:

```bash
# Crear archivo JSON
touch docs/frameworks/ai-impact-observability/data/metrics/[ID-DE-METRICA].json
```

**Ejemplo de estructura**:
```json
{
  "id": "SPACE-EFF-002",
  "categoria": "SPACE_EFFICIENCY",
  "nombre": "Tu Nueva Métrica",
  "descripcion": "...",
  "adaptacionFlutter": "...",
  "metodoMedicion": {
    "id": "MET-XXX-001",
    "herramienta": "...",
    "comandos": "...",
    "frecuencia": "WEEKLY"
  },
  "baselineComun": {
    "valor": 10,
    "unidad": "minutos"
  },
  "targetConIA": {
    "valor": 7,
    "unidad": "minutos"
  },
  "impactoEsperado": 30,
  "criticidadFlutter": "ALTA",
  "relacionesKPI": ["KPI-002"],
  "fechaCreacion": "2025-11-13T00:00:00Z",
  "versionFramework": "1.0.0"
}
```

### Paso 5: Validar Contra Schema

Valida tu JSON contra el schema:

```bash
# Si tienes una herramienta de validación JSON Schema instalada
jsonschema -i docs/frameworks/ai-impact-observability/data/metrics/[ID-DE-METRICA].json \
           docs/frameworks/ai-impact-observability/schemas/metrics-schema.json
```

### Paso 6: Agregar Fila a Tabla de Métricas

Edita `docs/frameworks/ai-impact-observability/metrics-table.md` y agrega una fila con:

| Categoría | Métrica Clave | Adaptación Flutter | Cómo Medirlo (Baseline) | Impacto Esperado IA |
|-----------|---------------|-------------------|------------------------|---------------------|
| [DORA/SPACE] | [Nombre] | [Adaptación resumida] | [Herramienta + comando breve] | [%] |

### Paso 7: Actualizar KPIs Relacionados

Si tu métrica impacta un KPI ejecutivo existente, edita:
`docs/frameworks/ai-impact-observability/executive-dashboard.md`

Agrega referencia a tu métrica en la sección "Métricas Subyacentes" del KPI correspondiente.

### Paso 8: Crear Pull Request

Haz commit de tus cambios y abre un Pull Request con:

**Título**: `feat: Add [NOMBRE-METRICA] metric to framework`

**Descripción**:
```markdown
## Nueva Métrica: [NOMBRE]

**Categoría**: [DORA/SPACE]
**Criticidad Flutter**: [BAJA/MEDIA/ALTA/CRÍTICA]

### Por qué esta métrica es importante:
[2-3 oraciones explicando el valor]

### Cómo se mide:
[Resumen breve del método]

### KPIs impactados:
- KPI-[###]: [Nombre]

### Checklist de contribución:
- [ ] Plantilla de métrica completada
- [ ] Definición JSON creada y validada
- [ ] Fila agregada a metrics-table.md
- [ ] KPIs relacionados actualizados
- [ ] Ejemplo trabajado incluido con cálculos verificables
```

---

## Cómo Agregar un Nuevo KPI Ejecutivo

### ⚠️ Restricción Importante

El Dashboard Ejecutivo tiene **exactamente 5 KPIs** por diseño (para evitar sobrecarga de información). Si quieres agregar un sexto KPI, debes:

1. **Justificar** por qué este KPI es más importante que uno de los 5 existentes, O
2. **Proponer deprecar** uno de los KPIs actuales y explicar por qué

### Paso 1: Usar la Plantilla de KPI

```bash
cp docs/frameworks/ai-impact-observability/templates/kpi-template.md \
   docs/frameworks/ai-impact-observability/drafts/[NOMBRE-DE-TU-KPI].md
```

### Paso 2: Completar la Plantilla

Completa TODAS las secciones:

- **Identificación**: ID único (KPI-001 a KPI-005), nombre accionable
- **Narrativa de Impacto**: Frase poderosa con cifra en dólares
- **Descripción Ejecutiva**: Lenguaje de negocio, NO técnico
- **Audiencia Objetivo**: CTO, CFO, VP Engineering, CEO
- **Métricas Subyacentes**: Al menos 1 métrica DORA/SPACE que alimenta este KPI
- **Cálculo de Costo Anual**: Fórmula completa con ejemplo trabajado
- **Impacto de IA**: Porcentaje de mejora + justificación con fuentes
- **ROI y Payback**: Cálculos financieros completos
- **Visualización**: Tipo de gráfico + mockup ASCII
- **Análisis de Sensibilidad**: Escenarios optimista/realista/conservador/pesimista

### Paso 3: Validar con Stakeholder No Técnico

**Crítico**: Antes de enviar el PR, valida el KPI con alguien NO técnico (CFO, Finance Manager, Product Manager):

1. ¿Entienden qué se está midiendo? **[Sí/No]**
2. ¿Ven el impacto financiero claramente? **[Sí/No]**
3. ¿Pueden explicarlo en sus propias palabras? **[Sí/No]**
4. ¿Considerarían actuar sobre este dato? **[Sí/No]**

Si alguna respuesta es "No", itera el KPI hasta que todas sean "Sí".

### Paso 4: Crear Definición JSON

```bash
touch docs/frameworks/ai-impact-observability/data/kpis/[ID-DE-KPI].json
```

Valida contra `schemas/kpi-dashboard-schema.json`.

### Paso 5: Actualizar Dashboard Ejecutivo

Edita `docs/frameworks/ai-impact-observability/executive-dashboard.md`:

- Agrega sección completa del KPI
- Actualiza "Costo Total de Inacción" sumando tu KPI (¡cuidado con doble-contabilización!)
- Actualiza mockup de dashboard layout

### Paso 6: Crear Pull Request

**Título**: `feat: Add [NOMBRE-KPI] KPI to executive dashboard`

**Descripción**:
```markdown
## Nuevo KPI: [NOMBRE]

**Prioridad**: [1-5]
**Audiencia**: [CTO/CFO/VP/CEO]

### Narrativa de Impacto:
"[Frase de 1-2 líneas con cifra en dólares]"

### Por qué este KPI es crítico:
[2-3 oraciones]

### Métricas subyacentes:
- [Métrica 1]
- [Métrica 2]

### Costo de Inacción (equipo de 20 devs):
**$[MONTO]/año**

### ROI de Inversión en IA:
- Ahorro: $[X]/año
- ROI: [Y]%
- Payback: [Z] días

### Validación con stakeholder no técnico:
- Testeado con: [Rol de la persona]
- Resultado: [Todas las preguntas respondidas con "Sí"]

### Checklist:
- [ ] Plantilla de KPI completada
- [ ] Definición JSON creada y validada
- [ ] Sección agregada a executive-dashboard.md
- [ ] Costo Total de Inacción actualizado (sin doble conteo)
- [ ] Mockup de visualización incluido
- [ ] Análisis de sensibilidad completo
- [ ] Validado con stakeholder no técnico
```

---

## Cómo Mejorar Guías de Medición

Las guías de medición están en:
`docs/frameworks/ai-impact-observability/measurement-guides/`

### Tipos de Mejoras Bienvenidas

1. **Comandos más específicos**: Agregar ejemplos concretos para herramientas específicas
2. **Alternativas de herramientas**: Agregar equivalentes para GitLab, Bitbucket, Jira, Linear, etc.
3. **Scripts de automatización**: Contribuir scripts Bash/Python para automatizar extracción de datos
4. **Correcciones de fórmulas**: Si encuentras errores en cálculos matemáticos
5. **Ejemplos adicionales**: Casos de uso específicos (ej: "Cómo medir Lead Time en un proyecto con Gitflow")

### Proceso

1. **Identifica la guía**: ej: `dora-metrics.md`, `space-satisfaction.md`, etc.
2. **Edita la sección relevante**: Agrega tu mejora con un comentario `<!-- Contribuido por [Tu Nombre] -->`
3. **Testea en proyecto real**: Verifica que tus comandos/queries funcionan
4. **Crea PR** con título: `docs: Improve [NOMBRE-GUIA] measurement guide`

---

## Cómo Contribuir Casos de Estudio

Los casos de estudio son extremadamente valiosos para demostrar el impacto real del framework.

### Estructura Requerida

Crea un archivo en:
`docs/frameworks/ai-impact-observability/case-studies/team-[TAMAÑO]-[EMPRESA].md`

**Ejemplo**: `team-25-fintech-startup.md`

### Contenido Mínimo

```markdown
# Caso de Estudio: [Nombre de Empresa] - [Tamaño de Equipo] Developers

**Fecha**: [Mes/Año]
**Industria**: [Fintech, E-commerce, Healthcare, etc.]
**Tamaño de Equipo**: [X] developers Flutter
**Herramientas IA Adoptadas**: [GitHub Copilot, etc.]

## Situación Inicial (Baseline)

### Métricas Medidas (Antes de IA)

| Métrica | Valor Baseline |
|---------|----------------|
| Lead Time | [X] días |
| Build Time | [Y] minutos |
| Crash-Free Users | [Z]% |
| Onboarding Time | [W] días |
| Developer Satisfaction | [V]/10 |

### Pain Points Identificados

[Lista de 3-5 problemas principales]

## Implementación

### Herramientas Adoptadas

- [Herramienta 1]: $[Costo]/mes
- [Herramienta 2]: $[Costo]/mes

### Timeline de Adopción

- **Semana 1**: [Qué se hizo]
- **Semana 2**: [Qué se hizo]
- **Semana 3-4**: [Qué se hizo]

## Resultados (Después de 90 Días)

### Métricas Medidas (Post-IA)

| Métrica | Valor Baseline | Valor Post-IA | Mejora |
|---------|----------------|---------------|--------|
| Lead Time | [X] días | [X2] días | [-%] |
| Build Time | [Y] min | [Y2] min | [-%] |
| ... | ... | ... | ... |

### Impacto Financiero

**Inversión Anual en IA**: $[X]
**Ahorro Anual Calculado**: $[Y]
**ROI**: [Z]%
**Payback Period**: [W] días

## Lecciones Aprendidas

[3-5 insights clave de la implementación]

## Recomendaciones

[Qué harías diferente? Qué recomiendas a otros equipos?]
```

### Anonimización de Datos

Si no puedes revelar el nombre de la empresa, usa:
- `team-[tamaño]-[industria]-[año].md`
- Ejemplo: `team-30-ecommerce-2025.md`

---

## Estándares de Calidad

Todas las contribuciones deben cumplir:

### 1. Estándar de Idioma

- **Toda la documentación debe estar en español** (incluyendo comentarios de código)
- Usar términos técnicos en inglés solo cuando no existe traducción estándar (ej: "widget", "hot reload")
- Glosario disponible en `glossary.md` para términos clave

### 2. Estándar de Formato

- **Markdown**: Usar sintaxis estándar (compatible con GitHub, GitLab)
- **Títulos**: Máximo 3 niveles de anidación (###)
- **Tablas**: Usar formato de tabla Markdown, no HTML
- **Código**: Usar bloques con sintaxis highlighting (```bash, ```dart, ```json)

### 3. Estándar de Validación

#### Para Métricas:

- [ ] ID sigue patrón `[DORA|SPACE]-[CÓDIGO]-[###]`
- [ ] Descripción < 500 caracteres
- [ ] Adaptación Flutter menciona conceptos Flutter-específicos
- [ ] Método de medición incluye comandos ejecutables
- [ ] Valores baseline y target son consistentes
- [ ] Impacto esperado está entre 0-100%
- [ ] Al menos 1 KPI relacionado especificado
- [ ] Ejemplo trabajado tiene cálculos completos

#### Para KPIs:

- [ ] ID sigue patrón `KPI-[###]`
- [ ] Nombre < 80 caracteres y es accionable
- [ ] Descripción ejecutiva NO usa jerga técnica
- [ ] Narrativa incluye cifra en dólares
- [ ] Al menos 1 métrica subyacente
- [ ] Fórmula de costo anual es completa
- [ ] Ejemplo tiene números reales y verificables
- [ ] Impacto de IA está justificado con fuentes
- [ ] ROI y payback calculados correctamente
- [ ] Visualización es apropiada para audiencia ejecutiva
- [ ] Análisis de sensibilidad incluye 3+ escenarios
- [ ] Validado con stakeholder no técnico

#### Para Guías de Medición:

- [ ] Comandos/queries son ejecutables sin modificaciones
- [ ] Ejemplos de output incluidos
- [ ] Testeado en proyecto Flutter real
- [ ] Tiempo de ejecución < 2 horas por métrica
- [ ] Alternativas documentadas si herramienta no está disponible

#### Para Casos de Estudio:

- [ ] Incluye datos reales (baseline y post-IA)
- [ ] Timeline de implementación documentado
- [ ] Impacto financiero calculado
- [ ] Lecciones aprendidas y recomendaciones

### 4. Estándar de Testing

Antes de enviar PR:

1. **Spell check**: Usar corrector ortográfico
2. **Link check**: Todos los enlaces internos funcionan
3. **JSON validation**: Si incluyes JSON, validar contra schema
4. **Command testing**: Si incluyes comandos Bash/Git, testearlos
5. **Calculation verification**: Si incluyes cálculos, verificar matemáticas

---

## Proceso de Revisión

### Timeline

1. **PR abierto**: Revisión inicial en **48 horas** (feedback sobre formato/estructura)
2. **Revisión técnica**: **3-5 días** (validación de fórmulas, metodologías)
3. **Merge**: Después de que todas las revisiones estén resueltas

### Criterios de Aceptación

Para que un PR sea mergeado:

- [ ] Pasa todos los checks de calidad (ver arriba)
- [ ] Recibe aprobación de al menos **1 maintainer**
- [ ] Recibe aprobación de al menos **1 community reviewer** (si aplica)
- [ ] Todos los comentarios de review están resueltos
- [ ] No hay conflictos con main branch

### Tipos de Feedback

- **MUST FIX**: Bloqueante - debe corregirse antes de merge
- **SHOULD FIX**: Recomendado - mergeamos con issue de follow-up
- **NICE TO HAVE**: Opcional - puede ignorarse

---

## Código de Conducta

### Principios

1. **Respeto**: Trata a todos los contribuidores con respeto profesional
2. **Constructividad**: Feedback debe ser específico y accionable
3. **Inclusividad**: Todos los niveles de experiencia son bienvenidos
4. **Transparencia**: Decisiones técnicas se justifican públicamente

### Comportamientos Inaceptables

- Lenguaje ofensivo o discriminatorio
- Ataques personales
- Trolling o comentarios inflamatorios
- Spam o promoción no solicitada

### Reporte de Problemas

Si experimentas comportamiento inaceptable:
1. Reporta el issue a los maintainers (vía email o issue privado)
2. Incluye capturas de pantalla si es aplicable
3. Maintainers responderán en **48 horas**

---

## Reconocimiento

Todos los contribuidores serán reconocidos en:

1. **README.md**: Sección "Contributors" con nombre + GitHub profile
2. **CHANGELOG.md**: Mención en release notes
3. **Documentación**: Tag `<!-- Contribuido por [@username] -->` en secciones modificadas

---

## Preguntas Frecuentes

### ¿Puedo contribuir si no tengo experiencia con Flutter?

Sí, especialmente para:
- Mejoras de KPIs ejecutivos (más enfocados en negocio)
- Correcciones de formato/typos
- Casos de estudio de otros frameworks adaptados a Flutter

### ¿Puedo contribuir en inglés?

No. Todo el framework está en español para mantener consistencia. Si no dominas español, considera usar traducción asistida pero asegúrate de que la traducción sea revisada por un hablante nativo.

### ¿Puedo agregar métricas de otras plataformas (React Native, Xamarin)?

Este framework es específico para **Flutter multiplataforma**. Si quieres adaptar el framework a otras tecnologías, considera hacer un fork y crear un framework hermano.

### ¿Cómo sé si mi métrica/KPI es "bueno"?

Usa los checklists de validación en este documento. Si tienes dudas, abre un **Discussion** (no un PR) en el repositorio para feedback previo.

---

## Recursos Adicionales

- **Plantillas**: `docs/frameworks/ai-impact-observability/templates/`
- **Glosario**: `docs/frameworks/ai-impact-observability/glossary.md`
- **Schemas JSON**: `docs/frameworks/ai-impact-observability/schemas/`
- **Guía de Inicio Rápido**: `specs/001-ai-impact-framework/quickstart.md`

---

## Contacto

- **Issues**: [Repositorio GitHub]
- **Discussions**: [GitHub Discussions]
- **Email Maintainers**: [email@example.com]

---

**¡Gracias por contribuir!** 🚀

Tu contribución ayuda a miles de equipos Flutter a cuantificar el impacto de adoptar herramientas de IA y construir mejores business cases para sus organizaciones.

---

**Última Actualización**: 2025-11-13
**Versión**: 1.0.0
**Mantenido por**: [Tu Nombre/Organización]
