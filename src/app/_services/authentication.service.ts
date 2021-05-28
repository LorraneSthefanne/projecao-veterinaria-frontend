import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {finalize, map} from 'rxjs/operators';
import {IUser} from "../_model/IUser";
import {BlockUI, NgBlockUI} from "ng-block-ui";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  @BlockUI() blockUI: NgBlockUI;
  public currentUser: Observable<IUser>;
  private currentUserSubject: BehaviorSubject<IUser>;
  public isLogado = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser>(
      JSON.parse(localStorage.getItem('currentUser') as string)
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.isLogado.asObservable(); // {2}
  }

  public get currentUserValue(): IUser {
    return this.currentUserSubject.value;
  }

  login(usuario: string, senha: string): Observable<IUser> {
    this.blockUI.start()
    return this.http
      .post<IUser>(`${environment.BASE_URL_API}/login`, {usuario, senha})
      .pipe(
        finalize(() => this.blockUI.stop()),
        map((user: IUser) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    this.isLogado.next(false);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({});
  }
}
