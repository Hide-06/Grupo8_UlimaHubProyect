import {
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Select,
  Text,
  Title,
} from '@mantine/core';
import { FileText, FileSpreadsheet, File } from 'lucide-react';
import { useState } from 'react';
import styles from './Archivos.module.css';

const ARCHIVOS = [
  {
    id: 1,
    nombre: 'Semana1_PW.pdf',
    curso: 'Programación Web',
    fecha: '2026-05-10',
    tipo: 'PDF',
  },
  {
    id: 2,
    nombre: 'Semana2_PW.pdf',
    curso: 'Programación Web',
    fecha: '2026-05-17',
    tipo: 'PDF',
  },
  {
    id: 3,
    nombre: 'Semana3_PW.pdf',
    curso: 'Programación Web',
    fecha: '2026-05-24',
    tipo: 'PDF',
  },
  {
    id: 4,
    nombre: 'Practica1_BD.pdf',
    curso: 'Base de Datos',
    fecha: '2026-05-08',
    tipo: 'PDF',
  },
  {
    id: 5,
    nombre: 'Practica2_BD.pdf',
    curso: 'Base de Datos',
    fecha: '2026-05-15',
    tipo: 'PDF',
  },
  {
    id: 6,
    nombre: 'Practica3_BD.pdf',
    curso: 'Base de Datos',
    fecha: '2026-05-22',
    tipo: 'PDF',
  },
  {
    id: 7,
    nombre: 'Diapositivas_Calculo.pptx',
    curso: 'Calculo 2',
    fecha: '2026-05-12',
    tipo: 'PPT',
  },
  {
    id: 8,
    nombre: 'Formulario_Calculo.pdf',
    curso: 'Calculo 2',
    fecha: '2026-05-19',
    tipo: 'PDF',
  },
  {
    id: 9,
    nombre: 'Resumen_Economia.pdf',
    curso: 'Economía',
    fecha: '2026-05-11',
    tipo: 'PDF',
  },
  {
    id: 10,
    nombre: 'Casos_Economia.docx',
    curso: 'Economía',
    fecha: '2026-05-18',
    tipo: 'Word',
  },
  {
    id: 11,
    nombre: 'Lab1_Fisica.pdf',
    curso: 'Física',
    fecha: '2026-05-09',
    tipo: 'PDF',
  },
  {
    id: 12,
    nombre: 'Lab2_Fisica.pdf',
    curso: 'Física',
    fecha: '2026-05-16',
    tipo: 'PDF',
  },
];

const cursos = ['Todos', ...new Set(ARCHIVOS.map((a) => a.curso))];

function colorPorTipo(tipo: string) {
  switch (tipo) {
    case 'PDF':
      return 'red';
    case 'PPT':
      return 'orange';
    case 'Word':
      return 'blue';
    default:
      return 'gray';
  }
}

function iconoPorTipo(tipo: string) {
  switch (tipo) {
    case 'PDF':
      return <FileText size={24} />;
    case 'PPT':
      return <FileSpreadsheet size={24} />;
    case 'Word':
      return <File size={24} />;
    default:
      return <File size={24} />;
  }
}

const ArchivosPage = () => {
  const [cursoSeleccionado, setCursoSeleccionado] = useState('Todos');

  const archivosFiltrados =
    cursoSeleccionado === 'Todos'
      ? ARCHIVOS
      : ARCHIVOS.filter((a) => a.curso === cursoSeleccionado);

  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <Title order={2}>Archivos de Cursos</Title>
        <Button>Subir Archivo</Button>
      </div>

      <div className={styles.filtros}>
        <Select
          label="Filtrar por curso"
          data={cursos}
          value={cursoSeleccionado}
          onChange={(valor) => setCursoSeleccionado(valor || 'Todos')}
          width={250}
        />
      </div>

      <Grid>
        {archivosFiltrados.map((archivo) => (
          <Grid.Col key={archivo.id} span={4}>
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              className={styles.tarjeta}
            >
              <div className={styles.icono}>{iconoPorTipo(archivo.tipo)}</div>

              <Text fw="bold" size="sm" lineClamp={2}>
                {archivo.nombre}
              </Text>

              <Group gap="xs">
                <Badge color={colorPorTipo(archivo.tipo)} size="sm">
                  {archivo.tipo}
                </Badge>
                <Text size="xs" color="dimmed">
                  {archivo.curso}
                </Text>
              </Group>
              <Group gap="xs">
                <Text size="xs" c="dimmed">
                  Fecha: {archivo.fecha}
                </Text>
              </Group>

              <div className={styles.tarjetaFooter}>
                <Button variant="light" size="xs" fullWidth>
                  Ver
                </Button>
                <Button size="xs" fullWidth>
                  Descargar
                </Button>
              </div>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default ArchivosPage;
