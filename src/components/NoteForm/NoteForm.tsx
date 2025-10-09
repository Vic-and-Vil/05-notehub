import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { Note } from '../../types/note';
import css from './NoteForm.module.css';
import type { NoteTag } from '../../types/note';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.string().required('Tag is required'),
});

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) =>
      createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tag: 'work',
    },
    validationSchema,
    onSubmit: values => {
      mutation.mutate({
  ...values,
  tag: values.tag as NoteTag,
});
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <input
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        placeholder="Title"
      />
      {formik.errors.title && <div>{formik.errors.title}</div>}

      <textarea
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
        placeholder="Content"
      />
      {formik.errors.content && <div>{formik.errors.content}</div>}

      <select
        name="tag"
        value={formik.values.tag}
        onChange={formik.handleChange}
      >
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
      </select>
      {formik.errors.tag && <div>{formik.errors.tag}</div>}

      <button type="submit">Create</button>
    </form>
  );
};

export default NoteForm;
