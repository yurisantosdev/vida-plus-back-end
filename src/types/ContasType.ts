import { UsuarioType } from './UsuariosType';

export type ContasType = {
  ctcodigo?: string;
  ctconta: string;
  ctusuario: string;
  ctinstituicao?: string;
  ctsaldo?: number;
  ctsaldoInicial?: number;
  cttipoconta: any;
  ctstatus?: any;
  ctlimiteCredito?: number;
  ctdataVencimento?: string;
  ctobservacao?: string;
  ctcor?: string;
  ctativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
