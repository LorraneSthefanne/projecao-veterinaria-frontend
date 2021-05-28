import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IPet} from '../../_models/IPet';

@Component({
  selector: 'app-tabela-animal',
  templateUrl: './tabela-animal.component.html',
  styleUrls: ['./tabela-animal.component.scss']
})
export class TabelaAnimalComponent implements OnInit {

  @Input() pets: IPet[];
  pagina = 0;
  tamanho = 5;
  totalRegistro = 0;

  @Output() eventDetalhe = new EventEmitter<IPet>();
  @Output() eventExcluir = new EventEmitter<IPet>();

  constructor() {
  }

  ngOnInit(): void {
  }


  detalhe(pet: IPet) {
    this.eventDetalhe.emit(pet);
  }

  excluir(pet: IPet) {
    this.eventExcluir.emit(pet);
  }

}
