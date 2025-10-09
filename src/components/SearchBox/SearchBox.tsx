import React, { type ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  search: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, onChange }) => (
  <input
    className={css.input}
    type="text"
    placeholder="Search notes"
    value={search}
    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
  />
);

export default SearchBox;
