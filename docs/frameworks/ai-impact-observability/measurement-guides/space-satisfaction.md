# Guía de Medición: SPACE - Satisfaction (Satisfacción)

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Tiempo Estimado**: 1 hora (setup) + 5 min por developer (encuesta)

---

## Propósito

Medir la satisfacción y bienestar de developers en el equipo Flutter usando:
- Encuestas trimestrales (escala Likert 1-5)
- Net Promoter Score (NPS)
- Tracking de retención de talento

---

## Método de Medición

### Paso 1: Implementar Encuesta Trimestral

Usa el template: `templates/satisfaction-survey.md`

**Herramientas recomendadas**:
- Google Forms (gratuito)
- Typeform (mejor UX)
- Survey interno (si existe)

**Configuración**:
```
Frecuencia: Trimestral (cada 3 meses)
Anonimato: Sí (crítico para respuestas honestas)
Tiempo: 5 minutos máximo
Obligatoriedad: Opcional (mejor participation rate si es voluntaria)
```

### Paso 2: Distribuir Encuesta

**Email template**:
```
Subject: Encuesta Trimestral de Satisfacción (5 minutos)

Hola equipo,

Es hora de nuestra encuesta trimestral de satisfacción. Tus respuestas son
ANÓNIMAS y nos ayudan a mejorar herramientas y procesos.

Tiempo: 5 minutos
Link: [URL de encuesta]

Gracias! 🙏
```

**Participation rate objetivo**: >70%

### Paso 3: Analizar Resultados

#### Cálculo 1: Satisfaction Score (Promedio P1-P9)

```python
# Ejemplo con respuestas de 10 developers
responses = [
    [4, 3, 4, 3, 3, 4, 4, 3, 4],  # Developer 1
    [5, 4, 5, 4, 4, 5, 5, 4, 5],  # Developer 2
    [3, 2, 3, 3, 2, 3, 3, 2, 3],  # Developer 3
    # ... más developers
]

# Calcular promedio individual
individual_scores = [sum(r) / len(r) for r in responses]

# Calcular promedio del equipo
team_score = sum(individual_scores) / len(individual_scores)

print(f"Team Satisfaction Score: {team_score:.2f} / 5.00 ({team_score/5*100:.1f}%)")
```

#### Cálculo 2: Net Promoter Score (P10)

```python
nps_responses = [9, 10, 7, 8, 9, 10, 6, 10, 8, 9]  # Respuestas P10

promoters = len([x for x in nps_responses if x >= 9])  # 9-10
passives = len([x for x in nps_responses if 7 <= x <= 8])  # 7-8
detractors = len([x for x in nps_responses if x <= 6])  # 0-6

total = len(nps_responses)

nps = ((promoters / total) * 100) - ((detractors / total) * 100)

print(f"NPS: {nps:.0f}")
print(f"  Promoters: {promoters/total*100:.0f}% ({promoters})")
print(f"  Passives: {passives/total*100:.0f}% ({passives})")
print(f"  Detractors: {detractors/total*100:.0f}% ({detractors})")
```

### Benchmarks

| Métrica | Excelente | Bueno | Mejorable | Crítico |
|---------|-----------|-------|-----------|---------|
| Satisfaction Score | 4.0-5.0 | 3.0-3.9 | 2.0-2.9 | <2.0 |
| NPS | >50 | 30-50 | 0-30 | <0 |
| Participation Rate | >80% | 60-80% | 40-60% | <40% |

### Paso 4: Análisis Cualitativo (P11-P13)

Agrupa respuestas abiertas por temas:

**Temas comunes**:
- Herramientas (IDE, CI/CD, debugging)
- Procesos (code review, meetings, planning)
- Documentación (falta de docs, docs desactualizados)
- Carga de trabajo (burnout, tareas repetitivas)

**Script de Agrupación Automática**:

```python
#!/usr/bin/env python3
from collections import Counter
import re

# Respuestas abiertas de P11-P13
open_responses = [
    "Los builds de CI son muy lentos",
    "Falta documentación de arquitectura",
    "Demasiado tiempo en code review",
    "El debugging en Flutter es difícil",
    # ... más respuestas
]

# Keywords por tema
themes = {
    "Herramientas": ["IDE", "CI", "debugging", "build", "herramienta"],
    "Procesos": ["review", "meeting", "planning", "proceso", "ceremony"],
    "Documentación": ["doc", "documentación", "README", "guía"],
    "Carga": ["burnout", "cansado", "horas", "overtime", "estrés"]
}

# Clasificar respuestas
classified = {theme: [] for theme in themes}

for response in open_responses:
    response_lower = response.lower()
    for theme, keywords in themes.items():
        if any(kw in response_lower for kw in keywords):
            classified[theme].append(response)
            break

# Generar reporte
for theme, responses in classified.items():
    print(f"\n{theme}: {len(responses)} menciones")
    for r in responses[:3]:  # Top 3
        print(f"  - {r}")
```

### Paso 5: Análisis Avanzado - Correlaciones

Identificar qué factores impactan más la satisfacción general:

