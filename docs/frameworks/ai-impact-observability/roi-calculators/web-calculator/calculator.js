// ============================================================================
// Calculadora ROI de IA para Flutter
// Framework: Observabilidad del Impacto de IA
// Version: 1.0.0
// ============================================================================

// Constants
const HOURS_PER_YEAR = 2080;
const MONTHS_PER_YEAR = 12;
const DAYS_PER_YEAR = 365;
const DISCOUNT_RATE = 0.10; // 10% tasa de descuento estándar
const HIRING_COST_MULTIPLIER = 1.2; // Salario + beneficios

// Baseline hours per developer per year (from measurement guides)
const BASELINE_HOURS = {
    boilerplate: 728,      // 35% of productive time
    onboarding: 168,       // Amortized per developer
    crashes: 120,          // 6% of time
    cycleTime: 83,         // 4% of time
    turnover: 108          // Amortized cost
};

// Chart instance (global for updates)
let roiChart = null;

// ============================================================================
// Input Validation
// ============================================================================

function validateInputs(teamSize, avgSalary, toolCost, reductions) {
    const errors = [];

    if (teamSize < 1 || teamSize > 100) {
        errors.push('Tamaño de equipo debe estar entre 1 y 100');
    }

    if (avgSalary < 50000 || avgSalary > 300000) {
        errors.push('Salario debe estar entre $50,000 y $300,000');
    }

    if (toolCost < 0 || toolCost > 100) {
        errors.push('Costo de herramienta debe estar entre $0 y $100');
    }

    Object.values(reductions).forEach((value, idx) => {
        if (value < 0 || value > 100) {
            errors.push(`Reducción ${idx + 1} debe estar entre 0% y 100%`);
        }
    });

    return errors;
}

// ============================================================================
// Core Calculation Functions (Formulas from formulas.md)
// ============================================================================

/**
 * Fórmula 1: Costo Anual de Inacción
 * Calcula cuánto cuesta NO adoptar IA
 */
function calculateCostOfInaction(teamSize, hourlyRate) {
    const costs = {};
    let total = 0;

    Object.entries(BASELINE_HOURS).forEach(([category, hours]) => {
        const cost = hours * hourlyRate * teamSize;
        costs[category] = cost;
        total += cost;
    });

    costs.total = total;
    return costs;
}

/**
 * Fórmula 2: Impacto de IA (Ahorros)
 * Calcula cuánto se ahorra con IA basado en % de reducción
 */
function calculateAISavings(costOfInaction, reductions) {
    const savings = {
        boilerplate: costOfInaction.boilerplate * (reductions.boilerplate / 100),
        onboarding: costOfInaction.onboarding * (reductions.onboarding / 100),
        crashes: costOfInaction.crashes * (reductions.crashes / 100),
        // Cycle time y turnover usan mejoras derivadas
        cycleTime: costOfInaction.cycleTime * (reductions.boilerplate * 0.67 / 100), // 40% cuando boilerplate es 60%
        turnover: costOfInaction.turnover * (reductions.boilerplate * 0.47 / 100)  // 28% cuando boilerplate es 60%
    };

    savings.total = Object.values(savings).reduce((sum, val) => sum + val, 0);
    return savings;
}

/**
 * Fórmula 3: ROI %
 * Retorno sobre inversión como porcentaje
 */
function calculateROI(savings, investment) {
    if (investment === 0) {
        return savings > 0 ? Infinity : 0;
    }
    return ((savings - investment) / investment) * 100;
}

/**
 * Fórmula 4: Payback Period
 * Días necesarios para recuperar inversión
 */
function calculatePayback(investment, savings) {
    if (savings === 0) {
        return Infinity;
    }
    return (investment / savings) * DAYS_PER_YEAR;
}

/**
 * Fórmula 5: NPV (Net Present Value)
 * Valor presente neto a 3 años
 */
function calculateNPV(annualCashFlow, years = 3) {
    let npv = 0;
    for (let year = 1; year <= years; year++) {
        npv += annualCashFlow / Math.pow(1 + DISCOUNT_RATE, year);
    }
    return npv;
}

// ============================================================================
// Main Calculation Pipeline
// ============================================================================

