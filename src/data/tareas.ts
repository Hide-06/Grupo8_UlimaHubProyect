export type EstadoTarea = 'pendiente' | 'entregado' | 'atrasado';

export interface Tarea {
  id: number;
  titulo: string;
  curso: string;
  fecha: string;
  estado: EstadoTarea;
}

const CLAVE_LOCAL = 'ulimahub_tareas';

const tareasIniciales: Tarea[] = [
  {
    id: 1,
    titulo: 'Entrega final proyecto web',
    curso: 'Programación Web',
    fecha: '2026-06-10',
    estado: 'pendiente',
  },
  {
    id: 2,
    titulo: 'Practica laboratorio 3',
    curso: 'Base de Datos',
    fecha: '2026-05-28',
    estado: 'atrasado',
  },
  {
    id: 3,
    titulo: 'Trabajo grupal economia',
    curso: 'Economía',
    fecha: '2026-06-15',
    estado: 'pendiente',
  },
  {
    id: 4,
    titulo: 'Quiz semana 8',
    curso: 'Calculo 2',
    fecha: '2026-05-20',
    estado: 'entregado',
  },
  {
    id: 5,
    titulo: 'Informe de lectura',
    curso: 'Comunicación',
    fecha: '2026-05-25',
    estado: 'entregado',
  },
  {
    id: 6,
    titulo: 'Ejercicios cap 5',
    curso: 'Calculo 2',
    fecha: '2026-06-01',
    estado: 'pendiente',
  },
];

export function cargarTareas(): Tarea[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Tarea[];
  return tareasIniciales;
}

export function guardarTareas(tareas: Tarea[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(tareas));
}
