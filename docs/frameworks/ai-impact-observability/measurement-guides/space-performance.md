# Guía de Medición: SPACE - Performance (Rendimiento)

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Tiempo Estimado**: 30 minutos

---

## Métrica: Velocity (Story Points/Sprint)

### Método de Medición (Jira)

**JQL Query**:
```jql
project = "MyApp"
AND type = "Story"
AND status = "Done"
AND Sprint in closedSprints()
ORDER BY Sprint DESC
```

Exportar a CSV y sumar story points por sprint.

### Método de Medición (Linear)

Query vía API:

```bash
# Linear API (requiere API key)
curl -X POST https://api.linear.app/graphql \
  -H "Authorization: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ issues(filter: { state: { name: { eq: \"Done\" }}}) { nodes { estimate } }}"}'
```

### Cálculo

```python
# Ejemplo: Últimos 6 sprints
sprints = [
    {"sprint": 1, "points": 45},
    {"sprint": 2, "points": 52},
    {"sprint": 3, "points": 48},
    {"sprint": 4, "points": 50},
    {"sprint": 5, "points": 46},
    {"sprint": 6, "points": 49},
]

avg_velocity = sum([s["points"] for s in sprints]) / len(sprints)
print(f"Velocity Promedio: {avg_velocity:.1f} story points/sprint")
```

### Benchmarks

Velocity es relativa al equipo (no hay benchmark universal).

**Trackear tendencia**:
- ↗️ Mejorando: Velocity aumenta >10% trimestre a trimestre
- → Estable: Velocity ±10%
- ↘️ Declinando: Velocity disminuye >10%

### Meta con IA

- **Mejora**: +25% (de 48 a 60 points/sprint)

---

**Última Actualización**: 2025-11-13
