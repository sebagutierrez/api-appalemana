import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Resultado } from '../components/resultados/resultados.model';

@Injectable({
  providedIn: 'root'
})
export class CohortesService {

  cohorteActual = [];
  resultados: Resultado;

  constructor(
    private http: HttpClient
  ) { }



  // Component Resultados
  isChecked(termino) {
    return (this.cohorteActual.findIndex(term => termino.termino_preferido === term.termino_preferido) != -1);
  }

  onChange($event, termino) {
    termino.checked = $event.checked;
    // console.log(`${termino.termino_preferido} está en estado ${termino.checked}`);

    if (termino.checked) {
      this.addToArrayCohorte(termino);
    } else {
      this.removeFromCohorte(termino);
    }
  }

  addToArrayCohorte(termino) {
    this.cohorteActual.push(termino);
    console.log(`Termino (${termino.termino_preferido}) agregado a la cohorte`);
  }

  removeFromCohorte(termino) {
    this.cohorteActual = this.cohorteActual.filter(term => term.concept_id_HIBA != termino.concept_id_HIBA);
    console.log(`Termino (${termino.termino_preferido}) removido de la cohorte`);
  }

  removeAllFromCohorte() {
    this.cohorteActual.forEach(element => {
      element.checked = false;
    });

    this.cohorteActual = [];
    console.log("Cohorte eliminada");
  }

  selectAll(array) {
    array.forEach(element => {
      if (!element.checked) {
        element.checked = true;
        this.addToArrayCohorte(element);
      }
    });
  }

  deselectAll(array) {
    array.forEach(element => {
      if (element.checked) {
        element.checked = false;
        this.removeFromCohorte(element);
      }
    });
  }

  // Component Cohortes
  getCohortes() {
    return this.http.get("http://localhost:3000/cohortes");
  }


}