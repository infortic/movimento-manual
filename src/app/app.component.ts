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
  codProdCosif: any = [445,3345,6654]
  formAtivo: boolean = true;
  movimentoObject!: Movimento;
  grid: any = [];
  mes: any =MESES_VALIDOS;
  ano: any =ANOS_VALIDOS;
  btnLimpar: boolean = true;
  btnNovo: boolean = false;
  btnIncluir: boolean = true;
  btnBuscar: boolean = false;
  comboProduto: any = [];
  comboCosif: any = [];

 constructor(
    private movimentoManualService :MovimentoManualService,
    private fb: FormBuilder
    )
  {}

  ngOnInit(): void {
    this.obterProdutos();
    this.obterTodos();
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
    this.movimentoManualService.incluir(this.movimentoObject)
  }

  obterTodos(){
    this.movimentoManualService.obterTodos()
    .then(data => this.grid = data)
    .catch(error => console.error(error));
    console.log(this.grid)
  }

  

  oberMovimentoPorMesAno(){
    this.movimentoManualService.oberMovimentoPorMesAno(this.formMovimento.value.datMes, this.formMovimento.value.datAno)
    .then(movimento => this.grid = movimento)
    .catch(error => console.error(error));
  } 
  
  obterProdutos(){
    this.movimentoManualService.obterProdutos()
    .then(produto => this.comboProduto = produto,);
  }

  obterCosifPorCodProduto(id: number){
    this.movimentoManualService.obterCosifPorCodProduto(id)
    .then(cosif => this.comboCosif = cosif);
    console.log(this.comboCosif)
  }
}
