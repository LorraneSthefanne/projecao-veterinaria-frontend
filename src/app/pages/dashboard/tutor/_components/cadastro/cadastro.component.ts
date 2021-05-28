import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITutor} from '../../_models/ITutor';
import {TutorService} from '../../_services/tutor.service';
import {Router} from '@angular/router';
import {ToastService} from '../../../../../_services/toast.service';
import {IPet} from '../../_models/IPet';
import {PetService} from '../../_services/pet.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit, OnDestroy {

  btnAdicionarDesativado = true;
  isDetalhe = false;
  showFormAnimal = false;
  showFormTutor = true;

  private tutor: ITutor = {};
  pets: IPet[] = [];

  constructor(private alunoService: TutorService,
              private petService: PetService,
              private router: Router,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  cadastroAluno(aluno: ITutor) {
    this.alunoService.cadastrar(aluno)
      .subscribe((tutorCadastro: ITutor) => {
        this.tutor = tutorCadastro;
        this.btnAdicionarDesativado = false;
        this.toastService.success(`${tutorCadastro.nome} cadastrado.`);
        this.toastService.info('Opção para adicionar um pets disponível.');
        this.showFormTutor = false;
      });
  }

  salvarPet(pet: IPet) {
    if (pet.id) {
      this.atualizarPet(pet);
      return;
    }
    this.cadastroPet(pet);
  }

  cadastroPet(pet: IPet) {
    this.petService.cadastrar({...pet, idPessoa: this.tutor.id} as IPet)
      .subscribe((petCadastrado: IPet) => {
        this.showFormAnimal = false;
        this.toastService.success(`${petCadastrado.nome} adicionado.`);
        this.pets = [...this.pets, petCadastrado];
      }, error => {
        const {errorMessage} = error;
        this.toastService.error(errorMessage);
      });
  }

  atualizarPet(pet: IPet) {
    this.petService.atualizar(pet.id, pet)
      .subscribe((petAtualizado: IPet) => {
        this.showFormAnimal = false;
        this.toastService.success(`${petAtualizado.nome} atualizado.`);
        const listaAtualizada = this.pets.filter(p => p.id !== pet.id);
        this.pets = [...listaAtualizada, petAtualizado];
      }, error => {
        this.toastService.error('Não foi possível atualizar o pet.');
      });
  }

  cancelar() {
    this.showFormAnimal = false;
  }

  adicionar() {
    this.showFormAnimal = true;
  }

  detalhePet(pet: IPet) {
    this.showFormAnimal = true;
    this.isDetalhe = true;
    this.petService.pet = pet;
  }

  excluirPet(pet: IPet) {
    this.petService.excluir(pet.id)
      .subscribe(() => {
        this.pets = this.pets.filter(p => p.id !== pet.id);
        this.toastService.success(`${pet.nome} removido.`);
      });
  }

  ngOnDestroy(): void {
    this.showFormAnimal = true;
    this.btnAdicionarDesativado = true;
    this.showFormTutor = true;
    this.isDetalhe = false;
  }

}
