import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: "root" })
export class ResultadosService {

    constructor(private http: HttpClient) { }

    // Esto debería funcionar con models. Arreglar.
    getResults(termino) {
        return this.http.get(`http://localhost:3000/results/${termino}`);
    }
}