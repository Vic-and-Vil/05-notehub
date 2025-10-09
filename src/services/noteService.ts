import axios from 'axios';
import type { Note, NoteTag } from '../types/note';

const API_URL = 'https://notehub-public.goit.study/api';
const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: API_URL,
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

export interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

// Pobranie listy notatek z paginacją i wyszukiwaniem
export async function fetchNotes(params: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '' } = params;
  const response = await api.get<FetchNotesResponse>('/notes', {
    params: { page, perPage, search },
  });
  return response.data;
}

// Tworzenie nowej notatki
export async function createNote(data: CreateNoteParams): Promise<Note> {
  const response = await api.post<Note>('/notes', data);
  return response.data;
}

// Usuwanie notatki
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
}
