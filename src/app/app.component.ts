import { Component, OnInit } from '@angular/core';
import { IMovimento } from './interfaces/IMovimento';
import { MovimentoManualService } from './movimento-manual.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Movimento } from './formulario/movimento';
import { ANOS_VALIDOS } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MovimentoManual';
  formMovimento!: FormGroup;
  formAtivo: boolean = true;
  movimentoObject!: Movimento;
  grid: any = [];
  mes: any =[1,2,3,4,5,6,7,8,9,10,11,12];
  ano: any =ANOS_VALIDOS;
  
 constructor(
    private movimentoManualService :MovimentoManualService,
    private fb: FormBuilder
    )
  {}

  ngOnInit(): void {
    this.obterTodos()
    this.configurarFormulario();
    this.movimentoObject = new Movimento;
  }
  
  testar(){
    console.log(this.ano)
  }

  configurarFormulario(){
    this.formMovimento = this.fb.group({
      datMes: [],
      datAno: [],
      numeroLacamento: [""],
      datcodProdutoes: [""],
      codCosif: [""],
      descricao: [""],
      dataMovimento: [""],
      codUsuario: [""],
      valor: [""],
      ativo: [true],
      codProduto: [],
    });
  }

  criar(){
    this.movimentoObject.datMes = this.formMovimento.value.datMes

    console.log(this.movimentoObject)
    this.movimentoManualService.incluir(this.movimentoObject)
  }

  obterTodos(){
    this.movimentoManualService.obterTodos()
    .then(data => this.grid = data)
    .catch(error => console.error(error));
    console.log(this.grid)
  }

  oberMovimentoPorMesAno(mes: number, ano: number){
    this.movimentoManualService.oberMovimentoPorMesAno(mes, ano)
    .then(movimento => console.log(movimento))
    .catch(error => console.error(error));
  }  
}
