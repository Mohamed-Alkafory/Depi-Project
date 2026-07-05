import { PRICE_FIELD_LABELS } from "../constants/prices";

export function validatePositiveNumber(value, fieldLabel = "This field") {
    if (value === "" || value === null || value === undefined) {
        return `${fieldLabel} is required`;
    }

    const num = Number(value);

    if (Number.isNaN(num)) {
        return `${fieldLabel} must be a number`;
    }

    if (num <= 0) {
        return `${fieldLabel} must be greater than zero`;
    }

    return null;
}

export const FIELD_VALIDATORS = {
    length: (v) => validatePositiveNumber(v, "Length"),
    width: (v) => validatePositiveNumber(v, "Width"),
    floors: (v) => validatePositiveNumber(v, "Number of floors"),
    iron: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.iron),
    cement: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.cement),
    gravel: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.gravel),
    sand: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.sand),
    brick: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.brick),
    labor: (v) => validatePositiveNumber(v, PRICE_FIELD_LABELS.labor),
};