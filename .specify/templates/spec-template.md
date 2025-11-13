# Especificación de Funcionalidad: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`
**Created**: [DATE]
**Status**: Draft
**Input**: User description: "$ARGUMENTS"

## Escenarios de Usuario y Pruebas *(obligatorio)*

<!--
  IMPORTANTE: Las historias de usuario deben estar PRIORIZADAS como recorridos de usuario ordenados por importancia.
  Cada historia/recorrido de usuario debe ser INDEPENDIENTEMENTE TESTEABLE - significa que si implementas solo UNA de ellas,
  aún deberías tener un MVP (Producto Mínimo Viable) viable que entregue valor.

  Asignar prioridades (P1, P2, P3, etc.) a cada historia, donde P1 es la más crítica.
  Pensar en cada historia como una porción independiente de funcionalidad que puede ser:
  - Desarrollada independientemente
  - Probada independientemente
  - Desplegada independientemente
  - Demostrada a usuarios independientemente
-->

### Historia de Usuario 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently - e.g., "Can be fully tested by [specific action] and delivers [specific value]"]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### Historia de Usuario 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### Historia de Usuario 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Independent Test**: [Describe how this can be tested independently]

**Acceptance Scenarios**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Casos Límite

<!--
  ACCIÓN REQUERIDA: El contenido en esta sección representa placeholders.
  Completarlos con los casos límite correctos.
-->

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requisitos *(obligatorio)*

<!--
  ACCIÓN REQUERIDA: El contenido en esta sección representa placeholders.
  Completarlos con los requisitos funcionales correctos.
-->

### Requisitos Funcionales

- **FR-001**: System MUST [specific capability, e.g., "allow users to create accounts"]
- **FR-002**: System MUST [specific capability, e.g., "validate email addresses"]
- **FR-003**: Users MUST be able to [key interaction, e.g., "reset their password"]
- **FR-004**: System MUST [data requirement, e.g., "persist user preferences"]
- **FR-005**: System MUST [behavior, e.g., "log all security events"]

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION: auth method not specified - email/password, SSO, OAuth?]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION: retention period not specified]

### Entidades Clave *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Criterios de Éxito *(obligatorio)*

<!--
  ACCIÓN REQUERIDA: Definir criterios de éxito medibles.
  Estos deben ser agnósticos de tecnología y medibles.
-->

### Resultados Medibles

- **SC-001**: [Measurable metric, e.g., "Users can complete account creation in under 2 minutes"]
- **SC-002**: [Measurable metric, e.g., "System handles 1000 concurrent users without degradation"]
- **SC-003**: [User satisfaction metric, e.g., "90% of users successfully complete primary task on first attempt"]
- **SC-004**: [Business metric, e.g., "Reduce support tickets related to [X] by 50%"]
