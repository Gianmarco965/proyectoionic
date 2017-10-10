export class Deseo 
{
 public iddeseo:number;
        public idusuario:string;
        public idproducto:number;
        public nombreproducto:string;
        public imagenproducto:string;
        public idestado:string;
  constructor(
       
        idusuario:string,
        idproducto:number,
        idestado:string
        ) 
  { }


  setIdUsuario(value:string) {
    this.idusuario = value;
  }

  getIdUsuario() {
    return this.idusuario;
  }

  setIdProducto(value:number) {
    this.idproducto = value;
  }

  getIdProducto() {
    return this.idproducto;
  }

}