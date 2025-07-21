import { UrgenciasEnum } from '@prisma/client';

export type SubtarefasType = {
  stcodigo: string;
  sttarefa: string;
  sttitulo: string;
  stdescricao: string;
  sturgencia: UrgenciasEnum;
  stdateentrega: string;
  stfeito: boolean;
  createdAt: string;
  updatedAt: string;
};
