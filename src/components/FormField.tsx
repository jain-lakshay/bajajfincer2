import React, { useState } from 'react';
import { FormField as FormFieldType } from '../types/form';

interface FormFieldProps {
  field: FormFieldType;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  const [localError, setLocalError] = useState<string | undefined>(undefined);

  const validateField = (value: string) => {
    if (field.type === 'email') {
      if (!value.includes('@') || !value.includes('.com')) {
        return 'Please enter a valid email address including @ and .com';
      }
    }
    if (field.fieldId === 'city') {
      if (value.trim().length < 2) {
        return 'City name must be at least 2 characters long';
      }
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const inputValue = e.target.value;

    const validationError = validateField(inputValue);
    setLocalError(validationError);

    if (field.type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const currentValues = Array.isArray(value) ? value : [];
      if (checkbox.checked) {
        onChange([...currentValues, checkbox.value]);
      } else {
        onChange(currentValues.filter(v => v !== checkbox.value));
      }
    } else {
      onChange(inputValue);
    }
  };

  const renderField = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            className={`input min-h-[100px] ${error || localError ? 'border-red-500' : ''}`}
            value={value as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            data-testid={field.dataTestId}
          />
        );
      case 'dropdown':
        return (
          <select
            className={`input ${error || localError ? 'border-red-500' : ''}`}
            value={value as string}
            onChange={handleChange}
            required={field.required}
            data-testid={field.dataTestId}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value} data-testid={option.dataTestId}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                  data-testid={option.dataTestId}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onChange={handleChange}
                  data-testid={option.dataTestId}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      default: {
        const allowedInputTypes = ['text', 'email', 'tel', 'date', 'number', 'password', 'url'];
        const inputType = allowedInputTypes.includes(field.type) ? field.type : 'text';

        return (
          <input
            type={inputType}
            className={`input ${error || localError ? 'border-red-500' : ''}`}
            value={value as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
            data-testid={field.dataTestId}
          />
        );
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="form-label">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderField()}
      {(error || localError) && (
        <p className="error-message mt-1 text-sm text-red-600">{localError || error}</p>
      )}
    </div>
  );
};

export default FormField;