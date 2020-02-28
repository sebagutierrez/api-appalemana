import { Injectable } from '@angular/core';
import { Resultado } from '../components/resultados/resultados.model';

@Injectable({
  providedIn: 'root'
})
export class CohortesService {

  cohorteActual = [];
  resultados: Resultado;

  constructor() { }

  isChecked(termino) {
    //console.log(this.cohorteActual.findIndex(x => termino.termino_preferido === x.termino_preferido));
    return (this.cohorteActual.findIndex(x => termino.termino_preferido === x.termino_preferido) != -1);
  }

  onChange($event, termino) {
    termino.checked = $event.checked;
    console.log(`${termino.termino_preferido} está en estado ${termino.checked}`);

    if (termino.checked) {
      this.addToArrayCohorte(termino);
    } else {
      this.removeFromCohorte(termino);
    }


  }

  addToArrayCohorte(termino) {
    //if (this.cohorteActual.findIndex(x => termino.termino_preferido === x.termino_preferido) === -1) {
    this.cohorteActual.push(termino);
    console.log(`Termino (${termino.termino_preferido}) agregado a la cohorte`);
    //}
  }


  /* removeFromCohorte(termino) {
    const index = this.cohorteActual.indexOf(termino);
    console.log("debug xD");
    if (index !== -1) {
      this.cohorteActual.splice(index, 1);
      termino.checked = false;
      console.log(`Termino (${termino.termino_preferido}) removido de la cohorte`);
    }
  } */

  removeFromCohorte(termino) {
    this.cohorteActual = this.cohorteActual.filter(term => term.concept_id_HIBA != termino.concept_id_HIBA);
    console.log(`Termino (${termino}) removido de la cohorte`);
  }


}
