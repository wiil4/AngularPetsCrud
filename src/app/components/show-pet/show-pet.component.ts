import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/interfaces/pet';
import { PetService } from 'src/app/services/pet.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-show-pet',
  templateUrl: './show-pet.component.html',
  styleUrls: ['./show-pet.component.css']
})
export class ShowPetComponent implements OnInit {
  id: number;
  //pet! : Pet;
  loading:boolean = false;

  //Observable, working with pipe async
  pet$!: Observable<Pet>

  constructor(private _petService: PetService, private aRoute: ActivatedRoute){
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void{
    this.loading = true;
    //requesting pet by id with pipe async
    this.pet$ = this._petService.getPetBE(this.id);
    if(this.pet$ != null)
    {
      this.loading = false;
    }
    //this.getPet();
  }

  /*getPet(){
    this._petService.getPetBE(this.id).subscribe({
      next:(data) => this.pet = data,
      error: (error) => alert(`Oops! some data is missing`),
      complete: () => console.info(`Completed`)
    })
  }*/
}
