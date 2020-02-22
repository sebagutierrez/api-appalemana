import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ResultadosService } from '../../services/resultados.service';
import { ResultadosObjeto } from './resultados-objeto.model';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  private routeParams: Params;
  resultados: ResultadosObjeto;

  constructor(
    private route: ActivatedRoute,
    private resultadosService: ResultadosService,
    public router: Router,
  ) { }



  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParams = params.searchInput;

      this.resultadosService.getResults(this.routeParams)
        .subscribe((data: ResultadosObjeto) => {

          // Hacer esta verificación para que no tire error "ctx.resultados.data.query_padres_termino_preferido is undefined" en el HTML.
          /* if (!data.data.query_termino_preferido) {
            this.resultados.message = "Not found";
            return;
          } */

          this.resultados = data;

          console.log(this.resultados); // Debug purposes
        });
    });
  }
}