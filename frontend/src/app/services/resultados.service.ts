import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resultados } from '../components/resultados/resultados.model';
import { ResultadosObjeto } from '../components/resultados/resultados-objeto.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: "root" })
export class ResultadosService {

    private objetoResultados;

    constructor(private http: HttpClient) {

    }
    /* 
    getResults(termino) {
        this.http.get<{ objetoResultados }>(`http://localhost:3000/results/${termino}`)
            .subscribe(resultadosData => {
                this.objetoResultados = JSON.stringify(resultadosData);
                console.log(termino);
                console.log("objetoResultados --> " + this.objetoResultados);
            });
    }
 */


    // Esto debería funcionar con models. Arreglar.
    getResults(termino) {
        return this.http.get(`http://localhost:3000/results/${termino}`);
    }

}