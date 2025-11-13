# Glosario de Términos

**Framework**: Observabilidad del Impacto de IA para Flutter
**Versión**: 1.0.0
**Última Actualización**: 2025-11-13

---

## Propósito

Este glosario define los términos clave usados en el Framework de Observabilidad del Impacto de IA. Está organizado en las siguientes categorías:

1. **Métricas y Frameworks** (DORA, SPACE)
2. **Conceptos Financieros** (ROI, NPV, Payback Period)
3. **Terminología Flutter** (AOT, JIT, Hot Reload, Widget)
4. **Herramientas de IA para Desarrollo** (GitHub Copilot, etc.)
5. **DevOps y CI/CD** (Pipeline, Deployment, etc.)
6. **Roles y Stakeholders** (CTO, CFO, Engineering Manager)

---

## 1. Métricas y Frameworks

### DORA (DevOps Research and Assessment)

**Definición**: Conjunto de métricas de rendimiento de ingeniería identificadas por el equipo de investigación DORA (ahora parte de Google Cloud) que correlacionan con el éxito organizacional.

**Las 4 Métricas DORA**:
1. **Lead Time** (Tiempo de Entrega)
2. **Deployment Frequency** (Frecuencia de Despliegue)
3. **Change Failure Rate** (Tasa de Fallos en Cambios)
4. **Mean Time to Restore** (MTTR - Tiempo Medio de Recuperación)

**Fuente**: DORA State of DevOps Report (annual publication)

**Relevancia para Flutter**: Las métricas DORA se adaptan para incluir tiempos de compilación multiplataforma y restricciones de tiendas de aplicaciones.

---

### Lead Time (Tiempo de Entrega)

**Definición**: Tiempo transcurrido desde que un developer hace commit de código hasta que ese código está en producción (disponible para usuarios finales).

**Fórmula**:
```
Lead Time = Fecha/Hora de Deploy a Producción - Fecha/Hora de Commit Inicial
```

**Adaptación para Flutter**:
- **Producción** = App aprobada y disponible en App Store (iOS) y Google Play (Android)
- Incluye tiempo de revisión de tiendas (no controlable por equipo)
- Típicamente separado en:
  - Tiempo Controlable: Commit → Build → Testing → Subir a tiendas (2-5 días)
  - Tiempo No Controlable: Revisión App Store (24-48h) + Play Store (2-8h)

**Baseline Típica Sin IA**: 10-14 días
**Target Con IA**: 6-9 días

---

### Deployment Frequency (Frecuencia de Despliegue)

**Definición**: Qué tan frecuentemente un equipo despliega código a producción.

**Unidades**: Deploys por semana, por mes, o por trimestre

**Adaptación para Flutter**:
- Limitada por políticas de tiendas de aplicaciones
- Frecuencia típica: Quincenal o mensual (vs diaria en desarrollo web)
- Balance entre rapidez y "review fatigue" de tiendas

**Baseline Típica Sin IA**: 1-2 releases por mes
**Target Con IA**: 2-4 releases por mes (con mayor confianza en calidad)

---

### Change Failure Rate (CFR - Tasa de Fallos en Cambios)

**Definición**: Porcentaje de deployments que causan fallos en producción y requieren hotfix, rollback, o parche urgente.

**Fórmula**:
```
CFR = (Deploys que causaron fallos ÷ Total de Deploys) × 100
```

**Adaptación para Flutter**:
- Medido típicamente como **Crash-Free Users %** (métrica de Firebase Crashlytics)
- Fórmula inversa: `Crash-Free Users % = 100% - (Usuarios con crashes ÷ Total usuarios activos)`
- **IMPORTANTE**: En móvil, un crash en producción es más crítico que en web (no hay rollback instantáneo)

**Baseline Típica Sin IA**: 98.5% crash-free users
**Target Con IA**: 99.2% crash-free users

---

### Mean Time to Restore (MTTR - Tiempo Medio de Recuperación)

**Definición**: Tiempo promedio para restaurar servicio después de un incidente en producción.

