import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Resultado } from '../components/resultados/resultados.model';
import { Cohortes } from '../components/cohortes/cohortes.model';

@Injectable({
  providedIn: 'root'
})
export class CohortesService {

  nombreCohorte = '';
  cohorteActual = [];

  cohortePost = {
    nombre: '',
    terminos: []
  }

  cohorteGet: Cohortes;

  isDataLoaded = false;


  resultados: Resultado;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCohorte() {
    this.http.get<Cohortes>('http://localhost:3000/cohortes').subscribe(
      data => this.cohorteGet = data,
      error => console.log(error),
      () => {
        this.isDataLoaded = true,
          console.log('Cohortes cargadas correctamente!'),
          console.log(this.cohorteGet)
      }
    );
  }

  postCohorte(nombreCohorte, cohorteActual) {

    //maybe hacer esto de abajo (asignacion) en el componente, y luego mandar el objeto para que esta funcion solamente haga la http request 
    this.cohortePost.nombre = nombreCohorte;
    this.cohortePost.terminos = cohorteActual;

    console.log(this.cohortePost);

    this.http.post('http://localhost:3000/cohortes/new', this.cohortePost)
      .subscribe(
        data => console.log(data),
        error => console.log(error),
        () => {
          this.removeAllFromCohorte(),
            this.router.navigateByUrl('/cohortes')
        }
      );
  }

  removeCohorte(id_cohorte) {
    this.http.request('delete', 'http://localhost:3000/cohortes/delete', { body: { id_cohorte } })
      .subscribe(
        data => console.log("Eliminado correctamente"),
        error => console.log(error),
        () => this.getCohorte()
      );
  }

  // Verifica si se encuentra un término en el arreglo de cohortes.
  isChecked(termino) {
    return (this.cohorteActual.findIndex(term => termino.termino_preferido === term.termino_preferido) != -1);
  }

  // Utilizada al cargar el componente resultados. Busca en el arreglo de cohortes si se encuentra algún término checkeado,
  // si es así, checked se setea en true.
  checkAllInCohorte() {
    this.resultados.data.query_padres_termino_preferido.forEach(element => {
      if (this.isChecked(element)) {
        element.checked = true;
      }
    });

    if (this.isChecked(this.resultados.data.query_termino_preferido[0])) {
      this.resultados.data.query_termino_preferido[0].checked = true;
    }

    this.resultados.data.query_hijos_termino_preferido.forEach(element => {
      if (this.isChecked(element)) {
        element.checked = true;
      }
    });
  }

  // Se activa cuando se desata un evento en el checkbox. Si se checkea, se agrega a la cohorte. Si se uncheckea, se elimina.
  onChange($event, termino, array) {
    const index = array.findIndex(term => term === termino);
    console.log("index = " + index);
    array[index].checked = $event.checked;
    // console.log(array[index]);
    console.log(`${termino.termino_preferido} está en estado ${termino.checked}`);

    if (array[index].checked) {
      this.addToArrayCohorte(array[index]);
    } else {
      this.removeFromCohorte(array[index]);
    }
  }

  // Agrega un término al array de cohorte.
  addToArrayCohorte(termino) {
    this.cohorteActual.push(termino);
    console.log(`Termino (${termino.termino_preferido}) agregado a la cohorte`);
  }

  // Elimina un término del array de cohorte.
  removeFromCohorte(termino) {
    this.cohorteActual = this.cohorteActual.filter(term => term.concept_id_HIBA != termino.concept_id_HIBA);
    console.log(`Termino (${termino.termino_preferido}) removido de la cohorte`);
  }

  // Vacía el array de cohorte y setea en falso el atributo checked de cada uno de los elementos en el array.
  removeAllFromCohorte() {
    this.cohorteActual.forEach(element => {
      element.checked = false;
      console.log(element);
    });

    this.cohorteActual = [];
    console.log("Cohorte eliminada");
  }

  // Botón para seleccionar todos los términos de una columna
  selectAll(array) {
    array.forEach(element => {
      if (!element.checked) {
        element.checked = true;
        this.addToArrayCohorte(element);
      }
    });
  }

  // Botón para deseleccionar todos los términos de una columna
  deselectAll(array) {
    array.forEach(element => {
      if (element.checked) {
        this.removeFromCohorte(element);
        element.checked = false;
      }
      console.log(element);

    });
  }

  // 
  verEstado(array) {
    array.forEach(element => {
      console.log(element);
    });
  }

  // Component Cohortes
  getCohortes() {
    return this.http.get<Resultado>("http://localhost:3000/cohortes");
  }
}