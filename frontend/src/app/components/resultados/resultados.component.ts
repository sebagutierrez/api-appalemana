import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.routeParams = params.searchInput;

      this.resultadosService.getResults(this.routeParams)
        .subscribe((data: ResultadosObjeto) => {
          this.resultados = data;



          console.log(this.resultados);
        });
    });



    //this.route.params.subscribe((params) => {
    //  let debug = this.resultadosService.getResults(params);
    //console.log(params);
    //console.log(this.resultadosService.getResults(params)); 
    //})
  }
}