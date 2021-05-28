import {Injectable} from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) {
  }

  success(msg?: string) {
    this.messageService.add({severity: 'success', summary: msg, detail: ''});
  }

  error(msg?: string) {
    this.messageService.add({severity: 'error', summary: msg, detail: ''});
  }

  info(msg?: string) {
    this.messageService.add({severity: 'info', summary: msg, detail: ''});
  }

  clear() {
    this.messageService.clear();
  }
}
