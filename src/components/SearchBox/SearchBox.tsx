import { useDebounce } from 'use-debounce';
import { useEffect, useState } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: SearchBoxProps) {
  const [localValue, setLocalValue] = useState(value);
  const [debouncedValue] = useDebounce(localValue, 500);

  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
    />
  );
}

export default SearchBox;
