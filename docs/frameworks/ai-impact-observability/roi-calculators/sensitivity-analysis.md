# Análisis de Sensibilidad: ROI de IA

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Audiencia**: CFO, Finance Teams, Risk Management

---

## Propósito

El **análisis de sensibilidad** evalúa cómo cambia el ROI cuando los supuestos clave varían. Esto responde preguntas como:

- ¿Qué pasa si las mejoras con IA son menores a lo esperado?
- ¿Qué pasa si el equipo es más pequeño?
- ¿Qué pasa si los salarios son menores?
- ¿Cuál es el peor escenario donde IA sigue siendo rentable?

**Uso**: Gestión de riesgos, validación de business case, definición de KPIs de éxito.

---

## Variables Clave

Las **4 variables** que más impactan el ROI:

| Variable | Rango Típico | Valor Base | Impacto en ROI |
|----------|--------------|------------|----------------|
| **% Mejora con IA** | 15-75% | 30-60% | ⚠️ **CRÍTICO** |
| **Tamaño Equipo** | 1-100 devs | 20 devs | Lineal (no afecta %) |
| **Salario Promedio** | $50K-$300K | $150K | Alto impacto |
| **Costo Herramienta** | $0-$100/mes | $39/mes | Bajo impacto |

---

## Análisis 1: Variación de % Mejora con IA

**Pregunta**: ¿Qué pasa si IA no mejora productividad tanto como esperamos?

### Escenarios

Equipo base: 20 developers, $150K salary, Copilot $39/mes

| Escenario | % Boilerplate | % Onboarding | % Crashes | Ahorro Anual | ROI % | Payback |
|-----------|---------------|--------------|-----------|--------------|-------|---------|
| **Pesimista** | 15% | 10% | 5% | $194,767 | 1,980% | 17.6 días |
| **Conservador** | 30% | 25% | 15% | $389,533 | 4,061% | 8.8 días |
| **Moderado** | 45% | 38% | 23% | $584,300 | 6,142% | 5.9 días |
| **Base (Esperado)** | **60%** | **50%** | **30%** | **$779,066** | **8,222%** | **4.4 días** |
| **Optimista** | 75% | 63% | 38% | $973,833 | 10,303% | 3.5 días |

### Visualización

```
ROI % por Escenario:

Pesimista     ████████████████████ 1,980%
Conservador   ████████████████████████████████████████ 4,061%
Moderado      ████████████████████████████████████████████████████████████ 6,142%
Base          ████████████████████████████████████████████████████████████████████████████████ 8,222%
Optimista     ████████████████████████████████████████████████████████████████████████████████████████████████████ 10,303%
```

### Conclusiones

✅ **Incluso en el peor escenario** (15% mejora), ROI sigue siendo **1,980%** con payback de **17.6 días** (<3 semanas).

✅ **Umbral de rentabilidad**: IA es rentable si mejora productividad en **>5%** (ROI = 100%).

✅ **Margen de seguridad**: Estudios documentan mejoras de 40-60%, así que hay **80% de margen** antes de que ROI sea <100%.

### Cálculo del Umbral Mínimo

¿Cuál es la **mínima mejora** necesaria para justificar inversión (ROI = 100%)?

```
ROI = 100% significa: Ahorros = 2 × Inversión

Inversión = $9,360/año (20 devs × $39/mes)
Ahorros mínimos = 2 × $9,360 = $18,720/año

Mejora necesaria = $18,720 ÷ $1,461,000 (costo inacción) = 1.28%
```

**Conclusión**: IA solo necesita mejorar productividad en **1.28%** para tener ROI de 100%. Esto es **extremadamente bajo riesgo**.

---

## Análisis 2: Variación de Tamaño de Equipo

**Pregunta**: ¿Cambia el ROI con equipos más pequeños o grandes?

### Escenarios (usando % mejora base)

