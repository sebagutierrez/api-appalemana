import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resultado } from '../components/resultados/resultados.model';
import { TerminoBusqueda, ObjetoAutocomplete } from '../components/buscador/buscador.model';

@Injectable({ providedIn: "root" })
export class ResultadosService {


    constructor(private http: HttpClient) { }

    getResults(termino) {
        return this.http.get<Resultado>(`http://localhost:3000/results/${termino}`);
    }

    getAutocomplete(query: string) {

        if (query.length < 2) {
            return;
        }

        query = query.toUpperCase();
        console.log("query ==> " + query);

        return this.http.get<ObjetoAutocomplete>('http://localhost:3000/autocomplete', { params: { query: query } });
    }



}