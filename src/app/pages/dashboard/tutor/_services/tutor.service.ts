import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {ITutor} from '../_models/ITutor';
import {IPage} from '../../../../_model/IPage';
import {stringify} from 'query-string';
import {ITutorFiltro} from '../_models/ITutorFiltro';
import {catchError, finalize} from 'rxjs/operators';
import {BlockUI, NgBlockUI} from 'ng-block-ui';

@Injectable({
  providedIn: 'root'
})
export class TutorService {

  tutor?: ITutor;

  @BlockUI() blockUI: NgBlockUI;

  constructor(private htpp: HttpClient) {
  }

  cadastrar(tutor: ITutor): Observable<ITutor> {
    this.blockUI.start();
    return this.htpp.post(`${environment.BASE_URL_API}/pessoas`, tutor)
      .pipe(finalize(() => this.blockUI.stop()));
  }

  atualizar(tutor: ITutor): Observable<ITutor> {
    this.blockUI.start();
    return this.htpp.put(`${environment.BASE_URL_API}/pessoas/${tutor.id}`, tutor)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  remover(id: string): Observable<any> {
    this.blockUI.start();
    return this.htpp.delete(`${environment.BASE_URL_API}/pessoas/${id}`)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  pesquisar(filtro?: ITutorFiltro, pagina = 0, tamanho = 10): Observable<IPage<ITutor>> {
    const query = stringify(
      {
        pagina,
        tamanho,
        nome: filtro.nome,
        documento: filtro.documento,
        email: filtro.email
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    this.blockUI.start();
    return this.htpp.get(`${environment.BASE_URL_API}/pessoas?${query}`)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  pesquisarWithoutLoader(filtro?: ITutorFiltro, pagina = 0, tamanho = 10): Observable<IPage<ITutor>> {
    const query = stringify(
      {
        pagina,
        tamanho,
        nome: filtro.nome,
        documento: filtro.documento,
        email: filtro.email
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );
    return this.htpp.get(`${environment.BASE_URL_API}/pessoas?${query}`);
  }

  buscar(id: string): Observable<ITutor> {
    this.blockUI.start();
    return this.htpp.get(`${environment.BASE_URL_API}/pessoas/${id}`)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }
}
