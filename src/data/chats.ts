export interface Mensaje {
  id: number;
  autor: string;
  texto: string;
  hora: string;
  propio: boolean;
}

export interface Chat {
  id: number;
  nombre: string;
  tipo: 'grupo' | 'personal';
  mensajes: Mensaje[];
}

const CLAVE_LOCAL = 'ulimahub_chats';

const chatsIniciales: Chat[] = [
  {
    id: 1,
    nombre: 'Grupo PW - Proyecto Final',
    tipo: 'grupo',
    mensajes: [
      {
        id: 1,
        autor: 'Carlos',
        texto: '¿Ya terminaron la parte del login?',
        hora: '10:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'María',
        texto: 'Sí, ya lo subí al repo',
        hora: '10:05',
        propio: false,
      },
      {
        id: 3,
        autor: 'Yo',
        texto: 'Perfecto, ahora hago el dashboard',
        hora: '10:10',
        propio: true,
      },
    ],
  },
  {
    id: 2,
    nombre: 'Economía - Casos',
    tipo: 'grupo',
    mensajes: [
      {
        id: 1,
        autor: 'Luis',
        texto: '¿Cuándo nos reunimos para el caso?',
        hora: '09:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'Yo',
        texto: 'El jueves a las 5pm?',
        hora: '09:05',
        propio: true,
      },
      {
        id: 3,
        autor: 'Luis',
        texto: 'Dale, perfecto',
        hora: '09:10',
        propio: false,
      },
    ],
  },
  {
    id: 3,
    nombre: 'Carlos',
    tipo: 'personal',
    mensajes: [
      {
        id: 1,
        autor: 'Carlos',
        texto: '¿Me pasas los apuntes de BD?',
        hora: '08:00',
        propio: false,
      },
      {
        id: 2,
        autor: 'Yo',
        texto: 'Claro, te los mando ahora',
        hora: '08:05',
        propio: true,
      },
    ],
  },
];

export function cargarChats(): Chat[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Chat[];
  return chatsIniciales;
}

export function guardarChats(chats: Chat[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(chats));
}
