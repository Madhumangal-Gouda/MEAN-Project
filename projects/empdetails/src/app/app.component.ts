import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent} from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api.service';
import {AfterViewInit, } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'empdetails';
  displayedColumns: string[] = [ 'name', 'position', 'price', 'officename', 'action' ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(public dialog: MatDialog, private api : ApiService) {}
  
  ngOnInit(): void {
    this.getAllEmployee();
  }

  openLogin(){
    this.dialog.open(LoginComponent,{
      
    })
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:"50%"
      // data: {
      //   animal: 'panda',
      // },
    }).afterClosed().subscribe(valu =>{
      if(valu=='save'){
        this.getAllEmployee();
      }
    })
  }
  getAllEmployee(){
    this.api.getEmployee()
    .subscribe({
      next:(res)=>{
        // console.log(res)
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching Record!!")
      }
    })
  }
  
  editEmployee(row: any){
    this.dialog.open(DialogComponent,{
      width:'50%',
      data:row
    }).afterClosed().subscribe(valu =>{
      if(valu=='update'){
        this.getAllEmployee()
      }
    })
  }
  employeeDelete(_id:number){
    this.api.deleteEmployee(_id)
    .subscribe({
      next:(res)=>{
        alert('Delete One Employee Successfully')
        this.getAllEmployee()
      },
      error:(err)=>{
        alert('Error while deleting')
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  tabLoadTimes: Date[] = [];

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
  

