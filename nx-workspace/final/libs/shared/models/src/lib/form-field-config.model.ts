import { FormFieldType } from './form-field-types.enum';

export interface FormFieldConfig {
  fieldId: string;
  type: FormFieldType;
  label?: string;
  value?: string | boolean | number;
  options?: any[];
  disabled?: boolean;
  required?: boolean;
}
