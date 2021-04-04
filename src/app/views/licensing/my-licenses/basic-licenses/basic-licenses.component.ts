import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  c: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', c: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', c: 'H'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', c: 'H'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', c: 'H'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', c: 'H'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', c: 'H'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', c: 'H'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', c: 'H'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', c: 'H'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', c: 'H'},
];



@Component({
  selector: 'app-basic-licenses',
  templateUrl: './basic-licenses.component.html',
  styleUrls: ['./basic-licenses.component.scss']
})
export class BasicLicensesComponent implements OnInit {

    // dataSource: MatTableDataSource<PeriodicElement>;
  // displayedColumns: string[];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  displayedColumns   = ['position', 'name', 'weight', 'symbol', 'c'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    // this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'c'];
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
