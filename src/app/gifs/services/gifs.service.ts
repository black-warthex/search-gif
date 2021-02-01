import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  // manera global en vez de importalo en el modulo
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];
  private _apiKey: string = '3Oz2VSwnS1hK0dk2lxcH4zfaf336lAyO';
  private url = 'https://api.giphy.com/v1/gifs';
  //
  public result: Gif[] = [];


  get history(): string[] {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    //cargar el localstorage !indicar que no es nullo y si lo es quede en blanco
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.result = JSON.parse(localStorage.getItem('result')!) || [];

  }

  finGifs(query: string): void {
    // quitar espacios con trim y poner en minuscular
    query = query.trim().toLocaleLowerCase();
    // incluya si no existe
    if (!this._history.includes(query)) {
      // insertar al inicio
      this._history.unshift(query);
      // cortar array hasta 10
      this._history = this._history.splice(0, 10);

      localStorage.setItem('history', JSON.stringify(this._history));
    }
    // sucribe cuando tiene respuesta - gif interface

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', '10')
      .set('q', query);


    //params : params se puede enviar solo params
    this.http.get<SearchGifsResponse>(`${this.url}/search`, { params })
      .subscribe((res) => {
        this.result = res.data;
        localStorage.setItem('result', JSON.stringify(this.result));
      });


  }

}