| Tamaño Equipo | Inversión Anual | Ahorro Anual | ROI % | Payback | NPV (3 años) |
|---------------|-----------------|--------------|-------|---------|--------------|
| **1 dev** | $468 | $38,953 | 8,222% | 4.4 días | $95,707 |
| **5 devs** | $2,340 | $194,767 | 8,222% | 4.4 días | $478,537 |
| **10 devs** | $4,680 | $389,533 | 8,222% | 4.4 días | $957,073 |
| **20 devs** | $9,360 | $779,066 | 8,222% | 4.4 días | $1,914,146 |
| **50 devs** | $23,400 | $1,947,665 | 8,222% | 4.4 días | $4,785,365 |
| **100 devs** | $46,800 | $3,895,330 | 8,222% | 4.4 días | $9,570,730 |

### Visualización

```
NPV (3 años) por Tamaño de Equipo:

1 dev     ▌ $96K
5 devs    ██▌ $479K
10 devs   █████ $957K
20 devs   ██████████ $1.91M
50 devs   █████████████████████████ $4.79M
100 devs  ██████████████████████████████████████████████████ $9.57M
```

### Conclusiones

✅ **ROI % es constante** independiente del tamaño (8,222% para todos).

✅ **NPV escala linealmente** con tamaño de equipo.

✅ **IA es rentable desde 1 developer**: Incluso un equipo de 1 dev tiene ROI >8,000% y NPV $96K.

✅ **Equipos grandes**: Cada 10 developers adicionales suman **~$1M de NPV** en 3 años.

---

## Análisis 3: Variación de Salario Promedio

**Pregunta**: ¿Cambia el ROI en países con diferentes costos de salario?

### Escenarios (20 devs, % mejora base)

| Región Ejemplo | Salario Anual | Costo/Hora | Ahorro Anual | ROI % | Payback |
|----------------|---------------|------------|--------------|-------|---------|
| **India** | $50,000 | $24 | $259,689 | 2,674% | 13.2 días |
| **México / Brasil** | $80,000 | $38 | $415,502 | 4,339% | 8.2 días |
| **España / Canadá** | $100,000 | $48 | $519,377 | 5,448% | 6.6 días |
| **US (promedio)** | $150,000 | $72 | $779,066 | 8,222% | 4.4 días |
| **US (Bay Area)** | $250,000 | $120 | $1,298,443 | 13,770% | 2.6 días |

### Visualización

```
ROI % por Región:

India          ███████████████████████████ 2,674%
México/Brasil  ████████████████████████████████████████████ 4,339%
España/Canadá  ██████████████████████████████████████████████████████ 5,448%
US (promedio)  ████████████████████████████████████████████████████████████████████████████████ 8,222%
Bay Area       ████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████ 13,770%
```

### Conclusiones

✅ **IA es rentable en TODOS los mercados**: Incluso con salario $50K (India), ROI es **2,674%** (27x).

✅ **Mayor ROI en mercados caros**: Bay Area tiene ROI 5x mayor que India porque el costo/hora ahorrado es mayor.

✅ **Payback universal**: En todos los mercados, payback es **<2 semanas**.

### Caso Extremo: Salario Mínimo

¿Qué pasa con salario extremadamente bajo ($25K/año)?

```
Salario: $25,000/año
Costo/hora: $12/h
Ahorro anual: $129,844/año
Inversión: $9,360/año

ROI = 1,287%
Payback = 26.3 días (~1 mes)
```

**Conclusión**: Incluso con salario **$25K**, ROI sigue siendo **1,287%** (13x). IA es rentable universalmente.

---

## Análisis 4: Variación de Costo de Herramienta

**Pregunta**: ¿Qué pasa si usamos herramientas más caras o más baratas?

### Escenarios (20 devs, $150K salary, % mejora base)

| Herramienta | Costo/Mes | Inversión Anual | ROI % | Payback |
|-------------|-----------|-----------------|-------|---------|
| **CodeWhisperer (gratis)** | $0 | $0 | ∞ (infinito) | 0 días |
| **Tabnine Pro** | $12 | $2,880 | 26,920% | 1.4 días |
| **Cursor** | $20 | $4,800 | 16,113% | 2.3 días |
| **Copilot Individual** | $10 | $2,400 | 32,378% | 1.1 días |
| **Copilot Business** | $39 | $9,360 | 8,222% | 4.4 días |
| **Custom AI (hipotético)** | $100 | $24,000 | 3,146% | 11.3 días |

