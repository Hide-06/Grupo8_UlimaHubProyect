export interface Usuario {
  nombre: string;
  email: string;
  password: string;
  ciclo: string;
}

const CLAVE_LOCAL = 'ulimahub_usuarios';

const usuariosIniciales: Usuario[] = [
  {
    email: 'usuario1@aloe.ulima.edu.pe',
    password: '1234',
    nombre: 'Carlos',
    ciclo: '6',
  },
  {
    email: 'usuario2@aloe.ulima.edu.pe',
    password: '5678',
    nombre: 'María',
    ciclo: '6',
  },
  {
    email: 'admin@aloe.ulima.edu.pe',
    password: 'admin',
    nombre: 'Administrador',
    ciclo: '6',
  },
];

export function cargarUsuarios(): Usuario[] {
  const guardado = localStorage.getItem(CLAVE_LOCAL);
  if (guardado) return JSON.parse(guardado) as Usuario[];
  return usuariosIniciales;
}

export function guardarUsuarios(usuarios: Usuario[]): void {
  localStorage.setItem(CLAVE_LOCAL, JSON.stringify(usuarios));
}
