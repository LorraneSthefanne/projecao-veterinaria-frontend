import {Component, OnInit} from '@angular/core';
import {IOpcao} from '../../../_model/IOpcao';

@Component({
  selector: 'app-aluno',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {

  opcoes: IOpcao[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.opcoes = [
      {
        nome: 'Cadastrar',
        ativo: true,
        descricao: 'Realizar o cadastro de um novo tutor.',
        link: 'cadastro'
      },
      {
        nome: 'Consultar',
        ativo: true,
        descricao: 'Consultar um tutor já existente.',
        link: 'consulta'
      }
    ];
  }

}
