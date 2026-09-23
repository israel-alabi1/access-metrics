[![Node.js CI](https://github.com/israel-alabi1/access-metrics/actions/workflows/node.js.yml/badge.svg)](https://github.com/israel-alabi1/access-metrics/actions/workflows/node.js.yml)
# AccessMetrics


**An interactive prototype for accessible product experiences and simulated accessibility analytics.**

AccessMetrics explores how accessibility features can be incorporated into a modern web interface and connected to an analytics workflow. The project combines an accessible end-user experience with an interactive dashboard that demonstrates how accessibility-related metrics could be modeled and visualized.

> **Important:** The analytics in this project are simulated for demonstration purposes. They are not derived from real users, production telemetry, or an experimental study.

## Overview

AccessMetrics was developed as a front-end prototype to explore two connected questions:

1. How can accessibility preferences be integrated into a web application without disrupting the user experience?
2. How might accessibility-related adoption and outcome metrics be represented in an analytics dashboard?

The application provides an end-user accessibility demo alongside a dashboard containing transparent, configurable metric simulations.

## Key Features

### Accessible user experience

- High-contrast mode
- Simplified-layout mode
- Adjustable text size from 90% to 150%
- Browser-based text-to-speech
- Captions and transcript support
- Keyboard-accessible custom video controls
- Persistent accessibility preferences using `localStorage`

### Analytics dashboard

- Interactive simulated user-base calculations
- Configurable accessibility adoption assumptions
- Simulated conversion and retention changes
- Illustrative revenue attribution
- Accessibility-versus-standard-user comparison charts
- Explicit labeling of simulated rather than observed metrics

### Engineering

- React + TypeScript component architecture
- Reusable accessibility context
- Separation of simulation logic from presentation components
- Unit and component tests with Vitest and Testing Library
- ESLint validation
- Production build verification with Vite

## Simulation Methodology

The dashboard uses a small deterministic simulation rather than real behavioral data.

The current illustrative assumptions are defined centrally in:

```text
src/utils/MetricsSimulator.ts
```

| Parameter | Illustrative value |
|---|---:|
| Accessibility adoption rate | 22.0% |
| Simulated conversion uplift | 12.4% |
| Simulated retention uplift | 8.1% |
| Revenue per additional conversion | $85 |

For a given base user count, the simulator estimates the number of accessibility users and applies the configured assumptions to calculate illustrative conversion, retention, and revenue values.

These assumptions are intentionally transparent so that the calculations can be inspected, tested, and replaced with empirical data in a future implementation.

**The simulated outputs should not be interpreted as measured accessibility impact, causal effects, or evidence of return on investment.**

## Architecture

```text
src/
├── components/
│   ├── AccessibilityPanel.tsx
│   ├── ComparisonChart.tsx
│   ├── DashboardCards.tsx
│   ├── Navbar.tsx
│   ├── TextToSpeech.tsx
│   └── VideoPlayer.tsx
│
├── context/
│   ├── AccessibilityContext.tsx
│   └── accessibility-context.ts
│
├── pages/
│   ├── Dashboard.tsx
│   ├── EndUserDemo.tsx
│   ├── Landing.tsx
│   └── NotFound.tsx
│
├── test/
│   ├── AccessibilityContext.test.tsx
│   ├── MetricsSimulator.test.ts
│   └── setup.ts
│
└── utils/
    └── MetricsSimulator.ts
```

The architecture separates UI components, application state, pages, simulation logic, and tests. Accessibility state is exposed through a dedicated React context, while metric calculations remain independent of the dashboard presentation layer.

## Local Demo Media

The project includes an original synthetic demonstration video:

```text
public/media/accessibility-demo.mp4
public/media/accessibility-demo.en.vtt
```

The video was created specifically for this project and contains no third-party footage, music, logos, or recorded voices. The accompanying WebVTT file provides captions for the demo.

See [`public/media/README.md`](public/media/README.md) for the asset and rights information.

## Technology Stack

- **React 18** — user interface
- **TypeScript** — typed application development
- **Vite** — development and production tooling
- **React Router** — client-side routing
- **Tailwind CSS** — styling
- **Recharts** — data visualization
- **Framer Motion** — interface animation
- **Lucide React** — icons
- **Vitest + Testing Library** — testing
- **ESLint** — code quality

## Getting Started

### Requirements

- Node.js
- npm

### Installation

```bash
npm install
```

### Development server

```bash
npm run dev
```

### Run tests

```bash
npm test
```

### Run linting

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

## Testing

The project includes automated tests covering:

- Accessibility preference persistence and recovery
- Accessibility preference updates
- Non-persistent accessibility settings
- Metric simulation calculations
- Input validation and boundary handling
- Custom adoption-rate behavior

The current test suite contains **6 passing tests across 2 test files**.

## Development Notes

The initial interface was prototyped with Lovable and subsequently reviewed and refined as a standalone React/TypeScript project.

The resulting application is intentionally front-end focused. It does not currently include:

- A backend service
- User authentication
- A production analytics pipeline
- An external database
- Real user telemetry
- Empirically validated accessibility impact estimates

This distinction is important because the dashboard demonstrates an **analytics workflow**, rather than presenting simulated values as real-world measurements.

## Future Development

Potential extensions include:

- Event-ingestion APIs for real application telemetry
- Authenticated analytics
- Experiment-based measurement of accessibility interventions
- Empirical estimation of conversion and retention effects
- Causal inference designs for evaluating accessibility interventions
- Automated accessibility auditing
- Exportable analytics reports

These extensions would allow the prototype to move from deterministic demonstration toward an evidence-based accessibility analytics system.

## Project Status

**Portfolio prototype — functional front-end demonstration.**

The project is intended to demonstrate accessible interface design, interactive visualization, transparent metric modeling, and software-engineering practices in a React/TypeScript application.

## Author

**Israel Alabi**

Data Science / Machine Learning

[GitHub](https://github.com/israel-alabi1)