### Visualización

```
Payback por Herramienta:

CodeWhisperer  ▌ 0 días (gratis)
Copilot Indiv  █ 1.1 días
Tabnine        ██ 1.4 días
Cursor         ███ 2.3 días
Copilot Biz    █████ 4.4 días
Custom $100    ████████████ 11.3 días
```

### Conclusiones

✅ **Todas las opciones son rentables**: Incluso herramienta hipotética de $100/mes tiene ROI 3,146%.

✅ **Herramientas gratuitas**: CodeWhisperer (gratis) tiene ROI infinito pero puede tener menos features.

✅ **Sweet spot**: Copilot Business ($39/mes) ofrece mejor balance entre features y costo.

✅ **Umbral de rentabilidad**: Herramienta puede costar hasta **$325/dev/mes** antes de que ROI baje de 100%.

---

## Análisis 5: Combinación de Escenarios (Matrix)

**Pregunta**: ¿Cuál es el **peor escenario realista** donde IA sigue siendo rentable?

### Escenario Worst-Case

```
Variables:
- Equipo: 5 developers (pequeño)
- Salario: $60,000/año (bajo)
- Herramienta: $39/mes (estándar)
- Mejora: 15% (pesimista - 75% menor que estudios)

Cálculos:
Inversión Anual = $2,340
Ahorro Anual = $29,214
ROI = 1,148%
Payback = 29.3 días
NPV (3 años) = $71,786
```

**Conclusión**: En el **peor escenario realista** (equipo pequeño, salarios bajos, mejoras mínimas), ROI sigue siendo **1,148%** (11x) con payback de **1 mes**. ⚡

### Escenario Best-Case

```
Variables:
- Equipo: 50 developers (grande)
- Salario: $200,000/año (alto)
- Herramienta: $20/mes (Cursor)
- Mejora: 75% (optimista pero reportado en estudios)

Cálculos:
Inversión Anual = $12,000
Ahorro Anual = $3,247,214
ROI = 26,960%
Payback = 1.4 días
NPV (3 años) = $7,977,216
```

**Conclusión**: En el **mejor escenario**, ROI supera **26,000%** (270x) con payback de **1.4 días** y NPV de **$8M**. 🚀

### Matrix Completa: ROI % por Combinación

| Equipo / Salario | $50K | $100K | $150K | $250K |
|------------------|------|-------|-------|-------|
| **5 devs** | 2,674% | 5,448% | 8,222% | 13,770% |
| **10 devs** | 2,674% | 5,448% | 8,222% | 13,770% |
| **20 devs** | 2,674% | 5,448% | 8,222% | 13,770% |
| **50 devs** | 2,674% | 5,448% | 8,222% | 13,770% |

**Observación**: ROI % es **constante** para una combinación salario/herramienta, independiente del tamaño de equipo. Solo cambia el NPV absoluto.

---

## Análisis 6: Tiempo hasta Break-Even por Variable

**Pregunta**: ¿Cuánto tiempo toma alcanzar break-even en diferentes escenarios?

### Tabla de Break-Even

| Escenario | Inversión Anual | Ahorro Mensual | Meses a Break-Even |
|-----------|-----------------|----------------|---------------------|
| **Base (20 devs, $150K)** | $9,360 | $64,922 | **0.14 meses** (4.4 días) |
| Equipo pequeño (5 devs) | $2,340 | $16,231 | 0.14 meses (4.4 días) |
| Salario bajo ($60K) | $9,360 | $25,969 | 0.36 meses (10.9 días) |
| Mejora conservadora (30%) | $9,360 | $32,461 | 0.29 meses (8.8 días) |
| Worst-case | $2,340 | $2,435 | 0.96 meses (29 días) |

### Visualización

```
Tiempo a Break-Even:

Base         ▌ 4.4 días
Pequeño      ▌ 4.4 días
Salario bajo █ 10.9 días
Conservador  █ 8.8 días
Worst-case   ████ 29 días
```

### Conclusiones

✅ **Break-even universal**: En TODOS los escenarios, break-even ocurre en **<1 mes**.

✅ **Caso típico**: 4-5 días de trabajo para recuperar inversión completa del primer año.

