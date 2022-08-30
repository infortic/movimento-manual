import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { API_PATH } from 'src/environments/environment';
import { IMovimento } from './interfaces/IMovimento';

@Injectable({
  providedIn: 'root'
})
export class MovimentoManualService {

  constructor(private httpClient: HttpClient) { }

  obterTodos(){
    return this.httpClient.get<IMovimento[]>(`${API_PATH}mivimento-manual`).toPromise();
  }

}
