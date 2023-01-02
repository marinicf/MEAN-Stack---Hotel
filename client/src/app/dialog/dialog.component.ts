import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {FormGroup, NgForm, Validators} from '@angular/forms';
import { BookingService } from '../booking.service';
import { Rezervacija } from '../rezervacija.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  nOsobe:{value:number}[] = [
    {value: 1},
    {value: 2},
    {value: 3},
    {value: 4},
    {value: 5}
  ];
  smjestaj:{value:String}[] = [
    {value: 'Standard'},
    {value: 'Classic'},
    {value: 'Superior'}
  ];
  newRez;
  updateRez;
  @ViewChild('f') form: NgForm
  actionBtn:string = 'Potvrdi'

  constructor(private bookingService: BookingService,
    private dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData:any) { }

  rezForm: FormGroup

  ngOnInit(): void {
    if(this.editData)
    {
      console.log(this.editData);
      console.log(this.form);


      this.actionBtn = 'Izmjeni'
      // this.form.setValue({
      //   datumPrijave: this.editData.datumPrijave,
      //   datumOdjave: this.editData.datumOdjave,
      //   brojOsoba: this.editData.brojOsoba,
      //   smjestej: this.editData.smjestej
      // })
    }

  }
  onSubmit(formData: NgForm){
    if(!this.editData){

      this.newRez = new Rezervacija (
        formData.value.datumPrijave.toLocaleDateString('en-GB'),
        formData.value.datumOdjave.toLocaleDateString('en-GB'),
        formData.value.brojOsoba,
        formData.value.smjestej
      )
      console.log(this.newRez);

      this.bookingService.addRez(this.newRez).subscribe({
        next:(res) => {
          alert('Rezervirano')
          console.log(res);
          this.form.reset()
          this.dialogRef.close('save')
        },
        error:()=>{
          alert('Error')
        }
      })
    }else{
      this.UpdateRez()
    }
  }
  UpdateRez(){
    console.log(this.form);

    this.updateRez = new Rezervacija(
      this.form.value.datumPrijave.toLocaleDateString('en-GB'),
      this.form.value.datumOdjave.toLocaleDateString('en-GB'),
      this.form.value.brojOsoba,
      this.form.value.smjestej
    )
    this.bookingService.putRez(this.updateRez, this.editData._id).subscribe(resData =>{
      alert('Rezervacija izmjenjena')
      this.form.reset()
      this.dialogRef.close('update')
    })
  }
}
