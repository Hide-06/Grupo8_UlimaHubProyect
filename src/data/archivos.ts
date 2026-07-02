export interface Archivo {
  id: number;
  nombre: string;
  curso: string;
  fecha: string;
  tipo: string;
}

const CLAVE_LOCAL = 'ulimahub_archivos';

const archivosIniciales: Archivo[] = [
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

export function cargarArchivos(): Archivo[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Archivo[];
  return archivosIniciales;
}

export function guardarArchivos(archivos: Archivo[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(archivos));
}
