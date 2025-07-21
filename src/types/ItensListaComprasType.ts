import { ListaComprasType } from './ListaComprasType';

export type ItensListaComprasType = {
  itcodigo?: string;
  ittitulo: string;
  itlista: string;
  itquantidade: number;
  itcomprado: boolean;
  itvalor: number;
  createdAt?: string;
  updatedAt?: string;
  listaCompra?: ListaComprasType;
};
