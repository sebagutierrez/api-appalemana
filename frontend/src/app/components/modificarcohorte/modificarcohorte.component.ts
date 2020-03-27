import { Component, OnInit } from '@angular/core';

import { CohortesService } from 'src/app/services/cohortes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modificarcohorte',
  templateUrl: './modificarcohorte.component.html',
  styleUrls: ['./modificarcohorte.component.css']
})
export class ModificarcohorteComponent implements OnInit {

  nombreCohorte: string;

  constructor(
    public cohorteService: CohortesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cohorteService.getCohorte(this.route.snapshot.params.id)
      .subscribe(
        data => this.cohorteService.cohorteModify = data,
        error => console.log(error),
        () => {
          console.log(this.cohorteService.cohorteModify);
          this.cohorteService.setAllAsChecked(this.cohorteService.cohorteModify.data.conceptos);
          this.cohorteService.isCohorteLoaded = true;
          this.nombreCohorte = this.cohorteService.cohorteModify.data.cohorte[0].nombre_cohorte;
        }
      );
  }

  modifyNombre(nombreCohorte: string) {
    if (nombreCohorte && nombreCohorte != this.cohorteService.cohorteModify.data.cohorte[0].nombre_cohorte) {
      this.cohorteService.modifyNombre(this.route.snapshot.params.id, nombreCohorte)
        .subscribe(
          data => console.log(data),
          error => console.log(error),
          () => {
            this.router.navigateByUrl('/cohortes');
          }
        );
    }
  }

  modifyConceptos(arrayConceptos) {
    this.cohorteService.modifyConceptos(arrayConceptos)
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        () => {
          this.router.navigateByUrl('/cohortes');
        }
      )
  }


  onChange($event, concepto) {
    concepto.checked = !concepto.checked;
    console.log(concepto);
  }
}