**Fórmula**:
```
MTTR = Suma de (Tiempo Restauración por Incidente) ÷ Número de Incidentes
```

**Adaptación para Flutter**:
- Incluye tiempo de fix + tiempo de re-build + tiempo de re-revisión en tiendas
- **Mínimo realista**: 24-48 horas (debido a revisión de App Store)
- Play Store puede ser más rápido (2-8 horas para hotfixes urgentes)

**Baseline Típica Sin IA**: 48-72 horas
**Target Con IA**: 24-36 horas (fix más rápido, pero tiendas siguen siendo cuello de botella)

---

### SPACE Framework

**Definición**: Marco multidimensional para medir productividad de developers desarrollado por GitHub, Microsoft, y University of Victoria.

**Acrónimo**:
- **S**atisfaction (Satisfacción)
- **P**erformance (Rendimiento)
- **A**ctivity (Actividad)
- **C**ommunication (Comunicación)
- **E**fficiency (Eficiencia)

**Fuente**: "The SPACE of Developer Productivity" (2021, ACM)

**Por Qué Usamos SPACE**: DORA solo cubre métricas de delivery; SPACE complementa con aspectos humanos (satisfacción, bienestar, colaboración).

---

### SPACE - Satisfaction (Satisfacción)

**Definición**: Qué tan felices y satisfechos están los developers con su trabajo, herramientas, y procesos.

**Cómo se Mide**:
- Encuestas trimestrales con escala Likert (1-5)
- Net Promoter Score (NPS): "¿Recomendarías trabajar aquí a un amigo?"
- Retención de talento (% de developers que permanecen >1 año)

**Indicadores Clave**:
- Satisfacción con herramientas (IDE, CI/CD, debugging tools)
- Sentimiento sobre carga de trabajo (no burnout)
- Percepción de impacto del trabajo

**Impacto de IA**: Herramientas como GitHub Copilot reducen tareas repetitivas tediosas, aumentando satisfacción.

---

### SPACE - Performance (Rendimiento)

**Definición**: Output del equipo en términos de valor entregado al negocio.

**Cómo se Mide**:
- Story points completados por sprint
- Throughput (features o user stories completadas por mes)
- Velocity (tendencia de story points a lo largo del tiempo)

**NO se mide con**:
- Líneas de código (LOC) - métrica inútil
- Número de commits - fácilmente manipulable

**Impacto de IA**: Aumenta velocity al acelerar implementación de features.

---

### SPACE - Activity (Actividad)

**Definición**: Acciones concretas y mensurables que realizan los developers (commits, code reviews, PRs).

**Métricas Clave**:
- Tiempo promedio de code review
- Tiempo de onboarding de nuevos developers (días hasta ser productivo)
- Número de contribuciones por developer

**Nota Importante**: Activity NO es lo mismo que productividad. Alta actividad no implica alto valor.

**Impacto de IA**: Reduce tiempo de onboarding al facilitar comprensión de código existente.

---

### SPACE - Communication (Comunicación)

**Definición**: Qué tan efectivamente el equipo se comunica, documenta, y comparte conocimiento.

**Cómo se Mide**:
- Cobertura de documentación (% de código con docstrings/comentarios)
- Calidad de documentación (manual, medido por encuestas)
- Revisión de diseño técnico antes de implementación

**Impacto de IA**: Herramientas de IA pueden generar documentación automática a partir de código.

---

### SPACE - Efficiency (Eficiencia)

**Definición**: Qué tan rápido el equipo puede completar tareas sin interrupciones o desperdicio.

**Métricas Clave**:
- Tiempo de build en CI/CD
- Tiempo gastado en boilerplate (código repetitivo sin valor de negocio)
- Handoff time (tiempo esperando a otros equipos/dependencias)

**Impacto de IA**: Genera boilerplate automáticamente (StatefulWidget, modelos JSON, tests básicos).

---

## 2. Conceptos Financieros

### ROI (Return on Investment - Retorno de Inversión)

