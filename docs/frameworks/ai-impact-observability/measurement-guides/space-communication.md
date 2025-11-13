# Guía de Medición: SPACE - Communication (Comunicación)

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Tiempo Estimado**: 1 hora

---

## Métrica: Documentation Coverage (Cobertura de Documentación)

### Método de Medición

#### Opción 1: dartdoc (Automatizada)

```bash
# Generar reporte de documentación
flutter pub global activate dartdoc
flutter pub global run dartdoc --no-generate-docs --validate-links

# Output muestra:
# - Total public elements
# - Documented elements
# - Coverage %
```

**Ejemplo output**:
```
Documenting myapp...
1,523 public elements
  892 documented (58.6%)
  631 undocumented (41.4%)
```

#### Opción 2: Manual (Documentación de arquitectura)

Checklist:

- [ ] README.md en raíz con setup instructions
- [ ] docs/architecture.md existe y está actualizado
- [ ] docs/state-management.md documenta patrón usado
- [ ] docs/api.md documenta endpoints (si aplica)
- [ ] Cada módulo principal tiene README

Score: (Items completados ÷ 5) × 100

### Benchmarks

| Nivel | Coverage (código) | Coverage (arquitectura) |
|-------|-------------------|------------------------|
| Excelente | >70% | 5/5 |
| Bueno | 50-70% | 4/5 |
| Mejorable | 30-50% | 3/5 |
| Crítico | <30% | <3/5 |

### Meta con IA

- **Mejora**: +25 puntos porcentuales (de 40% a 65%)

---

**Última Actualización**: 2025-11-13
