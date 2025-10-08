import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import css from './App.module.css';
import { useDebounce } from '../utils/useDebounce';

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  // ✅ Poprawione użycie useQuery z generykami i opcjami
  const { data, isLoading } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    keepPreviousData: true,
    placeholderData: {
      data: [],
      page: 1,
      perPage: 12,
      total: 0,
      totalPages: 1,
    },
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />

        {/* Paginacja tylko jeśli jest więcej niż 1 strona */}
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {/* Lista notatek */}
      {!isLoading && data?.data.length ? <NoteList notes={data.data} /> : null}

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
