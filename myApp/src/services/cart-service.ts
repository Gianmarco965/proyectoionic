import {Injectable} from '@angular/core';
import {Inventario} from '../services/inventario';

export class CartService {
  
  objetocarrito:Inventario[]=new Array();
  constructor() {
    
  }
setItemObjetocarrito(value:Inventario)
{
    this.objetocarrito.push(value);
}
  setObjetoCarrito(value) {
    this.objetocarrito = value;
  }

  getObjetoCarrito() {
    return this.objetocarrito;
  }

}