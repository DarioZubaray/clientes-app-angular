import { ItemFactura } from "./itemFactura";
import { Cliente } from "./cliente";

export class Factura {
    id: number;
    descripcion: string;
    observacion: string;
    itemFactura: Array<ItemFactura> = [];
    cliente: Cliente;
    totalFactura: number;
    createAt: string;

    public calcularGranTotal(): number {
      this.totalFactura = 0;
      this.itemFactura.forEach((item: ItemFactura) => {
        this.totalFactura += item.calcularImporte();
      });
      return this.totalFactura;
    }
}
