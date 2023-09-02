import { Path, UseFormRegister } from 'react-hook-form';
import { NewProductFormInputs } from '../Forms/NewProductForm';

type Props = {
  htmlId: string;
  showLabel: boolean;
  lableText: string;
  inputType: 'text' | 'password' | 'email' | 'number';
  icon?: JSX.Element;
  placeholder?: string;
  inputSelector: Path<NewProductFormInputs>;
  register: UseFormRegister<NewProductFormInputs>;
};

export default function FormTextField({
  htmlId,
  showLabel,
  lableText,
  inputType,
  icon,
  placeholder,
  inputSelector,
  register,
}: Props) {
  return (
    <div>
      {showLabel && (
        <label
          htmlFor={htmlId}
          className="mb-2 block text-sm font-medium text-gray-900">
          {lableText}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
            {icon}
          </div>
        )}
        <input
          type={inputType}
          step={inputType === 'number' ? '0.01' : undefined}
          id={htmlId}
          placeholder={placeholder}
          className={`w-full rounded-lg border ${
            icon ? `pl-10` : ``
          } border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
          {...register(inputSelector)}
          required
        />
      </div>
    </div>
  );
}
