import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
import {ToastService} from '../../../_services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form?: FormGroup;
  submitted?: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastService: ToastService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    const {required, maxLength} = Validators;
    this.form = this.fb.group({
      usuario: [null, [required, maxLength(50)]],
      senha: [null, [required, maxLength(50)]]
    });
  }

  get usuario() {
    return this.form.controls;
  }

  acessar(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const {usuario, senha} = this.form.value;
    this.authenticationService.login(usuario, senha).subscribe(
      (c) => {
        void this.router.navigate(['dashboard']);
      },
      (error) => {
        this.toastService.error(error);
      }
    );
  }
}
