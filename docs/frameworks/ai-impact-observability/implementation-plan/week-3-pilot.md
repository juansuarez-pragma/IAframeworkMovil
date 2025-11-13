# Plan de Implementación - Semana 3: Piloto de IA

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Duración**: 5 días laborales + 90 días de medición

---

## Objetivo

Ejecutar piloto de GitHub Copilot con grupo selecto de 5 developers, establecer grupo de control, y medir impacto en productividad.

**Entregables**:
- ✅ Copilot activado para 5 developers (piloto)
- ✅ 5 developers en grupo de control (sin IA)
- ✅ Training completado
- ✅ Piloto activo durante 90 días
- ✅ Mediciones semanales

---

## Día 1: Setup y Activación

### Task 1.1: Seleccionar Participantes del Piloto

**Criterio de selección**:

**Grupo Piloto (5 developers con IA)**:
- 1 Senior (campeón, early adopter)
- 2 Mid-level (representativo)
- 2 Junior (test onboarding improvement)
- Mix de skill levels para medir impacto diferenciado

**Grupo de Control (5 developers sin IA)**:
- Similares seniority levels
- Trabajando en features comparables
- Voluntarios o selección aleatoria

**Importante**: Explicar al grupo de control que tendrán acceso después del piloto (no es exclusión permanente).

### Task 1.2: Activar GitHub Copilot Business

**Steps**:

1. Ir a GitHub Organization Settings
2. Copilot → Purchase Copilot Business
3. Asignar 5 licenses al grupo piloto
4. Enviar invitaciones

**Costo**: $39/mes × 5 devs = $195/mes

**Confirmación**: Cada developer debe recibir email de GitHub con activation link.

### Task 1.3: Instalar Extensiones

**VS Code**:
```bash
# Cada developer ejecuta:
code --install-extension github.copilot
code --install-extension github.copilot-chat
```

**Android Studio / IntelliJ**:
1. Settings → Plugins
2. Buscar "GitHub Copilot"
3. Install + Restart

**Verificación**: Abrir archivo Dart, escribir `// create stateful widget` → debe aparecer sugerencia.

---

## Día 2: Training y Onboarding

### Task 2.1: Sesión de Training (2 horas)

**Agenda**:

**0:00-0:15** - Introducción
- Qué es Copilot (copiloto, no autopiloto)
- Limitaciones y riesgos
- Importancia de code review

**0:15-0:45** - Demos en Vivo (Flutter-specific)
- StatefulWidget boilerplate generation
- JSON serialization models
- Test boilerplate (setUp, mocks)
- Widget testing patterns

**0:45-1:15** - Hands-on Practice
- Cada developer practica con repo de ejemplo
- Ejercicios:
  1. Crear `LoginScreen` (StatefulWidget)
  2. Crear `User` model con fromJson/toJson
  3. Crear widget test para `LoginButton`

**1:15-1:45** - Best Practices
- Cómo escribir buenos comments para mejores sugerencias
- Cuándo NO usar Copilot (lógica compleja, seguridad)
- Keyboard shortcuts (Tab, Alt+], etc.)

**1:45-2:00** - Q&A y Setup de Canal de Soporte

**Materiales**:
- Slides: `training/copilot-training-flutter.pdf`
- Repo de práctica: `github.com/yourorg/copilot-practice-flutter`

### Task 2.2: Crear Canal de Soporte

**Slack Channel**: `#copilot-pilot`

**Propósito**:
- Compartir tips y wins
- Resolver dudas
- Reportar bugs o sugerencias malas
- Daily standups virtuales

**Moderador**: Tech Lead (2h/semana commitment)

---

## Día 3-5: Kickoff del Piloto

### Task 3.1: Establecer KPIs de Éxito

**KPIs Primarios** (medirse semanalmente durante 90 días):

1. **Velocity** (Story Points)
   - Baseline: [X] SP/sprint
   - Target: +25% (mínimo) para justificar expansión

2. **Satisfaction** (NPS)
   - Baseline: [X]
   - Target: +15 puntos

3. **Lead Time**
   - Baseline: [X] días
   - Target: -30%

4. **CFR** (No debe empeorar)
   - Baseline: [X]%
   - Threshold: No más de +5% (con mejor testing debe mejorar)

**KPIs Secundarios**:

5. Code Review Time: Target -20%
6. Adoption Rate: Target >80% uso activo

### Task 3.2: Mediciones Semanales

**Semana 1, 2, 3... 12**:

**Cada Lunes**:
- Extraer Git metrics (commits, PRs)
- Calcular velocity (Jira/Linear)
- Check Crashlytics (CFR no empeoró?)
- Qualitative check-in: Slack poll "How's Copilot going?"

**Excel Tracker**: `measurements/pilot/weekly-metrics.xlsx`

| Week | Velocity (Pilot) | Velocity (Control) | Lead Time (Pilot) | Lead Time (Control) | Notes |
|------|------------------|--------------------|--------------------|---------------------|-------|
| 0 (Baseline) | 48 SP | 47 SP | 12.3d | 12.5d | Pre-pilot |
| 1 | 52 SP (+8%) | 48 SP | 11.8d | 12.4d | Ramp-up |
| 2 | 58 SP (+21%) | 49 SP | 10.5d | 12.1d | Improving |
| ... | ... | ... | ... | ... | ... |

### Task 3.3: Check-ins Semanales

**Quick Sync** (30 min, cada Viernes):
- Grupo piloto + Tech Lead
- Qué está funcionando bien?
- Qué está frustrado?
- Ajustes necesarios?

**Documentar**: `measurements/pilot/weekly-notes.md`

---

## Durante Semanas 4-15 (90 Días de Piloto)

### Monitoreo Continuo

**Automatizado**:
- Dashboard actualizado semanalmente (de Semana 2)
- Alertas si CFR sube >5%
- Alertas si velocity no mejora después de 4 semanas

**Manual**:
- Check-ins semanales con grupo piloto
- Monthly encuesta de satisfacción (mini-survey, 3 preguntas)
- Coleccionar anécdotas y quotes para business case

### Milestone: 30 Días

**Checkpoint Temprano**:

Si después de 30 días:
- ✅ Velocity +15%+ → **En track**
- ✅ Satisfaction mejorando → **En track**
- ✅ CFR no empeoró → **En track**
- ❌ Cualquier red flag → **Investigar y ajustar**

**Decisión**: Continuar piloto otros 60 días o abortar si resultados catastróficos (improbable).

### Milestone: 60 Días

**Checkpoint Mid-Pilot**:

- Medir mid-term satisfaction (NPS survey)
- Comparar velocities: Pilot vs Control
- Comenzar a socializar resultados preliminares con stakeholders

### Milestone: 90 Días

**Fin del Piloto** → Pasar a Semana 4 (Presentación)

---

## Checkpoint Semana 3

- [ ] Grupo piloto seleccionado (5 devs)
- [ ] Grupo control seleccionado (5 devs)
- [ ] Copilot activado para grupo piloto
- [ ] Extensiones instaladas y verificadas
- [ ] Training completado (2h session)
- [ ] Canal #copilot-pilot activo
- [ ] KPIs y tracker configurados
- [ ] Piloto oficialmente iniciado

---

## Red Flags y Cómo Responder

### Red Flag 1: Adoption Baja (<50%)

**Síntoma**: Solo 2 de 5 developers usando activamente después de 2 semanas.

**Acciones**:
- 1:1 con developers que no usan: ¿Por qué?
- Pair programming con campeón interno
- Revisar si suggestions son malas (Flutter data quality)

### Red Flag 2: CFR Empeora >10%

**Síntoma**: Crashlytics muestra más crashes después de 30 días.

**Acciones**:
- Mandatorio: Subir test coverage a 80%
- Code review más estricto (checklist AI-code)
- Training adicional sobre cuándo NO confiar en IA

### Red Flag 3: Velocity No Mejora

**Síntoma**: Después de 4 semanas, velocity igual o menor.

**Acciones**:
- Analizar: ¿Es ramp-up normal? (puede tomar 4-6 semanas)
- Revisar tipo de features (boilerplate-heavy vs lógica compleja)
- Considerar extender piloto a 120 días antes de juzgar

---

## Próxima Semana

**Semana 4** (después de 90 días): Compilar resultados y presentar business case
Ver: `implementation-plan/week-4-presentation.md`

---

**Duración Total**: 5 días (setup) + 90 días (piloto activo)

**Costo del Piloto**: $195/mes × 3 meses = $585

**Última Actualización**: 2025-11-13
