import { Card, Text, Title, Button, Badge, Grid, Divider } from '@mantine/core';
import { useNavigate } from 'react-router';
import { LogOut, Mail, BookOpen, GraduationCap } from 'lucide-react';
import styles from './User.module.css';

const CURSOS = [
  { nombre: 'Programación Web', creditos: 4, estado: 'activo' },
  { nombre: 'Base de Datos', creditos: 3, estado: 'activo' },
  { nombre: 'Calculo 2', creditos: 4, estado: 'activo' },
  { nombre: 'Economía', creditos: 3, estado: 'activo' },
  { nombre: 'Física', creditos: 4, estado: 'activo' },
];

const UserPage = () => {
  const navigate = useNavigate();

  // toma los datos del usuario logueado
  const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');

  const cerrarSesion = () => {
    sessionStorage.removeItem('usuario');
    navigate('/');
  };

  // saca las iniciales del nombre
  const iniciales = usuario.nombre
    ? usuario.nombre
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : '?';

  return (
    <div className={styles.contenedor}>
      <Title order={2} mb="xl">
        Mi Perfil
      </Title>

      {/* encabezado con avatar */}
      <Card withBorder radius="md" padding="xl" mb="lg">
        <div className={styles.encabezado}>
          <div className={styles.avatar}>{iniciales}</div>
          <div className={styles.info}>
            <Title order={3}>{usuario.nombre || 'Usuario'}</Title>
            <Text
              c="dimmed"
              size="sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <Mail size={14} /> {usuario.email || 'sin correo'}
            </Text>
            <Text
              size="sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <GraduationCap size={14} /> Ingeniería de Sistemas
            </Text>
            <Text
              size="sm"
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <BookOpen size={14} /> Ciclo 6
            </Text>
          </div>
        </div>

        <Divider mb="md" />

        <Button
          color="red"
          variant="light"
          leftSection={<LogOut size={16} />}
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </Button>
      </Card>

      {/* cursos matriculados */}
      <div className={styles.seccion}>
        <Title order={4} mb="md">
          Cursos matriculados
        </Title>
        <Grid>
          {CURSOS.map((curso, i) => (
            <Grid.Col key={i} span={{ base: 12, sm: 6 }}>
              <Card withBorder radius="md" padding="md">
                <Text fw={600} size="sm">
                  {curso.nombre}
                </Text>
                <Text size="xs" c="dimmed">
                  {curso.creditos} créditos
                </Text>
                <Badge color="green" size="sm" mt={6}>
                  {curso.estado}
                </Badge>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default UserPage;
