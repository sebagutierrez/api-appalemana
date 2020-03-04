import { Component, OnInit } from '@angular/core';

import { CohortesService } from 'src/app/services/cohortes.service';

@Component({
  selector: 'app-nuevacohorte',
  templateUrl: './nuevacohorte.component.html',
  styleUrls: ['./nuevacohorte.component.css']
})
export class NuevacohorteComponent implements OnInit {

  constructor(
    public cohorteService: CohortesService
  ) { }

  ngOnInit(): void {
  }

}
