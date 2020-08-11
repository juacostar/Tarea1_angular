export class Producto{
  selected: boolean;
  public id: number;
  public votos = 0;
  constructor(public nombre: string, public descripcion: string){
  }


  isSelected(): boolean{
    return this.selected;
  }

  setSelected(v: boolean): void{
    this.selected = v;

  }

  voteUp(){
    this.votos++;
  }

  voteDown(){
    this.votos--;
  }

}