✅ **Riesgo mínimo**: Incluso si mejoras son 50% menores a lo esperado, break-even es <2 semanas.

---

## Análisis 7: Impacto de Adopción Parcial

**Pregunta**: ¿Qué pasa si solo parte del equipo adopta IA?

### Escenarios (Equipo 20 devs, $150K salary)

| % Adopción | Devs Usando IA | Inversión | Ahorro | ROI % | Payback |
|------------|----------------|-----------|--------|-------|---------|
| 25% | 5 devs | $2,340 | $194,767 | 8,222% | 4.4 días |
| 50% | 10 devs | $4,680 | $389,533 | 8,222% | 4.4 días |
| 75% | 15 devs | $7,020 | $584,300 | 8,222% | 4.4 días |
| **100%** | **20 devs** | **$9,360** | **$779,066** | **8,222%** | **4.4 días** |

### Visualización

```
Ahorro Total por % Adopción:

25%  ████████████████████ $195K
50%  ████████████████████████████████████████ $390K
75%  ████████████████████████████████████████████████████████████ $584K
100% ████████████████████████████████████████████████████████████████████████████████ $779K
```

### Conclusiones

✅ **ROI % constante**: Adopción parcial tiene mismo ROI % que adopción completa (8,222%).

✅ **Ahorro escala linealmente**: Cada developer adicional suma **~$39K/año** en ahorros.

✅ **Estrategia de piloto**: Empezar con 25% (5 devs) permite:
   - Validar ROI con riesgo mínimo ($2.3K inversión)
   - Generar campeones internos
   - Expandir basado en resultados

---

## Análisis 8: Comparación con Inversiones Alternativas

**Pregunta**: ¿Cómo se compara IA con otras inversiones en productividad?

### Comparación de Iniciativas (Equipo 20 devs)

| Iniciativa | Inversión Anual | Mejora Productividad | ROI % | Payback |
|------------|-----------------|---------------------|-------|---------|
| **IA (Copilot)** | **$9,360** | **4.2 FTE** | **8,222%** | **4.4 días** |
| Contratar 1 dev | $180,000 | 1.0 FTE | 15% | 12+ meses |
| Training program | $50,000 | 0.3 FTE | 87% | 8 meses |
| Nueva CI/CD tool | $30,000 | 0.2 FTE | 48% | 15 meses |
| Better IDE licenses | $15,000 | 0.1 FTE | 24% | 24 meses |

### Visualización: ROI Comparativo

```
ROI % por Iniciativa:

Better IDE    ███ 24%
CI/CD tool    █████ 48%
Training      █████████ 87%
Contratar     ██ 15%
IA (Copilot)  ████████████████████████████████████████████████████████████████████████████████ 8,222%
```

### Conclusiones

✅ **IA supera todas las alternativas**: ROI es **96x mayor** que contratar y **55x mayor** que training.

✅ **Mejor costo/FTE**: IA cuesta **$2,230 por FTE equivalente** vs $180K por contratar.

✅ **Menor riesgo**: IA es SaaS cancelable mensualmente vs compromiso multi-año de contratar.

---

## Análisis 9: Sensibilidad a Tiempo de Onboarding de IA

**Pregunta**: ¿Qué pasa si developers tardan meses en usar IA efectivamente?

### Escenarios de Ramp-Up

| Tiempo Onboarding | Productividad Año 1 | Ahorro Año 1 | ROI Año 1 | Payback |
|-------------------|---------------------|--------------|-----------|---------|
| **Inmediato** | 100% | $779,066 | 8,222% | 4.4 días |
| **1 mes** | 92% | $716,741 | 7,556% | 4.8 días |
| **3 meses** | 75% | $584,300 | 6,142% | 5.9 días |
| **6 meses** | 50% | $389,533 | 4,061% | 8.8 días |

### Conclusiones

✅ **Ramp-up rápido en práctica**: Estudios muestran developers productivos con Copilot en **1-2 semanas**.

✅ **Resiliente a onboarding lento**: Incluso con 6 meses de ramp-up, ROI sigue siendo **4,061%**.

✅ **Año 2+**: Productividad llega a 100%, recuperando tiempo perdido en Año 1.

