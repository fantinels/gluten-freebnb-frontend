import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-exemplo',
  templateUrl: './dialog-exemplo.component.html',
  styleUrl: './dialog-exemplo.component.css'
})
export class DialogExemploComponent {

  constructor(public dialogRef: MatDialogRef<DialogExemploComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  whatsApp(): void {
    this.dialogRef.close();
  }

  gerarQRCode(): void {
    this.dialogRef.close(this.data);
  }


}
