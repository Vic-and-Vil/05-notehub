export interface Note {
  id: string;
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
  createdAt: string;
  updatedAt: string; // dodane
}

export interface NoteTag {
  value: string;
  label: string;
}
