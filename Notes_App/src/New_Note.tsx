import { NoteForm }  from "./Note_Form.tsx";
import type { NoteData , Tag } from "./App";

type NewNoteProps = {
    onSubmit: (data: NoteData) => void;
    onAddTag: (tag: Tag) => void;
    availableTags: Tag[];
    };

export function NewNote({onSubmit , onAddTag ,availableTags}: NewNoteProps) {
  return (
    <>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} availableTags = {availableTags} onAddTag={onAddTag} />
    </>
  );
}