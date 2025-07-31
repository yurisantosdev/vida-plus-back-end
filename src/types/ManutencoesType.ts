import { UsuarioType } from './UsuariosType';
import { VeiculosType } from './VeiculosType';

export type ManutencoesType = {
  mtcodigo?: string;
  mtveiculo: string;
  mttitle: string;
  mtdescricao: string;
  mtvalor: number;
  mtquando: string;
  mtusuario: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
  usuario?: UsuarioType;
};
