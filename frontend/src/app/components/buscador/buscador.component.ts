import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  enteredValue = '';
  searchInput = '';

  constructor(
    private router: Router
  ) { }

  onNewSearch() {
    this.searchInput = this.enteredValue;



    this.router.navigateByUrl(`/results/${this.enteredValue}`);


  }

  ngOnInit(): void {

  }


}
