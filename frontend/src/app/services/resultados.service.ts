import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resultado } from '../components/resultados/resultados.model';

@Injectable({ providedIn: "root" })
export class ResultadosService {


    constructor(private http: HttpClient) { }

    getResults(termino) {
        return this.http.get(`http://localhost:3000/results/${termino}`);
    }




}