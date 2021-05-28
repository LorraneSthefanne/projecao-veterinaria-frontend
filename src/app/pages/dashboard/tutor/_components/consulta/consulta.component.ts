import {Component, OnInit} from '@angular/core';
import {TutorService} from '../../_services/tutor.service';
import {ITutor} from '../../_models/ITutor';
import {ITutorFiltro} from '../../_models/ITutorFiltro';
import {Router} from '@angular/router';
import {ToastService} from '../../../../../_services/toast.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  tutores: ITutor[];
  pagina = 0;
  tamanho = 5;
  totalRegistro = 0;
  nomeTutorPesquisado = '';

  constructor(private alunoService: TutorService, private router: Router, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.pesquisar();
  }

  pesquisarTutor(event: any) {
    this.alunoService.pesquisarWithoutLoader({nome: event}, 0, 99999)
      .subscribe(p => {
        this.tutores = p.lista;
        this.totalRegistro = p.quantidade;
      });
  }

  pesquisar(filtro?: ITutorFiltro, pagina = 0, tamanho = 99999) {
    this.alunoService.pesquisar({}, pagina, tamanho)
      .subscribe(p => {
        this.tutores = p.lista;
        this.totalRegistro = p.quantidade;
      });
  }

  detalhe(id: string) {
    void this.router.navigate(['dashboard', 'tutor', 'consulta', id]);
  }

  remover(id: string) {
    this.alunoService.remover(id)
      .subscribe(() => {
        this.alunoService.tutor = null;
        this.toastService.success('Tutor removido com sucesso.');
        this.pesquisar();
      });
  }


}
