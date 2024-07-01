import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AcomodacaoService } from '../acomodacao.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogExemploComponent } from '../dialog-exemplo/dialog-exemplo.component';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-detalhes-hospedagem',
  templateUrl: './detalhes-hospedagem.component.html',
  styleUrl: './detalhes-hospedagem.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesHospedagemComponent {
  id: any;
  hospedagem: any = '';
  fotosTratadas: string[] = [];

  info1: number = 0;
  info2: number = 0;

  openDialog(valor: string): void {
    const valorNumerico = parseFloat(valor)
    if(this.usuarioService.getUsuarioId()) {
      const dialogRef = this.dialog.open(DialogExemploComponent, {
        width: '40vw',
        data: { info1: this.info1, info2: this.info2, valor: valorNumerico }
      });
    } else {
      this.router.navigate(['/login']);
    }
    console.log("info 1",this.info1,typeof(this.info1), "info2",this.info2, typeof(this.info2), "valor", valor, typeof(parseInt(valor)));
    
  }



  constructor(private activatedRoute: ActivatedRoute, private acomodacaoService: AcomodacaoService, private changeDetectorRef: ChangeDetectorRef, public dialog: MatDialog, private usuarioService: UsuarioService, private router: Router) {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    })

    this.acomodacaoService.buscarHospedagemPorIdHospedagem(this.id).subscribe((hosp) => {
      this.hospedagem = hosp;
      if(this.hospedagem.foto.indexOf('{') < 0) {
        this.fotosTratadas.push(this.hospedagem.foto);
      } else {
        this.hospedagem.foto = this.hospedagem.foto.replace(/{|}|"/g, '');
        this.fotosTratadas = this.hospedagem.foto.split(',');
      }
      this.changeDetectorRef.detectChanges();
    })
    
  }

}
