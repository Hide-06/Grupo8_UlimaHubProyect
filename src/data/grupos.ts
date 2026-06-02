export interface Grupo {
  id: number;
  nombre: string;
  curso: string;
  miembros: number;
  maximo: number;
  unido: boolean;
}

const CLAVE_LOCAL = 'ulimahub_grupos';

const gruposIniciales: Grupo[] = [
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

export function cargarGrupos(): Grupo[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Grupo[];
  return gruposIniciales;
}

export function guardarGrupos(grupos: Grupo[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(grupos));
}
