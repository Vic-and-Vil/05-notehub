import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import NoteForm from '../NoteForm/NoteForm';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from '../utils/useDebounce';
import css from './App.module.css';

export default function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, debouncedQuery],
    queryFn: () => fetchNotes(page, 12, debouncedQuery),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading notes</p>;

  return (
    <div className={css.container}>
      <header className={css.header}>
        <h1>NoteHub</h1>
        <button onClick={() => setIsModalOpen(true)}>+ Create Note</button>
      </header>

      <SearchBox value={query} onChange={(val) => {
        setQuery(val);
        setPage(1); // reset przy wyszukiwaniu
      }} />

      {data?.notes.length ? (
        <>
          <NoteList notes={data.notes} />
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
