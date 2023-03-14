import { Component,EventEmitter,Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent {
  @Input() item:string|undefined
  @Output() oncancelpro = new EventEmitter()
  @Output() ondeleteAcc = new EventEmitter()



  cancelpro(){
    this.oncancelpro.emit()
  }

  deleteAcc(){
    this.ondeleteAcc.emit(this.item)
  }
}

