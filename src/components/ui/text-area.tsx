import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  htmlId: string;
  showLabel: boolean;
  lableText: string;
  rows: number;
  placeholder?: string;
};

export default function TextArea({
  value,
  setValue,
  htmlId,
  showLabel,
  lableText,
  placeholder,
  rows,
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
        value={value}
        onChange={e => {
          setValue(e.target.value);
        }}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}
