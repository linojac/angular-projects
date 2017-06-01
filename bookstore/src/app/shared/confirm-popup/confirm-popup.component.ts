import { Component } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
export interface ConfirmModel {
  title:string;
  message:string;
  showTitle:boolean;
  showAlertOnly:boolean;
  successBtnLabel:string;
  cancelBtnLabel:string;

}
@Component({
  selector: 'app-confirm-popup',
  templateUrl: './confirm-popup.component.html',
  styleUrls: ['./confirm-popup.component.css']
})
export class ConfirmPopupComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  title: string;
  message: string;
  showTitle:boolean;
  showAlertOnly:boolean;
  cancelBtnLabel: string = "Cancel";
  successBtnLabel: string = "Ok";
  constructor(dialogService: DialogService) {
    super(dialogService);
  }
  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }
  cancel() {
  this.result = false;
  this.close();
}

}
