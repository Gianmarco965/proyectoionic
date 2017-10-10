export class Pedido 
{

  constructor(
        public idpedido:number,
        public fecha:Date,
        public idusuario:number,
        public idestado:number,
        public nombre:string,
        public apellido:string,
        public usuario:string,
        public pedido:string,
        public cantcuota:number
        ) 
  { }
}