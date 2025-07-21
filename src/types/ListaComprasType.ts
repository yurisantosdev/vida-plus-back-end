import { ItensListaComprasType } from './ItensListaComprasType';
import { UsuarioType } from './UsuariosType';

export type ListaComprasType = {
  lccodigo?: string;
  lctitulo: string;
  lcusuario: string;
  lcfinalizada: boolean;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
  itensListaCompras: Array<ItensListaComprasType>;
};
