import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Resultado } from '../components/resultados/resultados.model';
import { Cohortes } from '../components/cohortes/cohortes.model';
import { Cohorte } from '../components/modificarcohorte/modificarcohorte.model'

@Injectable({
  providedIn: 'root'
})
export class CohortesService {

  nombreCohorte = '';
  cohorteActual = [];
  filterInput = '';

  cohortePost = {
    nombre: '',
    terminos: []
  }

  cohorteGet: Cohortes;

  cohorteModify: Cohorte;

  isDataLoaded = false;
  isCohorteLoaded = false;


  resultados: Resultado;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  modifyNombre(id_cohorte, nombreCohorte) {
    return this.http.patch('http://localhost:3000/cohortes/modifyNombre', { id_cohorte, nombreCohorte });
  }

  modifyConceptos(arrayConceptos) {
    return this.http.patch('http://localhost:3000/cohortes/modifyConceptos', { arrayConceptos });
  }

  // Modifica cierta cohorte por la cohorte actual. Si existen conflictos, los omite (solamente agrega).
  updateCohorte(id_cohorte, cohorteActual) {
    if (cohorteActual.length === 0) {
      return;
    }
    console.log(id_cohorte);
    this.http.patch('http://localhost:3000/cohortes/patch', { id_cohorte, cohorteActual })
      .subscribe(
        data => console.log("Cohorte modificada exitosamente!"),
        error => console.log(error),
        () => {
          this.removeAllFromCohorte();
          this.router.navigateByUrl('/cohortes');
        }
      );
  }

  // Obtiene todas las cohortes existentes en la BD.
  getCohortes() {
    this.http.get<Cohortes>('http://localhost:3000/cohortes').subscribe(
      data => this.cohorteGet = data,
      error => console.log(error),
      () => {
        this.isDataLoaded = true;
        console.log('Cohortes cargadas correctamente!');
        console.log(this.cohorteGet);
      }
    );
  }

  getCohorte(id_cohorte) {
    return this.http.get<Cohorte>('http://localhost:3000/cohortes/get', { params: { id_cohorte } });
  }

  // Retorna el numero de conceptos para cierto id_cohorte dentro del objeto cohorteGet
  getNumeroConceptos(id_cohorte) {
    if (this.cohorteGet) {
      let sum = 0;
      let found = false;
      this.cohorteGet.data.cohortes.forEach(cohorte => {
        if (cohorte.cohorte.id_cohorte === id_cohorte) {
          cohorte.conceptos.forEach(concepto => {
            sum++;
          });
          return sum;
        }
      })
      return sum;
    }
  }

  // Retorna el número de cohortes en la BD
  getNumeroCohortes() {
    return this.cohorteGet.data.cohortes.length
  }

  // Agrega una cohorte a la BD, posteriormente redirige a Ver Cohortes.
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
          this.removeAllFromCohorte();
          this.nombreCohorte = "";
          this.router.navigateByUrl('/cohortes');
        }
      );
  }

  // Elimina una cohorte dado un id.
  removeCohorte(id_cohorte) {
    this.http.request('delete', 'http://localhost:3000/cohortes/delete', { body: { id_cohorte } })
      .subscribe(
        data => console.log("Eliminado correctamente"),
        error => console.log(error),
        () => this.getCohortes()
      );
  }

  // Verifica si se encuentra un término en el arreglo de cohortes.
  isChecked(termino) {
    return (this.cohorteActual.findIndex(term => termino.termino_preferido === term.termino_preferido) != -1);
  }

  // Utilizada al cargar el componente resultados. Busca en el arreglo de cohortes si se encuentra algún término checkeado,
  // si es así, setea checked en true.
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

    array[index].checked = $event.checked;

    if (array[index].checked) {
      this.addToArrayCohorte(array[index]);
    } else {
      this.removeFromCohorte(array[index]);
    }
  }

  // Agrega un término al array de cohorte.
  addToArrayCohorte(termino) {
    this.cohorteActual.push(termino);
  }

  // Elimina un término del array de cohorte.
  removeFromCohorte(termino) {
    this.cohorteActual = this.cohorteActual.filter(term => term.concept_id_HIBA != termino.concept_id_HIBA);
  }

  // Vacía el array de cohorte y setea en falso el atributo checked de cada uno de los elementos en el array.
  removeAllFromCohorte() {
    this.cohorteActual.forEach(element => {
      element.checked = false;
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

  setAllAsChecked(array) {
    array.forEach(termino => {
      termino.checked = true;
    });

    console.log(array);
  }
}