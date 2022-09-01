import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_PATH } from 'src/environments/environment';
import { IMovimento } from './interfaces/IMovimento';
import { Movimento } from './formulario/movimento';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  constructor(private httpClient: HttpClient) { }

  obterTodos(){
    return this.httpClient.get<Movimento[]>(`${API_PATH}mivimento-manual`).toPromise();
  }

  oberMovimentoPorMesAno(mes: number, ano: number){
    return this.httpClient.get<IMovimento[]>(`${API_PATH}mivimento-manual/obter-movimento-mes-ano${mes}/${ano}`).toPromise();
  }

  incluir(movimento: Movimento){
    return this.httpClient.post<Movimento>(`${API_PATH}mivimento-manual`, movimento).toPromise();
  }

}