**Definición**: Métrica financiera que mide el beneficio obtenido de una inversión relativo a su costo.

**Fórmula**:
```
ROI % = [(Beneficio - Costo de Inversión) ÷ Costo de Inversión] × 100
```

**Ejemplo**:
- Inversión en GitHub Copilot: $9,360/año (20 devs × $39/mes × 12 meses)
- Ahorro en productividad: $120,000/año
- ROI = [($120,000 - $9,360) ÷ $9,360] × 100 = **1,182%**

**Interpretación**:
- ROI > 0%: Inversión rentable
- ROI > 100%: Inversión altamente rentable
- ROI > 1000%: Inversión excepcional (típico para herramientas de IA)

---

### Payback Period (Período de Recuperación)

**Definición**: Cuánto tiempo toma recuperar la inversión inicial.

**Fórmula**:
```
Payback Period (días) = (Inversión Anual ÷ Ahorro Anual) × 365
```

**Ejemplo**:
- Inversión: $9,360/año
- Ahorro: $120,000/año
- Payback = ($9,360 ÷ $120,000) × 365 = **28.5 días**

**Interpretación**:
- Payback < 90 días: Inversión de "no-brainer" (obvio hacerla)
- Payback < 365 días: Excelente inversión
- Payback > 2 años: Requiere justificación adicional

---

### NPV (Net Present Value - Valor Presente Neto)

**Definición**: Valor actual de los flujos de caja futuros descontados a una tasa de descuento.

**Por Qué Importa**: Un dólar hoy vale más que un dólar en 3 años debido al costo de oportunidad del capital.

**Fórmula**:
```
NPV = Suma de [Flujo de Caja Año N ÷ (1 + Tasa de Descuento)^N] - Inversión Inicial
```

**Tasa de Descuento Típica**: 10% (standard corporativo)

**Ejemplo para Inversión en IA (3 años)**:
- Inversión inicial: $0 (solo suscripciones mensuales)
- Ahorro Año 1: $120,000 ÷ (1.10)^1 = $109,091
- Ahorro Año 2: $120,000 ÷ (1.10)^2 = $99,174
- Ahorro Año 3: $120,000 ÷ (1.10)^3 = $90,158
- **NPV Total**: $298,423

**Interpretación**:
- NPV > 0: Inversión crea valor
- NPV < 0: Inversión destruye valor

---

### Costo de Oportunidad (Opportunity Cost)

**Definición**: El valor de la mejor alternativa a la que se renuncia al tomar una decisión.

**Ejemplo en Contexto de IA**:
- Si NO invertimos en herramientas de IA, perdemos $120,000/año en mejoras de productividad
- Ese dinero se "gasta" en costos de ineficiencia (salarios pagando por trabajo más lento)
- **Costo de oportunidad = $120,000/año** (lo que dejamos de ganar)

**Uso en el Framework**: El concepto de "Costo de Inacción" usado en KPIs ejecutivos es esencialmente el costo de oportunidad de NO adoptar IA.

---

### Break-Even Point (Punto de Equilibrio)

**Definición**: El punto en el que los beneficios acumulados igualan la inversión acumulada.

**Ejemplo**:
- Inversión mensual: $780/mes (GitHub Copilot para 20 devs)
- Ahorro mensual: $10,000/mes
- Break-even = mes 1 (la inversión se recupera casi inmediatamente)

---

## 3. Terminología Flutter

### Flutter

**Definición**: Framework de UI de código abierto de Google para construir aplicaciones nativas para móvil, web, y escritorio desde una única base de código.

**Lenguaje**: Dart

**Ventajas para Móvil**:
- Una codebase para iOS y Android (vs mantener 2 codebases nativas)
- Hot reload para desarrollo rápido
- Rendimiento nativo (compilación AOT)

**Desafíos**:
- Tiempos de build más largos que desarrollo web (compilación para 2 plataformas)
- Fragmentación de dispositivos y versiones de OS
- Necesidad de conocer patterns específicos de Flutter (StatefulWidget, BLoC, etc.)

