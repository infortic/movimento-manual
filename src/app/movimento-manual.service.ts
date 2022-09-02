import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_PATH } from 'src/environments/environment';
import { IMovimento } from './interfaces/IMovimento';
import { Movimento } from './formulario/movimento';
import { ProdutoCosif } from './formulario/produtoCosif';
import { Produto } from './formulario/produto';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  constructor(private httpClient: HttpClient) { }

  obterTodos(){
    return this.httpClient.get<Movimento[]>(`${API_PATH}mivimento-manual`).toPromise();
  }

  obterProdutos(){
    return this.httpClient.get<Produto[]>(`${API_PATH}mivimento-manual/produtos`).toPromise();
  }

  obterCosifPorCodProduto(id: number){
    return this.httpClient.get<ProdutoCosif[]>(`${API_PATH}mivimento-manual/cosif-por-produto/${id}`).toPromise();
  }

  oberMovimentoPorMesAno(mes: number, ano: number){
    return this.httpClient.get<IMovimento[]>(`${API_PATH}mivimento-manual/obter-movimento-mes-ano/${mes}/${ano}`).toPromise();
  }

  incluir(movimento: Movimento){
    return this.httpClient.post<Movimento>(`${API_PATH}mivimento-manual`, movimento).toPromise();
  }

}
