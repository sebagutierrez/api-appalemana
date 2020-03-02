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
          this.isDataLoaded = true;
          console.log(this.cohorteService.resultados);

        })
    });
  }


  // LOS LLAMADOS DE MÉTODOS DESDE EL TEMPLATE HACIA EL SERVICE DEBEN SER MEDIADOS POR EL COMPONENTE (MÉTODO PUENTE)



  // Agrega a la checklist (lista de cohortes) todos los checkeados cuando se clickea el botón.
  // A FUTURO: hacer esto con observables, así se agrega automáticamente si se selecciona/deselecciona un término.
  /* addToCohorte() {
    let arrayModified = false;

    if (this.resultados.data.query_termino_preferido) {

      this.resultados.data.query_padres_termino_preferido.forEach(termino => {
        if (termino.checked && !this.cohorteService.cohorteActual.includes(termino)) {

          this.cohorteService.cohorteActual.push(termino);
          arrayModified = true;

        } else if (!termino.checked && this.cohorteService.cohorteActual.includes(termino)) {

          this.removeFromCohorte(termino);
          arrayModified = true;


        }
      });

      if (this.resultados.data.query_termino_preferido[0].checked &&
        !this.cohorteService.cohorteActual.includes(this.resultados.data.query_termino_preferido[0])) {

        this.cohorteService.cohorteActual.push(this.resultados.data.query_termino_preferido[0]);
        arrayModified = true;

      } else if (!this.resultados.data.query_termino_preferido[0].checked &&
        this.cohorteService.cohorteActual.includes(this.resultados.data.query_termino_preferido[0])) {

        this.removeFromCohorte(this.resultados.data.query_termino_preferido[0]);
        arrayModified = true;

      }

      this.resultados.data.query_hijos_termino_preferido.forEach(termino => {
        if (termino.checked && !this.cohorteService.cohorteActual.includes(termino)) {

          this.cohorteService.cohorteActual.push(termino);
          arrayModified = true;

        } else if (!termino.checked && this.cohorteService.cohorteActual.includes(termino)) {

          this.removeFromCohorte(termino);
          arrayModified = true;

        }
      });
    }
    if (arrayModified) {
      console.log("Cohorte modificada!");
    }
  } */

  // Elimina un término de la cohorte.
  /* removeFromCohorte(termino) {
    const index = this.cohorteService.cohorteActual.indexOf(termino);
    if (index !== -1) {
      this.cohorteService.cohorteActual.splice(index, 1);
      termino.checked = false;
    }
  } */

  // Muestra la cohorte.
  showCohorte() {
    console.log(this.cohorteService.cohorteActual);
  }

  /* onChange($event, termino) {
    termino.checked = $event.checked;
    this.cohorteService.addToArrayCohorte(termino);
  } */

  /* addToArrayCohorte(termino) {
    if (!this.cohorteService.cohorteActual.includes(termino)) {
      this.cohorteService.cohorteActual.push(termino);
      console.log(`Termino (${termino.termino_preferido}) agregado a la cohorte`);
    } else {
      if (!termino.checked) {
        this.removeFromCohorte(termino);
        console.log(`Termino (${termino.termino_preferido}) removido de la cohorte`);
      }
    }
  } */

  /* autosetChecked(termino) {
    return this.cohorteService.cohorteActual.includes(termino);
  } */

}