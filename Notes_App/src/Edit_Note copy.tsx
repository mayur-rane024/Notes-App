import { NoteForm }  from "./Note_Form.tsx";
import type { NoteData , Tag } from "./App.tsx";
import { useNote } from "./NoteLayout.tsx";

type EditNoteProps = {
    onSubmit: (id: string , data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    };

export function EditNote({onSubmit , onAddTag ,availableTags}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1>Edit Note</h1>
      <NoteForm title={note.title} markdown = {note.markdown} tags={note.tags}  onSubmit={data => onSubmit(note.id , data)} availableTags = {availableTags} onAddTag={onAddTag} />
    </>
  );
}