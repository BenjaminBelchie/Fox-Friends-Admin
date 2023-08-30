import { Dispatch, SetStateAction, useState } from 'react';
import { Badge } from './ui/badge';

type Props = {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
};
export default function ProductTags({ tags, setTags }: Props) {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setTags(prevTags => prevTags.concat(tagInput));
      setTagInput('');
    }
  };

  return (
    <>
      {tags.length > 0 ? (
        <div className="flex gap-2">
          {tags.map(tag => (
            <Badge>{tag}</Badge>
          ))}
        </div>
      ) : (
        <></>
      )}
      <div>
        <label
          htmlFor="tag-input"
          className="mb-2 block text-sm font-medium text-gray-900">
          Tags
        </label>
        <div className="relative">
          <input
            type="text"
            id="tag-input"
            placeholder="Crochet, Animal"
            value={tagInput}
            onChange={e => {
              setTagInput(e.target.value);
            }}
            onKeyDown={handleAddTag}
            className={`w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900`}
          />
        </div>
      </div>
    </>
  );
}
