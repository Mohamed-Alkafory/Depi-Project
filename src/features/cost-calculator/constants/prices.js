// Default building material prices (EGP)
// Placeholder values until the admin page is built and connected to the database

export const DEFAULT_PRICES = {
    iron: 35000,   // per ton
    cement: 3000,  // per ton
    gravel: 220,   // per m3
    sand: 200,     // per m3
    brick: 1500,   // per 1000 bricks
    labor: 450,    // per m3 (carpentry, ironwork, casting)
};

// Field labels used for display and validation messages
export const PRICE_FIELD_LABELS = {
    iron: "Iron Price",
    cement: "Cement Price",
    gravel: "Gravel Price",
    sand: "Sand Price",
    brick: "Brick Price",
    labor: "Labor Price",
};

// Fixed cost, does not scale with area (per the spreadsheet)
export const ATTACHMENTS_COST = 100000;

// Reference area (m2) all ratio-based formulas are calculated against
export const AREA_BASE = 170;