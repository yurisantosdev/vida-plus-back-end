import { UsuarioType } from './UsuariosType';

export type CodigosRecuperarSenhaType = {
  crscodigo?: string;
  crstoken: number;
  crsusuario: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
