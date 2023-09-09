import { Path, UseFormRegister } from 'react-hook-form';
import { NewProductFormInputs } from '../Forms/NewProductForm';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  htmlId: string;
  showLabel: boolean;
  lableText: string;
  inputType: 'text' | 'password' | 'email' | 'number';
  icon?: JSX.Element;
  placeholder?: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export default function TextField({
  htmlId,
  showLabel,
  lableText,
  inputType,
  icon,
  placeholder,
  value,
  setValue,
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
          id={htmlId}
          placeholder={placeholder}
          className={`w-full rounded-lg border ${
            icon ? `pl-10` : ``
          } border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
          required
        />
      </div>
    </div>
  );
}
