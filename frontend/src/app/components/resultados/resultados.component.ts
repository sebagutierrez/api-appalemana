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
  isDataLoaded = false;

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
}