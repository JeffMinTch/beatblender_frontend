import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BasicLicense } from '../basic-licenses/basic-licenses.component';


export interface FullLicense {
  image: string;
  id: string,
  title: string;
  extensionPrice: number;
  downloadContractLink: string;
  status: 'active' | 'inactive';
  mixedIns: BasicLicense[];
  // copyrightOwner: string,
  // downloadSampleLink: string;
}

const ELEMENT_DATA: FullLicense[] = [
  {
    image: 'typ11.jpg', id: '040-498-657', title: 'A New Hope', extensionPrice: 12, downloadContractLink: '', status: 'inactive', mixedIns: [
      { image: 'typ.jpg', id: '010-312-313', title: 'I Got U', copyrightOwner: 'Jar Jar', extensionPrice: 12, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'frau.jpg', id: '345-456-243', title: 'Ocean Drive', copyrightOwner: 'Duke Dumont', extensionPrice: 2, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'typ2.jpg', id: '983-643-453', title: 'Pippi Langstrumpf', copyrightOwner: 'Astrid Lindgren', extensionPrice: 1, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      
    ]

  },
  {
    image: 'typ11.jpg', id: '040-498-657', title: 'A New Hope', extensionPrice: 12, downloadContractLink: '',status: 'inactive', mixedIns: [
      { image: 'typ.jpg', id: '010-312-313', title: 'I Got U', copyrightOwner: 'Jar Jar', extensionPrice: 12, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'frau.jpg', id: '345-456-243', title: 'Ocean Drive', copyrightOwner: 'Duke Dumont', extensionPrice: 2, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'typ2.jpg', id: '983-643-453', title: 'Pippi Langstrumpf', copyrightOwner: 'Astrid Lindgren', extensionPrice: 1, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      
    ]

  },
  {
    image: 'typ11.jpg', id: '040-498-657', title: 'A New Hope', extensionPrice: 12, downloadContractLink: '', status: 'inactive', mixedIns: [
      { image: 'typ.jpg', id: '010-312-313', title: 'I Got U', copyrightOwner: 'Jar Jar', extensionPrice: 12, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'frau.jpg', id: '345-456-243', title: 'Ocean Drive', copyrightOwner: 'Duke Dumont', extensionPrice: 2, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      { image: 'typ2.jpg', id: '983-643-453', title: 'Pippi Langstrumpf', copyrightOwner: 'Astrid Lindgren', extensionPrice: 1, downloadSampleLink: 'H', downloadContractLink: 'csacsac' },
      
    ]

  }

];


@Component({
  selector: 'app-extended-licenses',
  templateUrl: './extended-licenses.component.html',
  styleUrls: ['./extended-licenses.component.scss']
})
export class ExtendedLicensesComponent implements OnInit {

  // dataSource: MatTableDataSource<PeriodicElement>;
  // displayedColumns: string[];
  dataSource = new MatTableDataSource<FullLicense>(ELEMENT_DATA);
  displayedColumns = ['image', 'id', 'title', 'copyrightOwner', 'extensionPrice', 'downloadSampleLink', 'downloadContractLink'];
  displayedFullLicenseColumns = ['image','id','title', 'extensionPrice', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.displayedColumns = ['position', 'name', 'weight', 'symbol', 'c'];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource.d
  }

  getData(dataSource) {
    const array: Array<any> = new Array<any>();
    array.push(dataSource);
    return array;
  }

  getMixedInTableData(mixedIns): MatTableDataSource<BasicLicense> {
    const dataSource = new MatTableDataSource<BasicLicense>(mixedIns);
    return dataSource;
  }
}
