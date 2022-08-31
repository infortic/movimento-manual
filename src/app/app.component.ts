import { Component, OnInit } from '@angular/core';
import { IMovimento } from './interfaces/IMovimento';
import { MovimentoManualService } from './movimento-manual.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Movimento } from './formulario/movimento';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MovimentoManual';
  formMovimento!: FormGroup;
  formAtivo: boolean = true;

  constructor(
    private movimentoManualService :MovimentoManualService,
    private fb: FormBuilder
    )
  {}

  ngOnInit(): void {
    this.configurarFormulario();
    this.carregarGrid();
  }
  
  configurarFormulario(){
    this.formMovimento = this.fb.group({
      datMes: [""],
      datAno: [""],
      numeroLacamento: [""],
      datcodProdutoes: [""],
      codCosif: [""],
      Descricao: [""],
      dataMovimento: [""],
      codUsuario: [""],
      valor: [""],
      ativo: [true],
    });
  }

  criar(){
    this.movimentoManualService.incluir(this.formMovimento.value)
  }

  carregarGrid(){
    this.movimentoManualService.obterTodos()
    .then(movimento => console.log(movimento)
    
    )
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

  
}
