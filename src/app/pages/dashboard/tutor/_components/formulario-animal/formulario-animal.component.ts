import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IPet} from '../../_models/IPet';
import {PetService} from '../../_services/pet.service';

@Component({
  selector: 'app-formulario-animal',
  templateUrl: './formulario-animal.component.html',
  styleUrls: ['./formulario-animal.component.scss']
})
export class FormularioAnimalComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({});
  @Input() isDetalhe = false;
  @Output() salvarEvent = new EventEmitter<IPet>();

  submitted?: boolean;

  constructor(private fb: FormBuilder, private petService: PetService) {
  }

  ngOnInit(): void {
    const {maxLength, required} = Validators;
    const pet = this.petService?.pet ?? null;
    this.form = this.fb.group({
      id: [pet?.id, []],
      nome: [pet?.nome, [required, maxLength(50)]],
      dataNascimento: [pet?.dataNascimento, [required]],
      raca: [pet?.raca, [required, maxLength(20)]],
      especie: [pet?.especie, [required, maxLength(20)]],
      peso: [pet?.peso, [required, maxLength(5)]]
    });
  }

  get animalControl() {
    return this.form.controls;
  }

  salvar() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const pet = this.form.value as IPet;
    this.salvarEvent.emit(pet);
  }

  ngOnDestroy(): void {
    this.form.reset({});
  }

}
