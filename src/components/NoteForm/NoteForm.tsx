import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  tag: Yup.mixed<NoteTag>().oneOf(['work', 'personal', 'other']).required(),
});

export default function NoteForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      formik.resetForm();
    },
  });

  const formik = useFormik<{
    title: string;
    content: string;
    tag: NoteTag;
  }>({
    initialValues: {
      title: '',
      content: '',
      tag: 'work', // wartość domyślna
    },
    validationSchema,
    onSubmit: values => {
      mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <option value="other">Other</option>
      </select>
      {formik.errors.tag && <div>{formik.errors.tag}</div>}

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
