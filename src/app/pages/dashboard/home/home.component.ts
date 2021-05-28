import {Component, OnInit} from '@angular/core';
import {IOpcao} from '../../../_model/IOpcao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  opcoes: IOpcao[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.opcoes = [
      {
        nome: 'Tutor',
        ativo: true,
        descricao: 'Realizar gerenciamento de tutor.',
        link: 'tutor'
      }
    ];
  }

}