---

### Dart

**Definición**: Lenguaje de programación optimizado para UI desarrollado por Google, usado por Flutter.

**Características Clave**:
- Compilación AOT (para producción) y JIT (para desarrollo)
- Null safety (desde Dart 2.12)
- Asincronía robusta (async/await, Futures, Streams)

**Curva de Aprendizaje**: Moderada para developers con experiencia en JavaScript/TypeScript o Java/Kotlin.

---

### AOT (Ahead-of-Time Compilation)

**Definición**: Compilación del código Dart a código máquina nativo ANTES de ejecutar la app.

**Cuándo se Usa**: Builds de producción (release mode)

**Ventajas**:
- Máximo rendimiento (código nativo)
- App size más pequeño
- No requiere runtime de Dart en el dispositivo

**Desventaja**:
- Compilación lenta (10-20 minutos para iOS, 8-18 minutos para Android)

**Impacto en Métricas**: Los tiempos de build CI son significativamente mayores que en desarrollo web.

---

### JIT (Just-in-Time Compilation)

**Definición**: Compilación del código Dart a código máquina EN EL MOMENTO de ejecución.

**Cuándo se Usa**: Desarrollo local (debug mode)

**Ventajas**:
- Hot reload funcional (cambiar código sin recompilar toda la app)
- Builds más rápidos

**Desventaja**:
- Rendimiento menor que AOT

---

### Hot Reload

**Definición**: Capacidad de Flutter de inyectar cambios de código en una app corriendo sin reiniciarla.

**Tiempo Típico**: <1 segundo para cambios de UI

**Limitación**: No funciona para cambios en:
- Lógica de inicialización de app
- Cambios en dependencias nativas
- Cambios en assets

**Impacto en Productividad**: Acelera desarrollo en ~30-40% comparado con recompilación completa.

---

### Widget

**Definición**: Bloque básico de construcción de UI en Flutter. Todo en Flutter es un widget.

**Tipos Principales**:
- **StatelessWidget**: Widget inmutable (no cambia estado)
- **StatefulWidget**: Widget con estado mutable (requiere ~30 líneas de boilerplate)

**Ejemplo de Boilerplate**:
```dart
class MyWidget extends StatefulWidget {
  @override
  _MyWidgetState createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyWidget> {
  // 20+ líneas de código repetitivo aquí
}
```

**Impacto de IA**: GitHub Copilot puede generar este boilerplate automáticamente.

---

### State Management

**Definición**: Cómo se maneja y comparte el estado (datos) entre widgets en una app Flutter.

**Enfoques Populares**:
- **setState**: Built-in, simple pero no escala
- **Provider**: Recomendado por Google para apps medianas
- **Bloc/Cubit**: Robusto para apps grandes
- **Riverpod**: Evolución de Provider
- **GetX**: Todo-en-uno (routing + state + dependency injection)

**Curva de Aprendizaje**: Alta (especialmente Bloc)

**Impacto de IA**: Herramientas de IA pueden generar implementaciones de state management siguiendo patrones del proyecto.

---

### Build Time (Tiempo de Compilación)

**Definición**: Tiempo que tarda el proceso de compilación de código Dart a artefactos ejecutables (APK para Android, IPA para iOS).

**Componentes**:
1. Compilación de código Dart → código nativo
2. Linking de librerías nativas
3. Empaquetado de assets (imágenes, fuentes, etc.)
4. Signing de la app

**Tiempos Típicos en CI**:
- Android (release): 8-18 minutos
- iOS (release): 10-20 minutos
- **Total multiplataforma**: ~15-25 minutos

**Comparación con Web**: Un build de React/Angular típicamente toma 1-3 minutos.

---

### Fragmentación de Dispositivos

**Definición**: La variedad de dispositivos, tamaños de pantalla, versiones de OS, y capacidades de hardware que una app móvil debe soportar.

**Desafíos**:
- **Android**: Miles de dispositivos (Samsung, Google, Xiaomi, etc.) con 8+ versiones activas de Android
- **iOS**: ~10 modelos de iPhone activos + iPads con diferentes tamaños

