import { useState } from 'react';
import { useNavigate } from 'react-router'; 
import { Stack, Title, TextInput, Card, Text, Grid, Badge, Group, ActionIcon, Divider } from '@mantine/core';
import { Search, FileText, Notebook, CheckSquare, GraduationCap, ArrowUpRight } from 'lucide-react';


interface NoteItem { id: string; title: string; category: 'Apunte'; date: string; link: string; }
interface FileItem { id: string; nombre: string; curso: string; tipo: string; category: 'Archivo'; link: string; }
interface CourseItem { id: string; nombre: string; codigo: string; profesor: string; category: 'Curso'; link: string; }
interface TaskItem { id: string; titulo: string; curso: string; fechaLimite: string; category: 'Tarea'; link: string; }

export const IntelligentSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); 


  const apuntesMock: NoteItem[] = [
    { id: '1', 
      title: 'Apuntes de Programación Web', 
      category: 'Apunte', 
      date: '30 May', 
      link: '/notes?id=1' 
    }, 
    
    { id: '2', 
      title: 'Resumen para Parcial - BD', 
      category: 'Apunte', 
      date: '28 May', 
      link: '/notes?id=2' 
    },

    { id: '3', 
      title: 'Fórmulas de Cálculo 2', 
      category: 'Apunte', 
      date: '25 May', 
      link: '/notes?id=3' 
    },

  ];

  const archivosMock: FileItem[] = [
    { id: '1', 
      nombre: 'Semana1_PW.pdf', 
      curso: 'Programación Web', 
      tipo: 'PDF', 
      category: 'Archivo', 
      link: '/files' 
    },

    { id: '2', 
      nombre: 'Practica1_BD.pdf', 
      curso: 'Base de Datos', 
      tipo: 'PDF', 
      category: 'Archivo', 
      link: '/files' 
    },
    
  ];

  const cursosMock: CourseItem[] = [
    { id: '1', 
      nombre: 'Programación Web', 
      codigo: 'IF-01', 
      profesor: 'Ing. Ramos', 
      category: 'Curso', 
      link: '/courses'
    },

    { id: '2', 
      nombre: 'Base de Datos', 
      codigo: 'IF-02', 
      profesor: 'Ing. Flores', 
      category: 'Curso', 
      link: '/courses' 
    },

  ];

  const tareasMock: TaskItem[] = [
    { id: '1', 
      titulo: 'Entrega final proyecto web', 
      curso: 'Programación Web', 
      fechaLimite: '2026-06-05', 
      category: 'Tarea', 
      link: '/tasks' 
    },

    { id: '2', 
      titulo: 'Practica laboratorio 3', 
      curso: 'Base de Datos', 
      fechaLimite: '2026-05-28', 
      category: 'Tarea', 
      link: '/tasks' 
    },
  ];


  const query = searchQuery.toLowerCase().trim();

  const apuntesFiltrados = apuntesMock.filter(item => item.title.toLowerCase().includes(query));
  const archivosFiltrados = archivosMock.filter(item => item.nombre.toLowerCase().includes(query) || item.curso.toLowerCase().includes(query));
  const cursosFiltrados = cursosMock.filter(item => item.nombre.toLowerCase().includes(query) || item.codigo.toLowerCase().includes(query));
  const tareasFiltradas = tareasMock.filter(item => item.titulo.toLowerCase().includes(query) || item.curso.toLowerCase().includes(query));

  const totalResultados = apuntesFiltrados.length + archivosFiltrados.length + cursosFiltrados.length + tareasFiltradas.length;

  return (
    <Stack p="xl" style={{ gap: '24px' }}>
      <div>
        <Title order={1} style={{ color: 'white' }} mb="xs">Búsqueda Global</Title>
        <Text size="sm" c="dimmed">Encuentra e ingresa instantáneamente a tus recursos académicos.</Text>
      </div>

      <TextInput
        placeholder="Escribe algo para buscar en archivos, apuntes, cursos o tareas..."
        size="lg"
        leftSection={<Search size={18} color="gray" />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        styles={{
          input: { backgroundColor: '#1A1B1E', borderColor: 'rgba(255, 255, 255, 0.1)', color: 'white', borderRadius: '12px' }
        }}
      />

      {searchQuery && (
        <Text size="sm" c="dimmed">
          Se encontraron {totalResultados} resultados para "{searchQuery}"
        </Text>
      )}

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="md" style={{ backgroundColor: '#1A1B1E', height: '100%' }}>
            <Group mb="xs">
              <Notebook size={18} color="#e8590c" />
              <Text fw={700} c="white">Apuntes ({apuntesFiltrados.length})</Text>
            </Group>
            <Divider mb="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <Stack style={{ gap: '10px' }}>
              {apuntesFiltrados.length > 0 ? apuntesFiltrados.map(item => (
                <Card 
                  key={item.id} 
                  withBorder 
                  p="xs" 
                  style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer' }} 
                  onClick={() => navigate(item.link)} 
                >
                  <Group style={{ justifyContent: 'space-between' }}>
                    <div>
                      <Text fw="bold" size="sm" c="white">{item.title}</Text>
                      <Text size="xs" c="dimmed">Modificado: {item.date}</Text>
                    </div>
                    <ActionIcon variant="subtle" color="orange">
                      <ArrowUpRight size={16} />
                    </ActionIcon>
                  </Group>
                </Card>
              )) : <Text size="xs" c="dimmed">No hay coincidencias.</Text>}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="md" style={{ backgroundColor: '#1A1B1E', height: '100%' }}>
            <Group mb="xs"><FileText size={18} color="#228be6" /><Text fw={700} c="white">Archivos ({archivosFiltrados.length})</Text></Group>
            <Divider mb="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <Stack style={{ gap: '10px' }}>
              {archivosFiltrados.length > 0 ? archivosFiltrados.map(item => (
                <Card key={item.id} withBorder p="xs" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => navigate(item.link)}>
                  <Group style={{ justifyContent: 'space-between' }}>
                    <div><Text fw="bold" size="sm" c="white">{item.nombre}</Text><Text size="xs" c="dimmed">{item.curso}</Text></div>
                    <ActionIcon variant="subtle" color="blue"><ArrowUpRight size={16} /></ActionIcon>
                  </Group>
                </Card>
              )) : <Text size="xs" c="dimmed">No hay coincidencias.</Text>}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="md" style={{ backgroundColor: '#1A1B1E', height: '100%' }}>
            <Group mb="xs"><GraduationCap size={18} color="#12b886" /><Text fw={700} c="white">Cursos ({cursosFiltrados.length})</Text></Group>
            <Divider mb="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <Stack style={{ gap: '10px' }}>
              {cursosFiltrados.length > 0 ? cursosFiltrados.map(item => (
                <Card key={item.id} withBorder p="xs" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => navigate(item.link)}>
                  <Group style={{ justifyContent: 'space-between' }}>
                    <div>
                      <Text fw="bold" size="sm" c="white">{item.nombre}</Text>
                      <Group gap="xs"><Badge size="xs" color="teal">{item.codigo}</Badge></Group>
                    </div>
                    <ActionIcon variant="subtle" color="teal"><ArrowUpRight size={16} /></ActionIcon>
                  </Group>
                </Card>
              )) : <Text size="xs" c="dimmed">No hay coincidencias.</Text>}
            </Stack>
          </Card>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="md" style={{ backgroundColor: '#1A1B1E', height: '100%' }}>
            <Group mb="xs"><CheckSquare size={18} color="#fab005" /><Text fw={700} c="white">Tareas ({tareasFiltradas.length})</Text></Group>
            <Divider mb="sm" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }} />
            <Stack style={{ gap: '10px' }}>
              {tareasFiltradas.length > 0 ? tareasFiltradas.map(item => (
                <Card key={item.id} withBorder p="xs" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', cursor: 'pointer' }} onClick={() => navigate(item.link)}>
                  <Group style={{ justifyContent: 'space-between' }}>
                    <div><Text fw="bold" size="sm" c="white">{item.titulo}</Text><Text size="xs" c="red">Vence: {item.fechaLimite}</Text></div>
                    <ActionIcon variant="subtle" color="yellow"><ArrowUpRight size={16} /></ActionIcon>
                  </Group>
                </Card>
              )) : <Text size="xs" c="dimmed">No hay coincidencias.</Text>}
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};

export default IntelligentSearchPage;