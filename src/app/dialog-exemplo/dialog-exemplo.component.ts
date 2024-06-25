import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CodigoqrComponent } from '../codigoqr/codigoqr.component';

@Component({
  selector: 'app-dialog-exemplo',
  templateUrl: './dialog-exemplo.component.html',
  styleUrl: './dialog-exemplo.component.css'
})
export class DialogExemploComponent {

  constructor(public dialogRef: MatDialogRef<DialogExemploComponent>, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

  whatsApp(): void {
    this.dialogRef.close();
  }

  gerarQRCode(): void {
    this.dialog.open(CodigoqrComponent);
  }


}
