import axios, { AxiosResponse } from 'axios';
import { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
const token = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export interface FetchNotesResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  data: Note[];
}

export const fetchNotes = async (
  page: number,
  perPage: number,
  search?: string
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await api.get('', {
    params: { page, perPage, search },
  });
  return response.data;
};

export const createNote = async (
  newNote: Omit<Note, 'id'>
): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.post('', newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data;
};
