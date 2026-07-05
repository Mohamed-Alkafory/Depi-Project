import { useState, useCallback } from "react";

/**
 * Generic hook for any numeric input that needs validation.
 * - Lets the user type freely
 * - Validates on blur
 * - Exposes an error state ready to plug into a message component
 */
export function useValidatedField({ initialValue = "", validate, onValidChange }) {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(null);

    const handleChange = useCallback((newValue) => {
        setValue(newValue);
        if (error) setError(null);
    }, [error]);

    const handleBlur = useCallback(() => {
        const errorMessage = validate(value);

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setError(null);
        onValidChange?.(value);
    }, [value, validate, onValidChange]);

    const clearInvalidValue = useCallback(() => {
        setValue("");
        setError(null);
    }, []);

    return { value, error, onChange: handleChange, onBlur: handleBlur, clearInvalidValue };
}