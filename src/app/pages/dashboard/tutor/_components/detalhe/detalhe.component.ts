import {Component, OnDestroy, OnInit} from '@angular/core';
import {TutorService} from '../../_services/tutor.service';
import {ITutor} from '../../_models/ITutor';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastService} from '../../../../../_services/toast.service';
import {IPet} from '../../_models/IPet';
import {PetService} from '../../_services/pet.service';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.scss']
})
export class DetalheComponent implements OnInit, OnDestroy {

  pagina = 0;
  tamanho = 5;

  private idPessoa = '';
  isDetalhe = false;
  showFormAnimal = false;
  pets: IPet[] = [];

  constructor(private alunoService: TutorService,
              private petService: PetService,
              private router: Router,
              private toastService: ToastService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idPessoa = this.activatedRoute.snapshot.params.id;
    this.buscarPet(this.idPessoa);
    this.buscarAluno(this.idPessoa);
  }

  buscarAluno(id: string) {
    this.alunoService.buscar(id)
      .subscribe((a: ITutor) => this.alunoService.tutor = a);
  }

  buscarPet(idPessoa: string) {
    this.petService.pesquisar({idPessoa}, 0, 99999)
      .subscribe(p => this.pets = p.lista);
  }

  salvar(aluno: ITutor) {
    this.alunoService.atualizar(aluno)
      .subscribe(() => {
        this.toastService.success('Tutor atualizado com sucesso.');
      }, error => {
        console.log(error);
        this.toastService.error('Documento/E-mail já cadastrado.');
      });
  }

  get alunoSelecionado(): ITutor {
    return this.alunoService?.tutor;
  }

  salvarPet(pet: IPet) {
    if (pet.id) {
      this.atualizarPet(pet);
      return;
    }
    this.cadastroPet(pet);
  }

  cadastroPet(pet: IPet) {
    this.petService.cadastrar({...pet, idPessoa: this.idPessoa} as IPet)
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

  adicionar() {
    this.showFormAnimal = true;
  }

  cancelar() {
    this.showFormAnimal = false;
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
    this.alunoService.tutor = null;
  }


}