**Impacto en Testing**: Necesidad de testing manual o automatizado en múltiples devices.

**Herramientas**: Firebase Test Lab, BrowserStack, Physical device farms

---

## 4. Herramientas de IA para Desarrollo

### GitHub Copilot

**Definición**: Asistente de código con IA desarrollado por GitHub y OpenAI que sugiere líneas o bloques de código mientras escribes.

**Costo**: $39/developer/mes (plan Business)

**Capacidades**:
- Autocompletado inteligente de código
- Generación de funciones completas a partir de comentarios
- Generación de tests unitarios
- Traducción entre lenguajes

**Impacto Típico**: 30-55% aumento en velocidad de completación de tareas (GitHub Impact Study, 2022)

---

### AI-Assisted Code Review

**Definición**: Herramientas que usan IA para revisar código automáticamente antes de revisión humana.

**Ejemplos**:
- **Amazon CodeGuru**: Detecta bugs, security issues, cost optimizations
- **DeepCode / Snyk Code**: Análisis estático con IA
- **GitHub Copilot for Pull Requests**: Genera descripciones de PRs automáticamente

**Impacto**: Reduce tiempo de code review humano en 20-30%.

---

### AI-Powered Documentation

**Definición**: Herramientas que generan documentación automáticamente a partir de código.

**Ejemplos**:
- Mintlify (genera docstrings)
- Swimm (mantiene docs sincronizados con código)
- Copilot Labs (explica código en lenguaje natural)

**Impacto**: Aumenta cobertura de documentación de 40% a 70-80%.

---

## 5. DevOps y CI/CD

### CI/CD (Continuous Integration / Continuous Delivery)

**Definición**:
- **CI**: Integrar cambios de código frecuentemente (varias veces al día) con builds y tests automatizados
- **CD**: Desplegar automáticamente código que pasa tests a producción

**Pipeline Típico Flutter**:
1. Developer hace push a branch
2. CI ejecuta: linter → tests → builds (Android + iOS)
3. Si pasa, genera artefactos (APK, IPA)
4. CD sube artefactos a tiendas (opcional: auto-release a beta testers)

**Herramientas Populares para Flutter**:
- **GitHub Actions**
- **Bitrise** (especializado en móvil)
- **Codemagic** (especializado en Flutter)
- **GitLab CI**
- **CircleCI**

---

### Deployment (Despliegue)

**Definición**: Proceso de hacer una nueva versión de la app disponible a usuarios finales.

**Proceso en Móvil**:
1. Build de release firmado
2. Subir a App Store Connect (iOS) / Google Play Console (Android)
3. Llenar metadata (screenshots, descripción)
4. Submeter para revisión
5. **Esperar aprobación de tiendas** (cuello de botella principal)
6. Publicar cuando sea aprobado

**Diferencia con Web**: En web, deployment es instantáneo (push a servidor). En móvil, hay lag de 24-48h mínimo.

---

### Crash-Free Users (Usuarios Sin Crashes)

**Definición**: Porcentaje de usuarios que NO experimentaron ningún crash en una versión específica de la app.

**Fórmula**:
```
Crash-Free Users % = 100% - (Usuarios con ≥1 crash ÷ Total usuarios activos) × 100
```

**Fuente de Datos**: Firebase Crashlytics, Sentry, Bugsnag

**Benchmark**:
- **Excelente**: >99.5%
- **Bueno**: 99.0-99.5%
- **Aceptable**: 98.0-99.0%
- **Problemático**: <98.0%

---

## 6. Roles y Stakeholders

### CTO (Chief Technology Officer)

**Definición**: Ejecutivo responsable de la estrategia tecnológica de la empresa.

**Preocupaciones Clave**:
- Time-to-market (qué tan rápido se entregan features)
- Escalabilidad del equipo de ingeniería
- Retención de talento técnico
- Calidad del producto

**Lenguaje**: Técnico pero también enfocado en negocio

