import { CategoriasDespesasEnum } from './CategoriasDespesasType';
import { UsuarioType } from './UsuariosType';
import { VeiculosType } from './VeiculosType';

export type DespesasType = {
  dpcodigo?: string;
  dpvalor: number;
  dpdescricao: string;
  dpcategoria: CategoriasDespesasEnum;
  dpveiculo: string;
  dpquando: string;
  dphodometro: number;
  dpusuario: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
  usuario?: UsuarioType;
};
