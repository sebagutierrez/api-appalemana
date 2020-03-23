import { Component, OnInit } from '@angular/core';

import { CohortesService } from 'src/app/services/cohortes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modificarcohorte',
  templateUrl: './modificarcohorte.component.html',
  styleUrls: ['./modificarcohorte.component.css']
})
export class ModificarcohorteComponent implements OnInit {

  constructor(
    public cohorteService: CohortesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cohorteService.getCohorte(this.route.snapshot.params.id);
  }

}
