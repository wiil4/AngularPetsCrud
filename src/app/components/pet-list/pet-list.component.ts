import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

const petsList: Pet[] = [
  {name:'Albus', age:5, race:'Westie', color: 'White', weight: 9},  
  {name:'Milton', age:7, race:'Golden', color:'Dorado', weight:7},
  {name:'Benito', age:4, race:'Criollo', color:'Orange', weight:4},
  {name:'Aquiles', age:10, race:'Labrador', color:'Black', weight:12},  
  {name:'Jose', age:14, race:'Persa', color:'White', weight:6},
  {name:'Snow', age:1, race:'German', color:'Brown', weight:17},
  {name:'Jhon', age:3, race:'Poodle', color:'Gray', weight:8},
  {name:'Luis', age:12, race:'ShihTzu', color:'Black and White', weight:3.5}
];

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})

export class PetListComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'age', 'race', 'color', 'weight', 'actions'];
  dataSource = new MatTableDataSource<Pet>(petsList);

  @ViewChild(MatPaginator) paginator!: MatPaginator;  
  @ViewChild(MatSort) sort!:MatSort;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = 'Pets Per Page'
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
