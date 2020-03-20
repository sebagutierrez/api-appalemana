import { Component, OnInit } from '@angular/core';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


import { CohortesService } from 'src/app/services/cohortes.service';

@Component({
  selector: 'app-cohortes',
  templateUrl: './cohortes.component.html',
  styleUrls: ['./cohortes.component.css']
})
export class CohortesComponent implements OnInit {

  faPen = faPen;
  faTrash = faTrash;

  filterInput = "";

  constructor(
    public cohorteService: CohortesService
  ) { }

  ngOnInit(): void {
    this.filterInput = "";
    this.cohorteService.isDataLoaded = false;
    this.cohorteService.getCohortes();
  }

  removeCohorte(id_cohorte) {
    if (window.confirm('¿Estás seguro que deseas eliminar esta cohorte?')) {
      this.cohorteService.removeCohorte(id_cohorte);
    }
  }

}
