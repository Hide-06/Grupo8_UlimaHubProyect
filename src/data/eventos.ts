export interface Evento {
  fecha: string;
  titulo: string;
  tipo: 'tarea' | 'examen';
}

const CLAVE_LOCAL = 'ulimahub_eventos';

const eventosIniciales: Evento[] = [
  { fecha: '2026-06-02', titulo: 'Entrega proyecto PW', tipo: 'tarea' },
  { fecha: '2026-06-05', titulo: 'Examen parcial BD', tipo: 'examen' },
  { fecha: '2026-06-10', titulo: 'Sustentacion grupal', tipo: 'tarea' },
  { fecha: '2026-06-12', titulo: 'Quiz Calculo', tipo: 'examen' },
  { fecha: '2026-06-18', titulo: 'Practica lab 4', tipo: 'tarea' },
  { fecha: '2026-06-25', titulo: 'Examen final Economia', tipo: 'examen' },
];

export function cargarEventos(): Evento[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Evento[];
  return eventosIniciales;
}

export function guardarEventos(eventos: Evento[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(eventos));
}
