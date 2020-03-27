import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ResultadosService } from '../../services/resultados.service';
import { CohortesService } from '../../services/cohortes.service';

import { Resultado } from './resultados.model';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';



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
    public cohorteService: CohortesService,
    public dialog: MatDialog
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
  }

  // Muestra la cohorte.
  showCohorte() {
    console.log(this.cohorteService.cohorteActual);
  }

  isEnabled() {
    return this.cohorteService.cohorteActual.length > 0;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogAgregarCohorteExistente, {
      width: '600px'
    });
  }





}

// Dialog agregar a cohorte existente

@Component({
  selector: 'dialog-agregar-cohorte',
  templateUrl: 'resultados-dialog-agregar-cohorte.html',
  styleUrls: ['resultados-dialog-agregar-cohorte.css']
})
export class DialogAgregarCohorteExistente implements OnInit {

  filterInput = "";

  disableAnimation = true;

  constructor(public cohorteService: CohortesService) { }

  ngOnInit(): void {
    this.filterInput = "";
    this.cohorteService.getCohortes();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.disableAnimation = false);
  }

}