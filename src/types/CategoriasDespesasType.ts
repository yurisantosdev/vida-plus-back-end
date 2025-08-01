import { UsuarioType } from './UsuariosType';

export type CategoriasDespesasType = {
  cdvcodigo?: string;
  ctvcaetgoria: string;
  ctvusuario: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};

export type CategoriasDespesasEnum =
  | 'ESTACIONAMENTO'
  | 'MULTA'
  | 'LAVAGEM'
  | 'SEGURO'
  | 'OUTRO';
