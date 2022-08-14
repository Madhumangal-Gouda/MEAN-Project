import { Component,  OnInit, ViewChild} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: [ './addform.component.css']
})
export class AddformComponent implements OnInit {
  title = 'empdetails';
  displayedCard: string[] = [ 'name', 'position', 'price', 'officename', 'action' ];
  dataSource!: MatTableDataSource<any>;
  
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  constructor(private api : ApiService) {}


  ngOnInit(): void {
    this.getAllProduct()
  }
  getAllProduct(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource();
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort
      },
      error:(err)=>{
        alert('error while fetching data')
      }
    })
  }
  
}
