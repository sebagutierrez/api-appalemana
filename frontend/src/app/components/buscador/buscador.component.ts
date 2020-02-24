import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSearch } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  searchInput = '';

  faSearch = faSearch;

  constructor(
    private router: Router
  ) { }

  onNewSearch() {
    if (this.searchInput.length) {
      this.searchInput.toUpperCase()
      this.router.navigateByUrl(`/results/${this.searchInput}`);
    }

  }

  ngOnInit(): void {

  }


}
