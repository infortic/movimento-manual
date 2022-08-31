import { Component } from '@angular/core';
import { IMovimento } from './interfaces/IMovimento';
import { MovimentoManualService } from './movimento-manual.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Movimento } from './formulario/movimento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovimentoManual';
  formMovimento!: FormGroup;
  formAtivo: boolean = true;

  constructor(private movimentoManualService :MovimentoManualService)
  {}

  ngOnInit(){
    this.movimentoForm(new Movimento());
  }

  carregarGrid(){
    this.movimentoManualService.obterTodos()
    .then(movimento => console.log(movimento))
    .catch(error => console.error(error));
  }

  incluir(movimento: IMovimento){
    this.movimentoManualService.incluir(movimento)
    .then(movimento => console.log(movimento))
    .catch(error => console.error(error));
  }

  oberMovimentoPorMesAno(mes: number, ano: number){
    this.movimentoManualService.oberMovimentoPorMesAno(mes, ano)
    .then(movimento => console.log(movimento))
    .catch(error => console.error(error));
  }

  movimentoForm(movimento: IMovimento){
    this.formMovimento = new FormGroup({
      id: new FormControl(movimento.id),
      datMes: new FormControl(movimento.datMes),
      datAno: new FormControl(movimento.datAno), 
      numeroLacamento: new FormControl(movimento.numeroLacamento),
      codProduto: new FormControl(movimento.codProduto),
      codCosif: new FormControl(movimento.codCosif),
      Descricao: new FormControl(movimento.Descricao),
      dataMovimento: new FormControl(movimento.dataMovimento),
      codUsuario: new FormControl(movimento.codUsuario),
      valor: new FormControl(movimento.valor)
    })
  }
  teste(){
    console.log(this.formMovimento.value)
  }
}
