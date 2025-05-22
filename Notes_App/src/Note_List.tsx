import { Col, Row, Stack, Form, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import type { Note, Tag } from "./App";
import { useMemo, useState } from "react";
import styles from "./NotesList.module.css";
import { Button } from "./components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

type SimplifiedNote = {
  id: string;
  title: string;
  tags: Tag[];
};
export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button
                variant="link"
                className="bg-amber-500 text-black hover:bg-amber-600"
              >
                Create
              </Button>
            </Link>
            <Button variant="custom">Edit Tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Link to={`/${id}`} className="text-reset text-decoration-none">
      <Card className={`h-full cursor-pointer ${styles.card}`}>
        <CardHeader className="text-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        </CardHeader>

        {tags.length > 0 && (
          
          <CardContent className="flex justify-center flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge className="text-truncate " key={tag.id}>
                {tag.label}
              </Badge>
            ))}
          </CardContent>
        )}
      </Card>
    </Link>
  );
}
