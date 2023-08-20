import { Dispatch, SetStateAction } from 'react';

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  htmlId: string;
  showLabel: boolean;
  lableText: string;
  inputType: 'text' | 'password' | 'email' | 'number';
};

export default function TextField({
  value,
  setValue,
  htmlId,
  showLabel,
  lableText,
  inputType,
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
      <div>
        <input
          type={inputType}
          id={htmlId}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
