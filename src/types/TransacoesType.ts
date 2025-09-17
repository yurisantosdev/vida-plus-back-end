import { ContasType } from './ContasType';
import { CategoriasTransacoesType } from './CategoriasTransacoesType';
import { SubcategoriasTransacoesType } from './SubcategoriasTransacoesType';

export type TransacoesType = {
  tscodigo?: string;
  tstitulo: string;
  tsdescricao?: string;
  tsconta: string;
  tsvalor: number;
  tstipo: any;
  tsstatus?: any;
  tsquando: string;
  tscategoria?: string;
  tssubcategoria?: string;
  tsrecorrente?: boolean;
  tsfrequencia?: any;
  tsdataInicio?: string;
  tsdataFim?: string;
  tscomprovante?: string;
  tsnotas?: string;
  tsusuario: string;
  createdAt?: string;
  updatedAt?: string;
  conta?: ContasType;
  categoria?: CategoriasTransacoesType;
  subcategoria?: SubcategoriasTransacoesType;
};
