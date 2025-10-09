import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NoteTag } from '../../types/note';
import { createNote } from '../../services/noteService';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string().min(3).max(50).required('Title is required'),
  content: Yup.string().max(500, 'Max 500 characters').required('Content is required'),
  tag: Yup.mixed<NoteTag>().oneOf(['Todo','Work','Personal','Meeting','Shopping']).required(),
});

const NoteForm: React.FC<NoteFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      formik.resetForm();
      onClose();
    },
  });

  const formik = useFormik<CreateNoteParams>({
    initialValues: { title: '', content: '', tag: 'Todo' },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input id="title" name="title" value={formik.values.title} onChange={formik.handleChange} className={css.input}/>
        {formik.errors.title && <span className={css.error}>{formik.errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={8} value={formik.values.content} onChange={formik.handleChange} className={css.textarea}/>
        {formik.errors.content && <span className={css.error}>{formik.errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" name="tag" value={formik.values.tag} onChange={formik.handleChange} className={css.select}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {formik.errors.tag && <span className={css.error}>{formik.errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button type="button" className={css.cancelButton} onClick={onClose}>Cancel</button>
        <button type="submit" className={css.submitButton} disabled={mutation.isPending}>
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
