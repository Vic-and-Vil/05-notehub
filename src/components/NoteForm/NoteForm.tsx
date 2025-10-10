import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(), // ✅ opcjonalne
  tag: Yup.mixed<NoteTag>().oneOf(['work', 'personal', 'other']).required(),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: { title: '', content: '', tag: 'work' as NoteTag },
    validationSchema,
    onSubmit: (values) => mutation.mutate(values),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <input name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Title" />
      {formik.errors.title && <span>{formik.errors.title}</span>}

      <textarea name="content" value={formik.values.content} onChange={formik.handleChange} placeholder="Content" />
      {formik.errors.content && <span>{formik.errors.content}</span>}

      <select name="tag" value={formik.values.tag} onChange={formik.handleChange}>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
        <option value="other">Other</option>
      </select>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
