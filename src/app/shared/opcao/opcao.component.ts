import {Component, Input, OnInit} from '@angular/core';
import {IOpcao} from "../../_model/IOpcao";

@Component({
  selector: '[app-opcao]',
  templateUrl: './opcao.component.html',
  styleUrls: ['./opcao.component.scss']
})
export class OpcaoComponent implements OnInit {

  @Input() opcao: IOpcao = {};

  constructor() { }

  ngOnInit(): void {
  }

}
