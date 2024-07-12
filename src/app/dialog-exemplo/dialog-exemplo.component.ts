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
    const phoneNumber = '5551999999999'; // Substitua pelo número de telefone do anfitrião
    const message = `Olá, estou interessado em saber mais sobre a reserva.`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    this.dialogRef.close();
  }

  gerarQRCode(): void {
    this.dialog.open(CodigoqrComponent);
  }


}
