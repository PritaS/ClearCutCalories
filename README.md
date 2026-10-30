# ClearCutCalories

Static browser calculators for energy needs, goal timelines, macros, BMI, protein and water. Preview with `python3 -m http.server 8000`. No server required.

## Current implementation assumptions
Energy uses Mifflin–St Jeor multiplied by an activity factor. Goal timelines use 3,500 kcal/lb or 7,700 kcal/kg with an intake floor; weight change is not biologically linear. Protein/carbs use 4 kcal/g and fat 9 kcal/g, rounded for display. BMI uses kg/m² and adult categories, not a diagnosis. Protein uses goal-specific g/kg ranges; water uses a 35 ml/kg baseline. These describe code, not independent clinical validation.

Run `node --test tests/calculations.test.cjs` for the original macro/BMI functions with a minimal DOM stub and category-boundary case. This is not every-calculator, full unit-switching or accessibility coverage. Generic estimates are not prescriptions for minors, pregnancy, eating disorders or conditions affecting hydration/metabolism. Seek qualified individualized advice.
