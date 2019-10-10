import { ItemFactura } from "./itemFactura";
import { Cliente } from "./cliente";

export class Factura {
    id: number;
    descripcion: string;
    observaciono: string;
    itemFactura: Array<ItemFactura> = [];
    cliente: Cliente;
    totalFactura: number;
    createAt: string;
}
