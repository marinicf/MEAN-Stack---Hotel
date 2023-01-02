import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { BookingService } from '../booking.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Rezervacija } from '../rezervacija.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  allRez: Rezervacija[]
  displayedColumns: string[] = ['ID', 'datumPrijave', 'datumOdjave', 'brojOsoba', 'smjestej', 'action'];
  dataSource: MatTableDataSource<Rezervacija>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.getAllRez()
  }
  openDialog() {
    this.dialog.open(DialogComponent,{
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllRez()
      }
    });
  }
  getAllRez(){
    this.bookingService.dajSveRez().subscribe(
      (resData: Rezervacija[]) =>{
        this.allRez = resData;
        console.log(resData);
        this.dataSource = new MatTableDataSource(resData)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      },
      (err) => {
        console.log(err)
      }
    )
  }

  onCreateRez(rezData: Rezervacija){
    console.log(rezData);

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEditClick(row:any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val =>{
      if(val === 'update'){
        this.getAllRez()
      }
    });
  }
  onDeleteRez(id){
    this.bookingService.deleteRez(id).subscribe((res)=>{
      alert('Obrisano')
      this.getAllRez()
    })
  }
}
