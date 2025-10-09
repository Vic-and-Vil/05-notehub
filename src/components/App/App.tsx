import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes, type FetchNotesResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal';
import NoteForm from '../NoteForm/NoteForm';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import css from './App.module.css';

const PER_PAGE = 12;

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes({ page, perPage: PER_PAGE, search: debouncedSearch }),
  });

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onChange={(value) => { setSearch(value); setPage(1); }} />
        <button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
        {data?.totalPages && data.totalPages > 1 && (
          <Pagination currentPage={page} totalPages={data.totalPages} onPageChange={setPage} />
        )}
      </header>

      {isLoading && <p>Loading...</p>}

      {data?.notes?.length ? <NoteList notes={data.notes} /> : <p>No notes found</p>}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
};

export default App;
