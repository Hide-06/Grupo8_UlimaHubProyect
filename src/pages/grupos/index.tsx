import { Badge, Button, Card, Grid, Text, Title, Group } from '@mantine/core';
import { Users, BookOpen, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Grupos.module.css';

const GRUPOS = [
  {
    id: 1,
    nombre: 'Grupo PW - Proyecto Final',
    curso: 'Programación Web',
    miembros: 5,
    maximo: 6,
    unido: true,
  },
  {
    id: 2,
    nombre: 'Estudio BD Parcial',
    curso: 'Base de Datos',
    miembros: 3,
    maximo: 5,
    unido: false,
  },
  {
    id: 3,
    nombre: 'Cálculo 2 - Práctica',
    curso: 'Calculo 2',
    miembros: 4,
    maximo: 4,
    unido: false,
  },
  {
    id: 4,
    nombre: 'Economía - Casos',
    curso: 'Economía',
    miembros: 2,
    maximo: 5,
    unido: true,
  },
  {
    id: 5,
    nombre: 'Física Lab - Grupo A',
    curso: 'Física',
    miembros: 3,
    maximo: 6,
    unido: false,
  },
  {
    id: 6,
    nombre: 'Repaso Final BD',
    curso: 'Base de Datos',
    miembros: 1,
    maximo: 5,
    unido: false,
  },
];

const GruposPage = () => {
  const [grupos, setGrupos] = useState(GRUPOS);
  const navigate = useNavigate();

  const manejarUnirse = (id: number) => {
    setGrupos((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, unido: true, miembros: g.miembros + 1 } : g
      )
    );
  };

  const irAlChat = (grupo: (typeof GRUPOS)[0]) => {
    sessionStorage.setItem('grupoActivo', JSON.stringify(grupo));
    navigate('/chat');
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <Title order={2}>Grupos de Estudio</Title>
        <Button>Crear grupo</Button>
      </div>

      <Grid>
        {grupos.map((grupo) => (
          <Grid.Col key={grupo.id} span={{ base: 12, sm: 6, md: 4 }}>
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              className={styles.tarjeta}
            >
              <Text fw={700} size="md">
                {grupo.nombre}
              </Text>

              <Group gap="xs">
                <BookOpen size={14} />
                <Text size="sm" c="dimmed">
                  {grupo.curso}
                </Text>
              </Group>

              <div className={styles.miembros}>
                <Users size={14} />
                <Text size="sm">
                  {grupo.miembros} / {grupo.maximo} miembros
                </Text>
                {grupo.miembros === grupo.maximo && (
                  <Badge color="red" size="sm">
                    Lleno
                  </Badge>
                )}
              </div>

              <div className={styles.tarjetaFooter}>
                {grupo.unido ? (
                  <>
                    <Badge color="green" size="sm" mt={4}>
                      Unido ✓
                    </Badge>
                    <Button
                      size="xs"
                      variant="light"
                      leftSection={<MessageCircle size={14} />}
                      fullWidth
                      onClick={() => irAlChat(grupo)}
                    >
                      Ir al chat
                    </Button>
                  </>
                ) : (
                  <Button
                    size="xs"
                    fullWidth
                    disabled={grupo.miembros === grupo.maximo}
                    onClick={() => manejarUnirse(grupo.id)}
                  >
                    {grupo.miembros === grupo.maximo ? 'Grupo lleno' : 'Unirse'}
                  </Button>
                )}
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default GruposPage;
