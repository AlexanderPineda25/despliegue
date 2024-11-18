export interface User {
    id: number; // ID del usuario
    username: string; // Nombre de usuario
    email: string; // Correo electrónico del usuario
    roles: Role[]; // Lista de roles asignados al usuario
  }

  export interface Role {
    id: number; // ID del rol
    name: string; // Nombre del rol (e.g., TEACHER, STUDENT)
  }