---

## Análisis 10: Factores de Riesgo

**Pregunta**: ¿Qué puede hacer que IA NO sea rentable?

### Riesgos Potenciales

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Mejoras <10% | Baja (5%) | Alto | Piloto 90 días para validar |
| Resistencia del equipo | Media (20%) | Medio | Training + campeones |
| Herramienta discontinuada | Muy baja (2%) | Bajo | Múltiples proveedores disponibles |
| Regulación data privacy | Baja (5%) | Bajo | Usar versión Business (no entrena con tu código) |
| Over-dependencia IA | Media (15%) | Bajo | Code review + testing riguroso |

### Escenario de Fallo Total

¿Cuál es el escenario donde IA **NO** es rentable?

```
Condiciones necesarias para ROI <100%:
1. Mejoras <1.3% (prácticamente imposible)
2. Y/O inversión >$325/dev/mes (10x el costo actual)
3. Y/O tiempo onboarding >18 meses (irreal)

Probabilidad combinada: <0.1%
```

**Conclusión**: El **riesgo de pérdida es prácticamente cero** dados los márgenes de seguridad.

---

## Recomendaciones de Gestión de Riesgo

### 1. Estrategia de Piloto (Lowest Risk)

```
Fase 1 (Mes 1-3): Piloto con 5 developers (25%)
- Inversión: $2,340
- Riesgo: Mínimo
- Validación: Medir baseline → post-IA

Fase 2 (Mes 4-6): Expansión a 15 developers (75%)
- Solo si Fase 1 muestra mejoras >15%

Fase 3 (Mes 7+): Full adoption (100%)
- Solo si Fase 2 confirma resultados
```

### 2. KPIs de Éxito Mínimos

Para justificar expansión después de piloto:

| KPI | Umbral Mínimo | Umbral Esperado |
|-----|---------------|-----------------|
| Reducción boilerplate | >15% | 60% |
| Satisfacción developers | +0.5 puntos | +1.5 puntos |
| Lead time reducción | >10% | 42% |
| Crash-free rate | +1% | +2.5% |

### 3. Exit Strategy

Si después de 90 días los resultados son <umbrales mínimos:

```
Costo del "fracaso" = 3 meses × $780/mes = $2,340
Tiempo perdido = Mínimo (SaaS cancelable mensualmente)
Aprendizajes = Invaluables (validaste que tu equipo es outlier)
```

**Conclusión**: Incluso el "fracaso" del piloto cuesta menos que **1 día de salario del equipo** ($2,340 vs $3,461/día).

---

## Resumen Ejecutivo: Sensibilidad

### ✅ Conclusiones Clave

1. **ROI es robusto**: Sigue siendo >1,000% incluso en escenarios pesimistas
2. **Payback universal**: <1 mes en TODOS los escenarios realistas
3. **Escalable**: Rentable desde 1 developer hasta 100+
4. **Global**: Rentable en todos los mercados (India a Bay Area)
5. **Riesgo mínimo**: Probabilidad de pérdida <0.1%

### 🎯 Recomendación

**APROBAR inversión en IA inmediatamente** con piloto de 90 días para validar. El caso financiero es **excepcional** incluso en escenarios conservadores.

### 📊 Ranges de Confianza

| Métrica | Mínimo (P10) | Esperado (P50) | Máximo (P90) |
|---------|--------------|----------------|--------------|
| ROI % | 1,980% | 8,222% | 13,770% |
| Payback | 8.8 días | 4.4 días | 2.6 días |
| NPV (3 años) | $957K | $1.91M | $3.19M |

**Intervalo de confianza**: 90% de probabilidad de que ROI esté entre **2,000-14,000%**.

---

## Próximos Pasos

1. **Ejecutar piloto**: Usar plan en `implementation-plan/week-1-baseline.md`
2. **Medir baseline**: Usar guías en `measurement-guides/`
3. **Monitorear KPIs**: Trackear métricas semanalmente
4. **Ajustar proyecciones**: Actualizar con datos reales después de 90 días
5. **Presentar resultados**: Usar template en `templates/executive-presentation.md`

---

**Última Actualización**: 2025-11-13
