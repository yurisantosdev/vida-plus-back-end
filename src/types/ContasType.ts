import { TiposContasEnum } from '@prisma/client';

export type ContasType = {
  cocodigo: string;
  coconta: string;
  cousuario: string;
  cobanco: string;
  cotipoconta: TiposContasEnum;
  createdAt: string;
  updatedAt: string;
};
