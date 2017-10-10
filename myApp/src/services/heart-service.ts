import {Injectable} from '@angular/core';
import {Deseo} from '../services/deseo';

export class HeartService {
  
  objetoDeseo:Deseo[]=new Array();
  constructor() {
    
  }
setItemObjetoHeart(value:Deseo)
{
    this.objetoDeseo.push(value);
}
  setObjetoHeart(value) {
    this.objetoDeseo = value;
  }

  getObjetoHeart() {
    return this.objetoDeseo;
  }

}