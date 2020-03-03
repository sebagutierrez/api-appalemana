import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ResultadosService } from '../../services/resultados.service';
import { CohortesService } from '../../services/cohortes.service';

import { Resultado } from './resultados.model';

import { faTrash } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css'],
})
export class ResultadosComponent implements OnInit {

  private routeParams: Params;
  resultados: Resultado;
  isDataLoaded = false;

  param: string;
  faTrash = faTrash;


  // Arreglar acá: nombres route y router deben diferenciarse mejor; el atributo routeParams no es necesario.
  constructor(
    private route: ActivatedRoute,
    private resultadosService: ResultadosService,
    public router: Router,
    public cohorteService: CohortesService
  ) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {

      this.routeParams = params.searchInput;

      this.resultadosService.getResults(this.routeParams)
        .subscribe((data: Resultado) => {

          // Si data está vacío
          if (!Object.keys(data.data).length) {
            this.router.navigateByUrl('/');
          }

          this.cohorteService.resultados = data;
          this.cohorteService.checkAllInCohorte();

          this.isDataLoaded = true;
          console.log(this.cohorteService.resultados);

        })
    });


    /*  TEST
    
    console.log(this.route.snapshot.params.searchInput);


    this.param = this.route.snapshot.params.searchInput;
    this.getResults(this.param); */
  }


  /*    TEST 
  
  getResults(param) {
    this.resultadosService.getResults(param).subscribe(
      data => this.cohorteService.resultados = data,
      error => console.log(error),
      () => this.isDataLoaded = true
    );
  } */


  // Muestra la cohorte.
  showCohorte() {
    console.log(this.cohorteService.cohorteActual);
  }
}