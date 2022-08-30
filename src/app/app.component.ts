import { Component } from '@angular/core';
import { MovimentoManualService } from './movimento-manual.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovimentoManual';

  constructor(private movimentoManualService :MovimentoManualService)
  {}

  carregarGrid(){
    this.movimentoManualService.obterTodos()
    .then(movimento => console.log(movimento))
    .catch(error => console.error(error));
    
  }
  

}
