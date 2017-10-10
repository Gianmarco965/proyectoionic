export class DetallePedido 
{

  constructor(
        
        public idproducto:number,
        public producto:string,
        public cantidad:number,
        public precio:number,
        public imagen:string,
        public oferta:number,
        public total:number
        ) 
  { }
}