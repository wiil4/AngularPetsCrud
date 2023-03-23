import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from 'src/app/interfaces/pet';

@Component({
  selector: 'app-add-edit-pet',
  templateUrl: './add-edit-pet.component.html',
  styleUrls: ['./add-edit-pet.component.css']
})
export class AddEditPetComponent implements OnInit{
  loading: boolean = false;
  form: FormGroup;

  constructor(private fb:FormBuilder){
    this.form = fb.group({
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

    console.log(pet);

  }
}
