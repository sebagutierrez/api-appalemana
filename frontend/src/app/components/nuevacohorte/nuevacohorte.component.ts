import { Component, OnInit } from '@angular/core';

import { CohortesService } from 'src/app/services/cohortes.service';

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nuevacohorte',
  templateUrl: './nuevacohorte.component.html',
  styleUrls: ['./nuevacohorte.component.css']
})
export class NuevacohorteComponent implements OnInit {

  faCheckCircle = faCheckCircle;

  constructor(
    public cohorteService: CohortesService
  ) { }

  ngOnInit(): void {
  }

}
