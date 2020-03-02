import { Component, OnInit } from '@angular/core';

import { CohortesService } from 'src/app/services/cohortes.service';

@Component({
  selector: 'app-cohortes',
  templateUrl: './cohortes.component.html',
  styleUrls: ['./cohortes.component.css']
})
export class CohortesComponent implements OnInit {

  constructor(
    public cohorteService: CohortesService
  ) { }

  ngOnInit(): void {
  }

}