```python
#!/usr/bin/env python3
import pandas as pd
from scipy import stats

# Cargar datos (formato: cada fila = 1 developer)
data = pd.DataFrame({
    'P1_satisfaction': [4, 5, 3, 4, 3, 5],
    'P2_tools': [3, 4, 2, 4, 3, 5],
    'P3_autonomy': [4, 5, 3, 3, 2, 5],
    'P4_learning': [5, 5, 4, 4, 3, 5],
    'P5_workload': [3, 4, 2, 3, 3, 4],
    'P6_support': [4, 4, 3, 4, 3, 5],
    'P7_productivity': [4, 5, 3, 4, 2, 5],
    'P8_collaboration': [4, 4, 3, 4, 3, 5],
    'P9_balance': [3, 4, 2, 3, 3, 4],
})

# Calcular correlación con P1 (satisfacción general)
correlations = {}
for col in data.columns[1:]:  # Excluir P1
    r, p = stats.pearsonr(data['P1_satisfaction'], data[col])
    correlations[col] = {'r': r, 'p_value': p}

# Ordenar por correlación más fuerte
sorted_corr = sorted(correlations.items(), key=lambda x: abs(x[1]['r']), reverse=True)

print("Factores más correlacionados con satisfacción general:\n")
for col, vals in sorted_corr[:3]:
    print(f"{col}: r={vals['r']:.3f} (p={vals['p_value']:.3f})")
    if vals['p_value'] < 0.05:
        print("  ✅ Estadísticamente significativo")
    else:
        print("  ⚠️ No significativo (muestra pequeña)")
```

**Interpretación de resultados**:
- **r > 0.7**: Correlación fuerte positiva (mejorar este factor mejora satisfacción)
- **r = 0.3-0.7**: Correlación moderada
- **r < 0.3**: Correlación débil
- **p < 0.05**: Resultado estadísticamente significativo

**Ejemplo de output**:
```
Factores más correlacionados con satisfacción general:

P4_learning: r=0.912 (p=0.011)
  ✅ Estadísticamente significativo
  → Acción: Invertir en learning budget y time

P2_tools: r=0.867 (p=0.026)
  ✅ Estadísticamente significativo
  → Acción: Mejorar herramientas (IDE plugins, CI speed)

P7_productivity: r=0.805 (p=0.053)
  ⚠️ Borderline - considerar en análisis cualitativo
```

### Paso 6: Trend Tracking (Análisis Temporal)

Trackear evolución de satisfacción a lo largo de quarters:

```python
#!/usr/bin/env python3
import pandas as pd
import matplotlib.pyplot as plt

# Datos de 4 quarters
quarters = [
    {'quarter': 'Q1 2025', 'baseline': True, 'score': 3.2, 'nps': 15},
    {'quarter': 'Q2 2025', 'baseline': False, 'score': 3.8, 'nps': 32},
    {'quarter': 'Q3 2025', 'baseline': False, 'score': 4.1, 'nps': 45},
    {'quarter': 'Q4 2025', 'baseline': False, 'score': 4.3, 'nps': 52},
]

df = pd.DataFrame(quarters)

# Calcular mejora desde baseline
baseline_score = df[df['baseline']]['score'].values[0]
df['improvement'] = ((df['score'] - baseline_score) / baseline_score) * 100

print("Evolución de Satisfacción:\n")
print(df[['quarter', 'score', 'nps', 'improvement']])

# Detectar tendencia
if df['score'].is_monotonic_increasing:
    print("\n✅ Tendencia POSITIVA - Satisfacción aumentando consistentemente")
elif df['score'].iloc[-1] > df['score'].iloc[0]:
    print("\n↗️ Tendencia GENERAL POSITIVA con fluctuaciones")
else:
    print("\n⚠️ ALERTA - Satisfacción estancada o decreciendo")

# Calcular velocity de mejora
quarters_passed = len(df) - 1
total_improvement = df['improvement'].iloc[-1]
avg_improvement_per_quarter = total_improvement / quarters_passed

print(f"\nVelocity: +{avg_improvement_per_quarter:.1f}% por quarter")
print(f"Proyección Q1 2026: {df['score'].iloc[-1] * (1 + avg_improvement_per_quarter/100):.2f}")
```

**Output esperado**:
```
Evolución de Satisfacción:

   quarter  score  nps  improvement
0  Q1 2025    3.2   15          0.0
1  Q2 2025    3.8   32         18.8
2  Q3 2025    4.1   45         28.1
3  Q4 2025    4.3   52         34.4

✅ Tendencia POSITIVA - Satisfacción aumentando consistentemente

Velocity: +11.5% por quarter
Proyección Q1 2026: 4.79
```

### Paso 7: Análisis de Segmentos (Cohort Analysis)

Comparar satisfacción por grupos (seniority, tenure, etc.):

