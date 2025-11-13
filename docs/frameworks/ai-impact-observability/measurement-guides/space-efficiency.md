# Guía de Medición: SPACE - Efficiency (Eficiencia)

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Tiempo Estimado**: 1-2 horas

---

## Métricas de Efficiency

1. **Build Time en CI** - Tiempo de compilación
2. **Tiempo en Boilerplate** - % de tiempo en código repetitivo

---

## Métrica 1: Build Time en CI

### Método de Medición

#### GitHub Actions

```bash
# Obtener duración de últimos 50 builds
gh run list --workflow="ci.yml" --limit 50 --json conclusion,durationMs \
  | jq '[.[] | select(.conclusion=="success") | .durationMs] | add/length/60000'

# Output: Tiempo promedio en minutos (ej: 15.3)
```

#### Bitrise / Codemagic

Exportar logs manualmente desde dashboard y extraer "Total duration".

### Script de Análisis

```python
#!/usr/bin/env python3
import json
import statistics

# Leer CI logs
with open('ci_build_times.json') as f:
    builds = json.load(f)

durations_minutes = [b['duration_ms'] / 60000 for b in builds if b['status'] == 'success']

print(f"Build Time Metrics:")
print(f"  Promedio: {statistics.mean(durations_minutes):.1f} min")
print(f"  Mediana: {statistics.median(durations_minutes):.1f} min")
print(f"  Min: {min(durations_minutes):.1f} min")
print(f"  Max: {max(durations_minutes):.1f} min")
```

### Benchmarks

| Nivel | Build Time (Flutter CI) |
|-------|-------------------------|
| Excelente | <10 min |
| Bueno | 10-15 min |
| Mejorable | 15-20 min |
| Crítico | >20 min |

### Meta con IA

- **Reducción**: 15% (indirecta - menos failed builds)
- **Baseline**: 15 min
- **Target**: 13 min

---

## Métrica 2: Tiempo en Boilerplate

### Método 1: Encuesta (Más Rápido)

Agregar pregunta a encuesta trimestral:

```
P: ¿Qué % de tu tiempo semanal gastas en código repetitivo?
(StatefulWidget boilerplate, JSON models, test setup, etc.)

- [ ] <10%
- [ ] 10-20%
- [ ] 20-30%
- [ ] 30-40%
- [ ] >40%
```

Calcular promedio del equipo.

### Método 2: Time Tracking (Más Preciso)

Usar herramienta de time tracking (Toggl, Clockify) con categorías:

- "Feature Development" (productivo)
- "Boilerplate" (repetitivo)
- "Code Review"
- "Meetings"

Analizar después de 2-4 semanas.

### Benchmarks

| Nivel | % Tiempo en Boilerplate |
|-------|------------------------|
| Excelente | <15% |
| Bueno | 15-25% |
| Mejorable | 25-35% |
| Crítico | >35% |

### Meta con IA

- **Reducción**: 60% (de 35% a 14%)
- **Baseline**: 35% del tiempo
- **Target**: 14% del tiempo

---

**Última Actualización**: 2025-11-13
