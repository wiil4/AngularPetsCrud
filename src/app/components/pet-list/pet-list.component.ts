import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})

export class PetListComponent implements OnInit, AfterViewInit {
  snackBarDuration : number = 700;
  displayedColumns: string[] = ['name', 'age', 'race', 'color', 'weight', 'actions'];
  dataSource = new MatTableDataSource<Pet>();
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!:MatSort;

  constructor(private _snackBar: MatSnackBar, private _petService: PetService) {
  }

  ngOnInit(): void{
    this.getPets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    if(this.dataSource.data.length > 0)
    {
      this.paginator._intl.itemsPerPageLabel = 'Pets Per Page'
    }    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPets(){
    this.loading = true;
    /*this._petService.getPetsBE().subscribe(data=>{
      this.loading = false;
      this.dataSource.data = data;
    }, error => {
      this.loading = false;
      alert("Oops, an error ocurred!");
    });*/
    this._petService.getPetsBE().subscribe({
      next: (data) => {
        this.loading = false;
        this.dataSource.data = data;
      },
      error: (e) => {
        this.loading = false;
        alert("Oops, an error occured!");
      },
      complete: () => console.info('complete')
    })
  }

  deletePet(id:number){
    this.loading = true;
    this._petService.deletePetBE(id).subscribe(() =>{
      this.SuccessMessage();
      this.loading = false;
      this.getPets();
    })    
  }

  SuccessMessage(){
    this._snackBar.open("Pet Correctly Deleted",'',{
      duration: this.snackBarDuration,
      horizontalPosition: 'right'
    });
  }
}
