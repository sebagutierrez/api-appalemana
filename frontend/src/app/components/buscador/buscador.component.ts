import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TerminoBusqueda, ObjetoAutocomplete } from './buscador.model';
import { ResultadosService } from 'src/app/services/resultados.service';
import { finalize, tap, switchMap, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {

  searchForm: FormGroup;
  resultsAutocomplete: ObjetoAutocomplete = null;
  isLoading = false;

  faSearch = faSearch;

  constructor(
    private router: Router,
    private resultadosService: ResultadosService,
    private fb: FormBuilder
  ) { }

  onNewSearch() {
    if (this.searchForm.controls['searchInput'].value.length) {
      this.searchForm.controls['searchInput'].value.toUpperCase();
      this.router.navigateByUrl(`/results/${this.searchForm.controls['searchInput'].value}`);
      this.searchForm.controls['searchInput'].setValue("");
    }

  }

  ngOnInit(): void {

    // Autocomplete
    this.searchForm = this.fb.group({
      searchInput: null
    });
    this.searchForm
      .get('searchInput')
      .valueChanges
      .pipe(
        debounceTime(300)
      )
      .pipe(
        switchMap(query =>
          this.resultadosService.getAutocomplete(query)
        )
      )
      .subscribe(result => {
        console.log(result);
        this.resultsAutocomplete = result;
        console.log(this.resultsAutocomplete);
      });
  }
}