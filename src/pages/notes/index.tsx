import { useState, useEffect } from 'react';
import {
  Grid,
  Stack,
  Title,
  Card,
  Text,
  Button,
  NavLink,
  ScrollArea,
  Divider,
  TextInput,
} from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import '@mantine/tiptap/styles.css';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface SidebarProps {
  notes: Note[];
  activeNoteId: string;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
}

const NotesSidebar = ({
  notes,
  activeNoteId,
  onSelectNote,
  onCreateNote,
}: SidebarProps) => (
  <Card
    withBorder
    radius="md"
    p="md"
    h="70vh"
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    <Button
      variant="filled"
      color="orange"
      fullWidth
      mb="md"
      onClick={onCreateNote}
    >
      + Nueva Nota
    </Button>

    <Divider mb="sm" />

    <ScrollArea style={{ flex: 1 }} type="hover">
      <Stack style={{ gap: '8px' }}>
        {notes.map((note) => (
          <NavLink
            key={note.id}
            label={note.title}
            description={`Editado: ${note.date}`}
            variant="filled"
            color="dark.4"
            active={note.id === activeNoteId}
            onClick={() => onSelectNote(note.id)}
            styles={{ root: { borderRadius: '8px' } }}
          />
        ))}
      </Stack>
    </ScrollArea>
  </Card>
);

interface ContentProps {
  activeNote: Note | undefined;
  onUpdateContent: (id: string, newContent: string) => void;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

const NotesContent = ({
  activeNote,
  onUpdateContent,
  onUpdateTitle,
}: ContentProps) => {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: activeNote ? activeNote.content : '',
    onUpdate({ editor }) {
      if (activeNote) {
        onUpdateContent(activeNote.id, editor.getHTML());
      }
    },
  });

  useEffect(() => {
    if (editor && activeNote) {
      if (editor.getHTML() !== activeNote.content) {
        editor.commands.setContent(activeNote.content);
      }
    }
  }, [activeNote?.id, editor]);

  return (
    <Card
      withBorder
      radius="md"
      p="xl"
      h="70vh"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {activeNote ? (
        <>
          <Stack style={{ gap: '4px' }} mb="lg">
            <TextInput
              value={activeNote.title}
              onChange={(event) =>
                onUpdateTitle(activeNote.id, event.currentTarget.value)
              }
              placeholder="Sin título"
              variant="unstyled"
              styles={{
                input: {
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'white',
                  padding: 0,
                  height: 'auto',
                },
              }}
            />
            <Text size="xs" c="dimmed">
              Última modificación: {activeNote.date}
            </Text>
          </Stack>

          <Divider mb="xl" />

          <RichTextEditor
            editor={editor}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <RichTextEditor.Toolbar>
              <RichTextEditor.ControlsGroup>
                <RichTextEditor.Bold />
                <RichTextEditor.Italic />
                <RichTextEditor.Strikethrough />
                <RichTextEditor.ClearFormatting />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.H1 />
                <RichTextEditor.H2 />
                <RichTextEditor.H3 />
              </RichTextEditor.ControlsGroup>

              <RichTextEditor.ControlsGroup>
                <RichTextEditor.BulletList />
                <RichTextEditor.OrderedList />
              </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <ScrollArea
              style={{ flex: 1, backgroundColor: '#1A1B1E', padding: '12px' }}
            >
              <RichTextEditor.Content />
            </ScrollArea>
          </RichTextEditor>
        </>
      ) : (
        <Stack align="center" justify="center" style={{ flex: 1 }}>
          <Text c="dimmed">
            Selecciona o crea una nota para empezar a escribir.
          </Text>
        </Stack>
      )}
    </Card>
  );
};

export const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Apuntes de Programación Web',
      content:
        '<p><strong>Conceptos clave:</strong> Usar componentes modulares.</p>',
      date: '30 May',
    },

    {
      id: '2',
      title: 'Resumen para Parcial - BD',
      content:
        '<h3>Temas a estudiar:</h3><ul><li>Queries SQL</li><li>Joins</li></ul>',
      date: '28 May',
    },

    {
      id: '3',
      title: 'Fórmulas de Cálculo 2',
      content: '<p>Integrales triples y coordenadas polares...</p>',
      date: '25 May',
    },
  ]);

  const [activeNoteId, setActiveNoteId] = useState<string>('1');
  const activeNote = notes.find((note) => note.id === activeNoteId);

  const handleUpdateNoteContent = (id: string, newContent: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, content: newContent } : note
      )
    );
  };

  const handleUpdateNoteTitle = (id: string, newTitle: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, title: newTitle } : note
      )
    );
  };

  const handleCreateNote = () => {
    const newNoteId = Date.now().toString();
    const newNote: Note = {
      id: newNoteId,
      title: `Nueva Nota Sin Título`,
      content: '',
      date: 'Hoy',
    };

    setNotes([newNote, ...notes]);
    setActiveNoteId(newNoteId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title order={2} mb="md">
        Apuntes
      </Title>

      <Grid style={{ gap: '16px' }}>
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <NotesSidebar
            notes={notes}
            activeNoteId={activeNoteId}
            onSelectNote={setActiveNoteId}
            onCreateNote={handleCreateNote}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 8, lg: 9 }} style={{ flex: 1 }}>
          <NotesContent
            activeNote={activeNote}
            onUpdateContent={handleUpdateNoteContent}
            onUpdateTitle={handleUpdateNoteTitle}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default NotesPage;