function calculateAllMetrics() {
    // Get inputs
    const teamSize = parseInt(document.getElementById('teamSize').value);
    const avgSalary = parseInt(document.getElementById('avgSalary').value);
    const toolCost = parseInt(document.getElementById('toolCost').value);

    const reductions = {
        boilerplate: parseInt(document.getElementById('boilerplateReduction').value),
        onboarding: parseInt(document.getElementById('onboardingReduction').value),
        crashes: parseInt(document.getElementById('crashReduction').value)
    };

    // Validate
    const errors = validateInputs(teamSize, avgSalary, toolCost, reductions);
    if (errors.length > 0) {
        console.error('Validation errors:', errors);
        return null;
    }

    // Calculate derived values
    const hourlyRate = avgSalary / HOURS_PER_YEAR;
    const annualInvestment = toolCost * MONTHS_PER_YEAR * teamSize;

    // Core calculations
    const costOfInaction = calculateCostOfInaction(teamSize, hourlyRate);
    const savings = calculateAISavings(costOfInaction, reductions);
    const roi = calculateROI(savings.total, annualInvestment);
    const payback = calculatePayback(annualInvestment, savings.total);
    const cashFlow = savings.total - annualInvestment;
    const npv = calculateNPV(cashFlow, 3);

    // Productivity metrics
    const hoursAhorradas = savings.total / hourlyRate;
    const fteEquivalent = hoursAhorradas / HOURS_PER_YEAR;

    return {
        teamSize,
        avgSalary,
        toolCost,
        reductions,
        hourlyRate,
        annualInvestment,
        costOfInaction,
        savings,
        roi,
        payback,
        npv,
        cashFlow,
        fteEquivalent
    };
}

// ============================================================================
// UI Update Functions
// ============================================================================

function formatCurrency(value) {
    if (value === Infinity) return '∞';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

function formatPercentage(value) {
    if (value === Infinity) return '∞';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value) + '%';
}

function formatNumber(value, decimals = 1) {
    if (value === Infinity) return '∞';
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(value);
}

function updateResults() {
    const results = calculateAllMetrics();
    if (!results) return;

    // Update main results
    document.getElementById('annualInvestment').textContent = formatCurrency(results.annualInvestment);
    document.getElementById('investmentDetail').textContent =
        `$${results.toolCost}/mes × ${results.teamSize} devs × 12 meses`;

    document.getElementById('annualSavings').textContent = formatCurrency(results.savings.total);
    document.getElementById('roiPercentage').textContent = formatPercentage(results.roi);
    document.getElementById('roiMultiple').textContent = `${formatNumber(results.roi / 100)}x retorno`;

    document.getElementById('paybackDays').textContent = formatNumber(results.payback) + ' días';
    document.getElementById('npv3Years').textContent = formatCurrency(results.npv);
    document.getElementById('costOfInaction').textContent = formatCurrency(results.costOfInaction.total);

    // Update breakdown table
    updateBreakdownTable(results);

    // Update sensitivity analysis
    updateSensitivityTable(results);

    // Update chart
    updateChart(results);

    // Update comparison section
    updateComparison(results);
}

