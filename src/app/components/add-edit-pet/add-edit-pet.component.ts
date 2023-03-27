import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from 'src/app/interfaces/pet';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css']
})
export class AddEditPetComponent implements OnInit{
  snackBarDuration : number = 700;
  loading: boolean = false;
  form: FormGroup;
  id: number;
  operation: string = 'ADD NEW';

  constructor(private fb:FormBuilder, private _petService: PetService,
     private _snackBar:MatSnackBar, private _router: Router, private aRoute: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      race: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit():void{
    if(this.id != 0)
    {
      this.operation = 'EDIT';
      this.getPet(this.id);
    }
  }

  getPet(id:number){
    this.loading = true
    this._petService.getPetBE(this.id).subscribe(data =>{
      this.form.setValue({
        name: data.name,
        race: data.race,
        color: data.color,
        age: data.age,
        weight: data.weight
      })
      this.loading = false;
    })
  }

  addEditPet(){
    //console.log(this.form);
    //const name = this.form.get('name')?.value;*
    //const name = this.form.value.name;    
    const pet:Pet = {
      name: this.form.value.name,
      race: this.form.value.race,
      color: this.form.value.color,
      age: this.form.value.age,
      weight: this.form.value.weight
    }
    if(this.id!=0){
      pet.id = this.id;
      this.updatePet(this.id,pet);
    }
    else{
      this.addNewPet(pet);
    }
  }

  addNewPet(nPet: Pet){
    this._petService.addPetBE(nPet).subscribe(data =>{
      this.SuccessMessage();
      this._router.navigate(['/petList']);
    })
  }

  updatePet(id:number, pet:Pet){
    this.loading = true;
    this._petService.updatePetBe(id,pet).subscribe( ()=>{      
      this.loading = false;
      this.SuccessMessage();
      this._router.navigate(['/petList']);
    })
  }

  SuccessMessage(){
    this._snackBar.open("Pet Added Correctly",'',{
      duration: this.snackBarDuration,
      horizontalPosition: 'right'
    });
  }
}
