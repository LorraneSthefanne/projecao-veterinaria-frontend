import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {finalize} from 'rxjs/operators';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import {IPet} from '../_models/IPet';
import {IPage} from '../../../../_model/IPage';
import {stringify} from 'query-string';
import {IPetFiltro} from '../_models/IPetFiltro';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  pet?: IPet;
  @BlockUI() blockUI: NgBlockUI;

  constructor(private htpp: HttpClient) {
  }

  cadastrar(pet: IPet): Observable<IPet> {
    this.blockUI.start();
    return this.htpp.post(`${environment.BASE_URL_API}/pets`, pet)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  atualizar(id: string, pet: IPet): Observable<IPet> {
    this.blockUI.start();
    return this.htpp.put(`${environment.BASE_URL_API}/pets/${id}`, pet)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  excluir(id: string): Observable<any> {
    this.blockUI.start();
    return this.htpp.delete(`${environment.BASE_URL_API}/pets/${id}`)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }

  pesquisar(filtro?: IPetFiltro, pagina = 0, tamanho = 10): Observable<IPage<IPet>> {
    const query = stringify(
      {
        pagina,
        tamanho,
        nome: filtro.nome,
        idPessoa: filtro.idPessoa,
      },
      {skipEmptyString: true, skipNull: true}
    );
    this.blockUI.start();
    return this.htpp.get(`${environment.BASE_URL_API}/pets?${query}`)
      .pipe(
        finalize(() => this.blockUI.stop())
      );
  }
}
