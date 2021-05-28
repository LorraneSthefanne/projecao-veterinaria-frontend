import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TutorService} from '../../_services/tutor.service';
import {ITutor} from '../../_models/ITutor';
import {Router} from '@angular/router';

interface IModalidade {
  id?: string;
  nome?: string;
  descricao?: string;
}

@Component({
  selector: 'app-formulario-aluno',
  templateUrl: './formulario-tutor.component.html',
  styleUrls: ['./formulario-tutor.component.scss']
})
export class FormularioTutorComponent implements OnInit, OnDestroy {

  form?: FormGroup;
  submitted?: boolean;
  @Input() desativarCadastro = true;
  @Input() isDetalhe = false;
  @Output() salvarEvent = new EventEmitter<ITutor>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private tutorService: TutorService) {
  }

  ngOnInit(): void {
    const {required, maxLength, email} = Validators;
    const tutor = this.tutorService?.tutor ?? null;
    this.form = this.fb.group({
      id: [tutor?.id, []],
      nome: [tutor?.nome, [required, maxLength(100)]],
      dataNascimento: [tutor?.dataNascimento, [required]],
      documento: [tutor?.documento, [required, maxLength(14)]],
      telefone: [tutor?.telefone, [required, maxLength(15)]],
      email: [tutor?.email, [required, email, maxLength(50)]],
      tipo: ['TUTOR', [required, maxLength(20)]]
    });
  }

  get alunoControl() {
    return this.form.controls;
  }

  cadastrar() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const aluno = this.form.value as ITutor;
    this.salvarEvent.emit(aluno);
  }

  ngOnDestroy(): void {
    this.form.reset({});
  }

}