function updateBreakdownTable(results) {
    const tbody = document.getElementById('breakdownTableBody');
    tbody.innerHTML = '';

    const categories = [
        { key: 'boilerplate', label: 'Boilerplate repetitivo', reduction: results.reductions.boilerplate },
        { key: 'onboarding', label: 'Onboarding lento', reduction: results.reductions.onboarding },
        { key: 'crashes', label: 'Debugging crashes', reduction: results.reductions.crashes },
        { key: 'cycleTime', label: 'Cycle time largo', reduction: Math.round(results.reductions.boilerplate * 0.67) },
        { key: 'turnover', label: 'Rotación de talento', reduction: Math.round(results.reductions.boilerplate * 0.47) }
    ];

    categories.forEach(cat => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${cat.label}</td>
            <td>${formatCurrency(results.costOfInaction[cat.key])}</td>
            <td>${cat.reduction}%</td>
            <td class="savings-cell">${formatCurrency(results.savings[cat.key])}</td>
        `;
    });

    document.getElementById('totalBaseline').textContent = formatCurrency(results.costOfInaction.total);
    document.getElementById('totalSavings').textContent = formatCurrency(results.savings.total);
}

function updateSensitivityTable(results) {
    const tbody = document.getElementById('sensitivityTableBody');
    tbody.innerHTML = '';

    const scenarios = [
        { name: 'Pesimista', multiplier: 0.25, className: '' },
        { name: 'Conservador', multiplier: 0.50, className: '' },
        { name: 'Moderado', multiplier: 0.75, className: '' },
        { name: 'Actual', multiplier: 1.0, className: 'highlight-row' },
        { name: 'Optimista', multiplier: 1.25, className: '' }
    ];

    scenarios.forEach(scenario => {
        const scaledSavings = results.savings.total * scenario.multiplier;
        const scaledROI = calculateROI(scaledSavings, results.annualInvestment);
        const scaledPayback = calculatePayback(results.annualInvestment, scaledSavings);

        const avgReduction = (
            results.reductions.boilerplate * scenario.multiplier +
            results.reductions.onboarding * scenario.multiplier +
            results.reductions.crashes * scenario.multiplier
        ) / 3;

        const row = tbody.insertRow();
        row.className = scenario.className;
        row.innerHTML = `
            <td><strong>${scenario.name}</strong></td>
            <td>${formatNumber(avgReduction, 0)}%</td>
            <td>${formatCurrency(scaledSavings)}</td>
            <td>${formatPercentage(scaledROI)}</td>
            <td>${formatNumber(scaledPayback)} días</td>
        `;
    });
}

function updateChart(results) {
    const ctx = document.getElementById('roiChart').getContext('2d');

    // Prepare data for 3-year projection
    const years = ['Año 1', 'Año 2', 'Año 3'];
    const investments = years.map(() => results.annualInvestment);
    const savings = years.map(() => results.savings.total);

    // Calculate cumulative NPV
    let cumulativeNPV = [];
    let cumulative = 0;
    for (let year = 1; year <= 3; year++) {
        cumulative += results.cashFlow / Math.pow(1 + DISCOUNT_RATE, year);
        cumulativeNPV.push(cumulative);
    }

    // Destroy existing chart if it exists
    if (roiChart) {
        roiChart.destroy();
    }

    roiChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [
                {
                    label: 'Inversión Anual',
                    data: investments,
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 2
                },
                {
                    label: 'Ahorros Anuales',
                    data: savings,
                    backgroundColor: 'rgba(34, 197, 94, 0.7)',
                    borderColor: 'rgb(34, 197, 94)',
                    borderWidth: 2
                },
                {
                    label: 'NPV Acumulado',
                    data: cumulativeNPV,
                    type: 'line',
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgb(59, 130, 246)',
                    borderWidth: 3,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Proyección de ROI a 3 Años',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatCurrency(context.parsed.y);
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'Inversión / Ahorros Anuales'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false
                    },
                    ticks: {
                        callback: function(value) {
                            return formatCurrency(value);
                        }
                    },
                    title: {
                        display: true,
                        text: 'NPV Acumulado'
                    }
                }
            }
        }
    });
}

function updateComparison(results) {
    document.getElementById('aiCost').textContent = formatCurrency(results.annualInvestment);
    document.getElementById('aiProductivity').textContent = formatNumber(results.fteEquivalent, 1) + ' FTE';
    document.getElementById('aiCostPerHour').textContent =
        formatCurrency(results.annualInvestment / (results.fteEquivalent * HOURS_PER_YEAR));

    const hiringCost = results.avgSalary * HIRING_COST_MULTIPLIER;
    document.getElementById('hireCost').textContent = formatCurrency(hiringCost);
    document.getElementById('hireCostPerHour').textContent =
        formatCurrency(hiringCost / HOURS_PER_YEAR);

    document.getElementById('productivityMultiple').textContent = formatNumber(results.fteEquivalent, 1) + 'x';

    const costRatio = results.annualInvestment / hiringCost;
    document.getElementById('costRatio').textContent = '1/' + formatNumber(1 / costRatio, 0);
}

// ============================================================================
// Export Functionality
// ============================================================================

function exportResults() {
    const results = calculateAllMetrics();
    if (!results) return;

    const timestamp = new Date().toISOString().split('T')[0];
    const report = `
========================================
CALCULADORA ROI DE IA PARA FLUTTER
Framework de Observabilidad del Impacto de IA
Generado: ${timestamp}
========================================

PARÁMETROS DE ENTRADA:
----------------------------------------
Tamaño del Equipo: ${results.teamSize} developers
Salario Promedio: ${formatCurrency(results.avgSalary)}/año
Costo Herramienta IA: $${results.toolCost}/dev/mes
Reducción Boilerplate: ${results.reductions.boilerplate}%
Reducción Onboarding: ${results.reductions.onboarding}%
Reducción Crashes: ${results.reductions.crashes}%

RESULTADOS FINANCIEROS:
----------------------------------------
Inversión Anual: ${formatCurrency(results.annualInvestment)}
Ahorros Anuales: ${formatCurrency(results.savings.total)}
ROI %: ${formatPercentage(results.roi)}
Payback Period: ${formatNumber(results.payback)} días
NPV (3 años, 10%): ${formatCurrency(results.npv)}
Costo de Inacción: ${formatCurrency(results.costOfInaction.total)}

DESGLOSE DE AHORROS:
----------------------------------------
Boilerplate repetitivo: ${formatCurrency(results.savings.boilerplate)}
Onboarding lento: ${formatCurrency(results.savings.onboarding)}
Debugging crashes: ${formatCurrency(results.savings.crashes)}
Cycle time: ${formatCurrency(results.savings.cycleTime)}
Rotación talento: ${formatCurrency(results.savings.turnover)}
----------------------------------------
TOTAL AHORROS: ${formatCurrency(results.savings.total)}

MÉTRICAS DE PRODUCTIVIDAD:
----------------------------------------
Horas Ahorradas/Año: ${formatNumber(results.savings.total / results.hourlyRate, 0)} horas
FTE Equivalente: ${formatNumber(results.fteEquivalent, 2)} developers
Costo/Hora (IA): ${formatCurrency(results.annualInvestment / (results.fteEquivalent * HOURS_PER_YEAR))}
Costo/Hora (Contratar): ${formatCurrency(results.avgSalary * HIRING_COST_MULTIPLIER / HOURS_PER_YEAR)}

ANÁLISIS DE SENSIBILIDAD:
----------------------------------------
Escenario Pesimista (25%): ROI ${formatPercentage(results.roi * 0.25)}, Payback ${formatNumber(results.payback * 4)} días
Escenario Conservador (50%): ROI ${formatPercentage(results.roi * 0.50)}, Payback ${formatNumber(results.payback * 2)} días
Escenario Base (100%): ROI ${formatPercentage(results.roi)}, Payback ${formatNumber(results.payback)} días
Escenario Optimista (125%): ROI ${formatPercentage(results.roi * 1.25)}, Payback ${formatNumber(results.payback * 0.8)} días

RECOMENDACIÓN:
----------------------------------------
${results.roi > 1000 ? '✅ APROBAR INMEDIATAMENTE - ROI excepcional' :
  results.roi > 500 ? '✅ RECOMENDADO - ROI excelente' :
  results.roi > 200 ? '✅ APROBAR - ROI muy bueno' :
  results.roi > 100 ? '⚠️ CONSIDERAR - ROI marginal' :
  '❌ NO RECOMENDADO - ROI bajo'}

========================================
DISCLAIMER:
Los resultados son proyecciones basadas en estudios
de la industria (GitHub Copilot Impact Study 2022,
Accenture 2023). Resultados reales pueden variar.
Se recomienda piloto de 90 días para validar.
========================================
`;

    // Create download
    const blob = new Blob([report], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `roi-ai-flutter-${timestamp}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// ============================================================================
// Event Listeners
// ============================================================================

function setupEventListeners() {
    // Update value displays when sliders change
    const sliders = [
        { id: 'teamSize', displayId: 'teamSizeValue', formatter: (v) => v },
        { id: 'avgSalary', displayId: 'avgSalaryValue', formatter: (v) => formatCurrency(v) },
        { id: 'toolCost', displayId: 'toolCostValue', formatter: (v) => '$' + v },
        { id: 'boilerplateReduction', displayId: 'boilerplateReductionValue', formatter: (v) => v + '%' },
        { id: 'onboardingReduction', displayId: 'onboardingReductionValue', formatter: (v) => v + '%' },
        { id: 'crashReduction', displayId: 'crashReductionValue', formatter: (v) => v + '%' }
    ];

    sliders.forEach(slider => {
        const element = document.getElementById(slider.id);
        const display = document.getElementById(slider.displayId);

        element.addEventListener('input', (e) => {
            display.textContent = slider.formatter(e.target.value);
            updateResults();
        });
    });

    // Tool presets
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const cost = btn.getAttribute('data-cost');
            document.getElementById('toolCost').value = cost;
            document.getElementById('toolCostValue').textContent = '$' + cost;
            updateResults();
        });
    });

    // Scenario presets
    document.querySelectorAll('.scenario-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const scenario = btn.getAttribute('data-scenario');
            let values;

            if (scenario === 'conservative') {
                values = { boilerplate: 30, onboarding: 25, crashes: 15 };
            } else if (scenario === 'base') {
                values = { boilerplate: 60, onboarding: 50, crashes: 30 };
            } else if (scenario === 'optimistic') {
                values = { boilerplate: 75, onboarding: 63, crashes: 38 };
            }

            Object.entries(values).forEach(([key, value]) => {
                const element = document.getElementById(key + 'Reduction');
                const display = document.getElementById(key + 'ReductionValue');
                element.value = value;
                display.textContent = value + '%';
            });

            updateResults();
        });
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', exportResults);
}

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    updateResults();
});
