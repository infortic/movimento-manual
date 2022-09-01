import { Component, OnInit } from '@angular/core';
import { IMovimento } from './interfaces/IMovimento';
import { MovimentoManualService } from './movimento-manual.service';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Movimento } from './formulario/movimento';
import { ANOS_VALIDOS } from 'src/environments/environment';
import { MESES_VALIDOS } from 'src/environments/environment';


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
  mes: any =MESES_VALIDOS;
  ano: any =ANOS_VALIDOS;
  btnLimpar: boolean = true;
  btnNovo: boolean = false;
  btnIncluir: boolean = true;
  btnBuscar: boolean = false;


 constructor(
    private movimentoManualService :MovimentoManualService,
    private fb: FormBuilder
    )
  {}

  ngOnInit(): void {
    this.obterTodos()
    this.criarFormulario();
    this.movimentoObject = new Movimento;
  }
  
  criarFormulario(){
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
    this.btnIncluir = true;
    this.btnLimpar = true;
    this.btnNovo = false;
    this.btnBuscar = false;

  }

  limpar(){
    this.criarFormulario()
  }
  
  modoEdicao(){
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
      ativo: [false],
      codProduto: [],
    });
    this.btnIncluir = false;
    this.btnLimpar = false;
    this.btnNovo = true;
    this.btnBuscar = true;

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
