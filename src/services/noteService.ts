
import axios from 'axios';
import type { Note } from '../types/note';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string
): Promise<FetchNotesResponse> => {
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return data;
};

export const createNote = async (
  note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Note> => {
  const { data } = await api.post<Note>('/notes', note);
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
};
