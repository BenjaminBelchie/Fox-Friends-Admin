import { Path, UseFormRegister } from 'react-hook-form';
import { NewProductFormInputs } from '../Forms/NewProductForm';

type Props = {
  htmlId: string;
  showLabel: boolean;
  lableText: string;
  rows: number;
  placeholder?: string;
  inputSelector: Path<NewProductFormInputs>;
  register: UseFormRegister<NewProductFormInputs>;
};

export default function FormTextArea({
  htmlId,
  showLabel,
  lableText,
  placeholder,
  rows,
  inputSelector,
  register,
}: Props) {
  return (
    <div>
      {showLabel && (
        <label
          htmlFor={htmlId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          {lableText}
        </label>
      )}
      <textarea
        id={htmlId}
        rows={rows}
        {...register(inputSelector)}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