**Cómo Usar Este Framework**: Revisar métricas DORA/SPACE para identificar cuellos de botella, construir business case para herramientas de IA.

---

### CFO (Chief Financial Officer)

**Definición**: Ejecutivo responsable de las finanzas de la empresa.

**Preocupaciones Clave**:
- ROI de inversiones
- Reducción de costos operativos
- Optimización de presupuesto de ingeniería

**Lenguaje**: Financiero (ROI, NPV, payback period, OpEx vs CapEx)

**Cómo Usar Este Framework**: Revisar Dashboard Ejecutivo con 5 KPIs, calculadora de ROI para justificar inversión en IA.

---

### Engineering Manager (EM)

**Definición**: Manager responsable de 1 o más equipos de desarrollo.

**Responsabilidades**:
- Velocity del equipo
- Salud y satisfacción del equipo
- Proceso de onboarding
- Coordinación de code reviews y releases

**Cómo Usar Este Framework**: Medir baseline de métricas SPACE (satisfacción, efficiency) para identificar mejoras, implementar herramientas de IA en equipo.

---

### Team Lead / Tech Lead

**Definición**: Developer senior con responsabilidades de liderazgo técnico en un equipo específico.

**Responsabilidades**:
- Arquitectura técnica
- Mentoría de developers junior
- Code review de cambios críticos
- Toma de decisiones técnicas (libraries, patterns)

**Cómo Usar Este Framework**: Ejecutar guías de medición (DORA, SPACE) para obtener datos que respalden propuestas técnicas.

---

### Product Manager (PM)

**Definición**: Responsable de definir QUÉ se construye (features, roadmap).

**Preocupaciones Clave**:
- Velocidad de entrega de features
- Calidad (bugs en producción)
- User feedback y satisfacción

**Cómo Usar Este Framework**: Entender cómo métricas de ingeniería impactan tiempo de entrega de features.

---

## 7. Términos Técnicos Adicionales

### Boilerplate Code (Código Repetitivo)

**Definición**: Código que debe ser escrito repetidamente con pocas variaciones para realizar tareas comunes.

**Ejemplos en Flutter**:
- Generación de StatefulWidget (~30 líneas estándar)
- Modelos de datos con JSON serialization
- Setup de tests unitarios

**Problema**: Consume tiempo sin agregar valor de negocio.

**Solución con IA**: GitHub Copilot genera boilerplate automáticamente.

---

### Code Review Time

**Definición**: Tiempo transcurrido desde que un Pull Request (PR) es creado hasta que es aprobado y mergeado.

**Componentes**:
- Tiempo esperando primera revisión (~hours a días)
- Tiempo de revisión efectiva (~15-30 min)
- Ciclos de feedback (cambios solicitados → correcciones → re-revisión)

**Baseline Típica Sin IA**: 24-48 horas
**Target Con IA**: 12-24 horas (AI code review pre-valida antes de revisión humana)

---

### Onboarding Time

**Definición**: Tiempo que tarda un nuevo developer en ser productivo al nivel de un miembro del equipo establecido.

**Hitos**:
- Día 1: Setup de entorno local
- Semana 1: Primer PR simple mergeado
- Mes 1: Trabajar independientemente en features pequeñas
- Mes 2-3: Productivo al 70-80% de un developer senior

**Baseline Típica Sin IA**: 42 días (6 semanas)
**Target Con IA**: 21 días (3 semanas)

---

## Referencias

1. **DORA Metrics**: "Accelerate: State of DevOps Report" (https://dora.dev)
2. **SPACE Framework**: "The SPACE of Developer Productivity" (ACM Queue, 2021)
3. **GitHub Copilot Impact**: "Research: quantifying GitHub Copilot's impact" (GitHub Blog, 2022)
4. **Flutter Documentation**: https://flutter.dev/docs
5. **Financial Metrics**: Standard corporate finance definitions (ROI, NPV, Payback Period)

---

**Última Actualización**: 2025-11-13
**Mantenido por**: [Tu Nombre/Organización]
