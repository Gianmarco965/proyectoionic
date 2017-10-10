export class Inventario 
{

  constructor(
        public idproducto:number,
        public nombre:string,
        public descripcion:string,
        public imagen:string,
        public precio:number,
        public stock:number,
        public oferta:number,
        public idcategoria:number,
        public ficha_tecnica:number,
        public cantidad:number
        ) 
  { }
}