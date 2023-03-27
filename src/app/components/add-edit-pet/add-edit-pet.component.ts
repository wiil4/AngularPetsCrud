import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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

  constructor(private fb:FormBuilder, private _petService: PetService, private _snackBar:MatSnackBar, private _router: Router){
    this.form = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      race: ['', Validators.required],
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  ngOnInit():void{
  }

  addPet(){
    //console.log(this.form);
    /*const name = this.form.get('name')?.value;*/
    const name = this.form.value.name;
    
    const pet:Pet = {
      name: this.form.value.name,
      race: this.form.value.race,
      color: this.form.value.color,
      age: this.form.value.age,
      weight: this.form.value.weight
    }

    this._petService.addPetBE(pet).subscribe(data =>{
      //console.log(data);
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
