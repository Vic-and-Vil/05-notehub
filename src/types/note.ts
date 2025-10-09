export type NoteTag = 'home' | 'work' | 'personal' | 'study' | 'other';

export interface Note {
  id: string; // ✅ poprawione z _id
  title: string;
  content: string; // ✅ teraz obowiązkowe pole
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}
