import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AuthenticationService} from './_services/authentication.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'projecao-academia-frontend';
  isBasePath = false;
  isLogado: Observable<boolean> = new Observable<boolean>();

  constructor(private primengConfig: PrimeNGConfig,
              private router: Router,
              private location: Location,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.primengConfig.ripple = false;
    this.isLogado = this.authenticationService.isLoggedIn;
  }

  voltar(): void {
    this.isBasePath = this.router.isActive('/dashboard', true);
    if (this.isBasePath) {
      return;
    }
    void this.location.back();
  }

  sair() {
    this.authenticationService.logout();
    void this.router.navigate(['']);
  }
}