```python
#!/usr/bin/env python3
import pandas as pd

# Datos con metadata de developers
data = pd.DataFrame({
    'developer_id': [1, 2, 3, 4, 5, 6, 7, 8],
    'satisfaction_score': [4.2, 3.1, 4.8, 2.9, 4.5, 3.5, 4.1, 3.8],
    'seniority': ['Senior', 'Junior', 'Senior', 'Junior', 'Mid', 'Mid', 'Senior', 'Mid'],
    'tenure_months': [36, 6, 48, 3, 18, 12, 24, 15],
    'uses_copilot': [True, False, True, False, True, False, True, True],
})

# Análisis 1: Por Seniority
print("Satisfacción por Seniority:")
print(data.groupby('seniority')['satisfaction_score'].agg(['mean', 'count']))

# Análisis 2: Por Uso de IA
print("\nSatisfacción por Uso de GitHub Copilot:")
print(data.groupby('uses_copilot')['satisfaction_score'].agg(['mean', 'count']))

# Análisis 3: Por Tenure (nuevos vs veteranos)
data['tenure_group'] = data['tenure_months'].apply(
    lambda x: 'Nuevo (<6m)' if x < 6 else 'Veterano (>6m)'
)
print("\nSatisfacción por Tenure:")
print(data.groupby('tenure_group')['satisfaction_score'].agg(['mean', 'count']))
```

**Output esperado**:
```
Satisfacción por Seniority:
           mean  count
seniority
Junior     3.00      2
Mid        3.80      3
Senior     4.37      3

→ Insight: Seniors más satisfechos (posible: mejores herramientas, autonomía)

Satisfacción por Uso de GitHub Copilot:
               mean  count
uses_copilot
False          3.17      3
True           4.40      5

→ Insight: +39% satisfacción con IA - confirma hipótesis del framework

Satisfacción por Tenure:
                  mean  count
tenure_group
Nuevo (<6m)       2.90      1
Veterano (>6m)    4.06      7

→ Insight: Onboarding afecta satisfacción - revisar proceso
```

### Paso 8: Control Variables (Preguntas P14-P16)

Usar preguntas de control para validar que mejoras no se deben a factores externos:

```python
# P14: ¿Cambió tu salario en últimos 3 meses? (Sí/No)
# P15: ¿Cambió tu rol/responsabilidades? (Sí/No)
# P16: ¿Hubo cambio de manager/líder? (Sí/No)

control_vars = pd.DataFrame({
    'developer_id': [1, 2, 3, 4, 5],
    'satisfaction_delta': [+1.2, +0.8, +1.5, +0.2, +1.1],  # Cambio vs baseline
    'salary_change': [False, False, False, True, False],
    'role_change': [False, False, True, False, False],
    'manager_change': [False, True, False, False, False],
})

# Filtrar developers sin cambios organizacionales
clean_sample = control_vars[
    (~control_vars['salary_change']) &
    (~control_vars['role_change']) &
    (~control_vars['manager_change'])
]

print(f"Mejora promedio (muestra limpia, n={len(clean_sample)}): +{clean_sample['satisfaction_delta'].mean():.2f}")
print(f"Mejora promedio (todos, n={len(control_vars)}): +{control_vars['satisfaction_delta'].mean():.2f}")

if abs(clean_sample['satisfaction_delta'].mean() - control_vars['satisfaction_delta'].mean()) < 0.3:
    print("\n✅ Mejora NO afectada significativamente por cambios organizacionales")
else:
    print("\n⚠️ Considerar impacto de cambios organizacionales en resultados")
```

### Paso 9: Action Planning

Priorizar acciones basadas en análisis:

**Framework RICE** (Reach, Impact, Confidence, Effort):

| Acción | Reach (%) | Impact (1-5) | Confidence (%) | Effort (días) | Score RICE |
|--------|-----------|--------------|----------------|---------------|------------|
| Mejorar CI speed | 100 | 4 | 80 | 10 | 32.0 |
| Learning budget | 100 | 5 | 90 | 2 | 225.0 |
| Actualizar docs | 70 | 3 | 70 | 5 | 29.4 |
| Code review guidelines | 100 | 3 | 95 | 3 | 95.0 |

**Fórmula RICE**:
```
RICE Score = (Reach × Impact × Confidence) ÷ Effort
```

**Priorización**:
1. Learning budget (Score: 225) → **Quick win**
2. Code review guidelines (Score: 95) → **High impact, low effort**
3. Mejorar CI speed (Score: 32) → **Medium priority**
4. Actualizar docs (Score: 29.4) → **Lower priority**

### Paso 10: Tracking de Retención

Complementa encuestas con datos de HR:

```
Turnover Rate = (Developers que se fueron ÷ Total developers) × 100

Ejemplo:
- Equipo: 20 developers
- Se fueron en 2025: 5 developers
- Turnover = (5 ÷ 20) × 100 = 25%
```

---

## Frecuencia de Medición

- **Baseline**: Primera encuesta (Q1 2025)
- **Post-IA**: Re-encuestar después de 90 días de uso de IA (Q2 2025)
- **Ongoing**: Trimestral (Q1, Q2, Q3, Q4)

---

## Meta con IA

- **Satisfaction Score**: +1.0-1.5 puntos (de 3.5 a 5.0)
- **NPS**: +15-20 puntos
- **Turnover**: -7 puntos porcentuales (de 25% a 18%)

---

**Última Actualización**: 2025-11-13
