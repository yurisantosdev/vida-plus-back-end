import { VeiculosType } from './VeiculosType';

export type AbastecimentosType = {
  abcodigo?: string;
  abvalortotal: number;
  ablitros: number;
  abvalorlitro: number;
  abveiculo: string;
  abhodometro: number;
  abquando: string;
  abusuario: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
};
