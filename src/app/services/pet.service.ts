import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Pet } from '../interfaces/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Pet/';

  constructor(private http: HttpClient) { }

  getPetsBE(): Observable<Pet[]>{
    //console.log(`${this.myAppUrl}${this.myApiUrl}`);
    return this.http.get<Pet[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  getPetBE(id:number): Observable<Pet>{
    return this.http.get<Pet>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  deletePetBE(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  addPetBE(pet:Pet): Observable<Pet>{
    return this.http.post<Pet>(`${this.myAppUrl}${this.myApiUrl}`, pet);
  }
  updatePetBe(id:Number, pet:Pet): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`,pet);
  }
}
