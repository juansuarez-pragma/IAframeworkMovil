# Encuesta de Satisfacción del Developer - Equipo Flutter

**Versión**: 1.0.0
**Frecuencia**: Trimestral
**Tiempo estimado**: 5 minutos

---

## Instrucciones

Esta encuesta mide la satisfacción del equipo de desarrollo Flutter. Tus respuestas son **anónimas** y se usan solo para mejorar herramientas y procesos del equipo.

**Escala**: 1 (Muy Insatisfecho) a 5 (Muy Satisfecho)

---

## Sección 1: Herramientas de Desarrollo

**P1. ¿Qué tan satisfecho estás con las herramientas de desarrollo Flutter?**
(VS Code, Android Studio, DevTools, hot reload)

- [ ] 1 - Muy insatisfecho
- [ ] 2 - Insatisfecho
- [ ] 3 - Neutral
- [ ] 4 - Satisfecho
- [ ] 5 - Muy satisfecho

---

**P2. ¿Qué tan satisfecho estás con los tiempos de build?**
(Local y CI/CD)

- [ ] 1 - Muy insatisfecho (>20 min)
- [ ] 2 - Insatisfecho (15-20 min)
- [ ] 3 - Neutral (10-15 min)
- [ ] 4 - Satisfecho (5-10 min)
- [ ] 5 - Muy satisfecho (<5 min)

---

## Sección 2: Procesos del Equipo

**P3. ¿Qué tan satisfecho estás con el proceso de code review?**

- [ ] 1 - Muy insatisfecho
- [ ] 2 - Insatisfecho
- [ ] 3 - Neutral
- [ ] 4 - Satisfecho
- [ ] 5 - Muy satisfecho

---

**P4. ¿Qué tan satisfecho estás con la documentación disponible?**
(Oficial de Flutter + documentación del equipo)

- [ ] 1 - Muy insatisfecho
- [ ] 2 - Insatisfecho
- [ ] 3 - Neutral
- [ ] 4 - Satisfecho
- [ ] 5 - Muy satisfecho

---

## Sección 3: Carga de Trabajo

**P5. ¿Qué tan satisfecho estás con el balance entre trabajo productivo vs tareas repetitivas?**
(Boilerplate, setup, mantenimiento)

- [ ] 1 - Muy insatisfecho (>50% tiempo en boilerplate)
- [ ] 2 - Insatisfecho (30-50%)
- [ ] 3 - Neutral (20-30%)
- [ ] 4 - Satisfecho (10-20%)
- [ ] 5 - Muy satisfecho (<10%)

---

**P6. ¿Qué tan satisfecho estás con tu carga de trabajo actual?**
(Balance trabajo-vida, no burnout)

- [ ] 1 - Muy insatisfecho (burnout severo)
- [ ] 2 - Insatisfecho (burnout moderado)
- [ ] 3 - Neutral (ocasionalmente cansado)
- [ ] 4 - Satisfecho (balance saludable)
- [ ] 5 - Muy satisfecho (excelente balance)

---

## Sección 4: Desarrollo de Carrera

**P7. ¿Qué tan satisfecho estás con el proceso de onboarding para nuevos developers?**

- [ ] 1 - Muy insatisfecho
- [ ] 2 - Insatisfecho
- [ ] 3 - Neutral
- [ ] 4 - Satisfecho
- [ ] 5 - Muy satisfecho

---

**P8. ¿Qué tan satisfecho estás con la facilidad para debuggear issues de producción?**

- [ ] 1 - Muy insatisfecho (muy difícil)
- [ ] 2 - Insatisfecho (difícil)
- [ ] 3 - Neutral (moderado)
- [ ] 4 - Satisfecho (fácil)
- [ ] 5 - Muy satisfecho (muy fácil)

---

## Sección 5: Específico de Flutter

**P9. ¿Qué tan satisfecho estás con la experiencia de hot reload?**

- [ ] 1 - Muy insatisfecho (falla >50% del tiempo)
- [ ] 2 - Insatisfecho (falla 30-50%)
- [ ] 3 - Neutral (falla 20-30%)
- [ ] 4 - Satisfecho (falla <20%)
- [ ] 5 - Muy satisfecho (casi siempre funciona)

---

## Sección 6: NPS (Net Promoter Score)

**P10. ¿Qué tan probable es que recomiendes trabajar en este equipo Flutter a un amigo developer?**

- [ ] 0 - Nada probable
- [ ] 1
- [ ] 2
- [ ] 3
- [ ] 4
- [ ] 5
- [ ] 6
- [ ] 7
- [ ] 8
- [ ] 9
- [ ] 10 - Muy probable

---

## Preguntas Opcionales (Abiertas)

**P11. ¿Qué es lo que MÁS te gusta de trabajar con Flutter?**

[Respuesta abierta]

---

**P12. ¿Qué es lo que MENOS te gusta o te frustra más?**

[Respuesta abierta]

---

**P13. ¿Qué herramienta o proceso mejorarías primero?**

[Respuesta abierta]

---

## Cómo Analizar Resultados

### Satisfaction Score (Promedio P1-P9)

```
Score = (P1 + P2 + P3 + P4 + P5 + P6 + P7 + P8 + P9) ÷ 9

Ejemplo:
(4 + 3 + 4 + 3 + 3 + 4 + 4 + 3 + 4) ÷ 9 = 3.56 / 5.00 = 71.2%
```

**Interpretación**:
- **4.0-5.0 (80-100%)**: Excelente
- **3.0-3.9 (60-79%)**: Bueno
- **2.0-2.9 (40-59%)**: Problemático
- **<2.0 (<40%)**: Crítico

### NPS (Net Promoter Score)

```
Promoters (P10 = 9-10): 40%
Passives (P10 = 7-8):   35%
Detractors (P10 = 0-6): 25%

NPS = % Promoters - % Detractors
NPS = 40% - 25% = 15
```

**Interpretación**:
- **>50**: Excelente
- **30-50**: Bueno
- **0-30**: Mejorable
- **<0**: Crítico

---

**Gracias por tu tiempo!** 🙏
