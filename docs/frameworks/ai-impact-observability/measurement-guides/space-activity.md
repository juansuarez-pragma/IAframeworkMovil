# Guía de Medición: SPACE - Activity (Actividad)

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Tiempo Estimado**: 1 hora

---

## Métricas de Activity

1. **Code Review Time** - Tiempo de PR a merge
2. **Onboarding Time** - Días hasta productividad

---

## Métrica 1: Code Review Time

### Método de Medición (GitHub)

```bash
# Tiempo promedio de code review (últimos 50 PRs)
gh pr list --state merged --limit 50 --json number,createdAt,mergedAt \
  | jq '[.[] | (((.mergedAt | fromdateiso8601) - (.createdAt | fromdateiso8601)) / 3600)] | add/length'

# Output: Horas promedio (ej: 36.5)
```

### Script Python

```python
#!/usr/bin/env python3
from datetime import datetime
import subprocess
import json

result = subprocess.run(
    ['gh', 'pr', 'list', '--state', 'merged', '--limit', '50',
     '--json', 'number,createdAt,mergedAt'],
    capture_output=True,
    text=True
)

prs = json.loads(result.stdout)

review_times = []
for pr in prs:
    created = datetime.fromisoformat(pr['createdAt'].replace('Z', '+00:00'))
    merged = datetime.fromisoformat(pr['mergedAt'].replace('Z', '+00:00'))
    hours = (merged - created).total_seconds() / 3600
    review_times.append(hours)

avg_hours = sum(review_times) / len(review_times)
print(f"Code Review Time: {avg_hours:.1f} horas ({avg_hours/24:.1f} días)")
```

### Benchmarks

| Nivel | Code Review Time |
|-------|-----------------|
| Excelente | <12h |
| Bueno | 12-24h |
| Mejorable | 24-48h |
| Crítico | >48h |

### Meta con IA

- **Reducción**: 40% (de 36h a 22h)

---

## Métrica 2: Onboarding Time

### Método de Medición

Usar template: `templates/onboarding-checklist.md`

Trackear en spreadsheet:

| Developer | Inicio | Productivo | Días |
|-----------|--------|------------|------|
| Juan | 2025-10-01 | 2025-11-12 | 42 |
| María | 2025-10-15 | 2025-11-25 | 41 |

Calcular promedio de últimas 5-10 contrataciones.

### Benchmarks

| Nivel | Onboarding Time |
|-------|----------------|
| Excelente | <21 días |
| Bueno | 21-35 días |
| Mejorable | 35-50 días |
| Crítico | >50 días |

### Meta con IA

- **Reducción**: 50% (de 42 a 21 días)

---

**Última Actualización**: 2025-11-13
