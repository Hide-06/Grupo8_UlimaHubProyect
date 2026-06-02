export interface Nota {
  id: string;
  title: string;
  content: string;
  date: string;
}

const CLAVE_LOCAL = 'ulimahub_notas';

const notasIniciales: Nota[] = [
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
];

export function cargarNotas(): Nota[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Nota[];
  return notasIniciales;
}

export function guardarNotas(notas: Nota[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(notas));
}
