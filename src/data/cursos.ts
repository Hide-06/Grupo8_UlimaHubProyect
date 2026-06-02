export interface Curso {
  id: number;
  nombre: string;
  profe: string;
  creditos: number;
  horario: string;
  ciclo: number;
}

export const cursos: Curso[] = [
  {
    id: 1,
    nombre: 'Programación Web',
    profe: 'Ing. Ramirez',
    creditos: 4,
    horario: 'Lun / Mie 10:00am',
    ciclo: 7,
  },
  {
    id: 2,
    nombre: 'Base de Datos',
    profe: 'Ing. Torres',
    creditos: 3,
    horario: 'Mar / Jue 8:00am',
    ciclo: 6,
  },
  {
    id: 3,
    nombre: 'Calculo 2',
    profe: 'Dr. Mendoza',
    creditos: 4,
    horario: 'Lun / Mie / Vie 7:00am',
    ciclo: 3,
  },
  {
    id: 4,
    nombre: 'Economía',
    profe: 'Lic. Flores',
    creditos: 3,
    horario: 'Mar / Jue 2:00pm',
    ciclo: 4,
  },
  {
    id: 5,
    nombre: 'Comunicación',
    profe: 'Lic. Vargas',
    creditos: 2,
    horario: 'Vie 10:00am',
    ciclo: 2,
  },
];
