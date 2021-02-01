import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  //busca en html el elemento de referencia local #txtSearch
  //no null !: decir a ts que nunca va ser nulo
  @ViewChild('txtSearch') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  search(): void {
    const value = this.txtBuscar.nativeElement.value;
    if (value.trim().length === 0) {
      return;
    }
    this.gifsService.finGifs(value);
    this.txtBuscar.nativeElement.value = '';
  }

}
