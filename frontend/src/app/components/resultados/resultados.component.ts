import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResultadosService } from '../../services/resultados.service';
import { Resultado } from './resultados.model';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  private routeParams: Params;
  resultados: Resultado;
  cohorte = [];
  isDataLoaded = false;



  // Arreglar acá: nombres route y router deben diferenciarse mejor; el atributo routeParams no es necesario.
  constructor(
    private route: ActivatedRoute,
    private resultadosService: ResultadosService,
    public router: Router,
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
          this.resultados = data;
          this.isDataLoaded = true;
          console.log(this.resultados); // Debug purposes
        })
    });
  }


  // Agrega a la checklist (lista de cohortes) todos los checkeados cuando se clickea el botón.
  // FALTA: eliminar de la checklist si se deselecciona y se vuelve a clickear el botón. POR AHORA se está limpiando la lista en cada "agregar cohorte".
  // A FUTURO: hacer esto con observables, así se agrega automáticamente si se selecciona/deselecciona un término.
  addToCohorte() {

    this.cohorte = [];

    if (this.resultados.data.query_termino_preferido) {
      this.resultados.data.query_padres_termino_preferido.forEach(termino => {
        if (termino.checked && !this.cohorte.includes(termino)) {
          this.cohorte.push(termino);
          console.log("Término agregado a checklist --> " + termino.termino_preferido);
        }
      });

      if (this.resultados.data.query_termino_preferido[0].checked && !this.cohorte.includes(this.resultados.data.query_termino_preferido[0])) {
        this.cohorte.push(this.resultados.data.query_termino_preferido[0]);
        console.log("Término agregado a checklist --> " + this.resultados.data.query_termino_preferido[0].termino_preferido);
      }

      this.resultados.data.query_hijos_termino_preferido.forEach(termino => {
        if (termino.checked && !this.cohorte.includes(termino)) {
          this.cohorte.push(termino);
          console.log("Término agregado a checklist --> " + termino.termino_preferido);
        }
      });
    }
  }

}