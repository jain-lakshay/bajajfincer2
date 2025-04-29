import React from 'react';
import { FormSection as FormSectionType } from '../types/form';
import FormField from './FormField';

interface FormSectionProps {
  section: FormSectionType;
  formData: Record<string, string | string[]>;
  onChange: (fieldId: string, value: string | string[]) => void;
  errors: Record<string, string>;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  formData,
  onChange,
  errors,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-2">{section.title}</h2>
      <p className="text-gray-600 mb-6">{section.description}</p>
      
      <div className="space-y-6">
        {section.fields.map((field) => (
          <FormField
            key={field.fieldId}
            field={field}
            value={formData[field.fieldId] || (field.type === 'checkbox' ? [] : '')}
            onChange={(value) => onChange(field.fieldId, value)}
            error={errors[field.fieldId]}
          />
        ))}
      </div>
    </div>
  );
};

export default FormSection;