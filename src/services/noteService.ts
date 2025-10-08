import axios, { type AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (params: FetchNotesParams = {}): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await axiosInstance.get('/notes', { params });
  return response.data;
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
  const response: AxiosResponse<Note> = await axiosInstance.post('/notes', note);
  return response.data;
};

// export const deleteNote = async (id: string): Promise<{ id: string }> => {
//   const response: AxiosResponse<{ id: string }> = await axiosInstance.delete(`/notes/${id}`);
//   return response.data;
// };
export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await api.delete(`/${id}`);
  return response.data; // teraz zwraca pełną notatkę
};

