import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm!: FormGroup;
  public idEdit: string;

  constructor(

    private service: MeetingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string

  ) { 
    this.idEdit = data;
  }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id : [null],
      meetingName : ['', Validators.required],
      meetingSubject : ['', Validators.required],
      meetingResponsible : ['', Validators.required],
      meetingDate : ['', Validators.required],
      meetingTime : ['', Validators.required],
    });

    if(this.idEdit != null) {
      this.getById();
    }
  }

  getById() {
    this.service.getById(this.idEdit).subscribe( result => {
      this.meetingForm = this.fb.group({
        id : [result['id'], Validators.required],
        meetingName : [result['meetingName'], Validators.required],
        meetingSubject : [result['meetingSubject'], Validators.required],
        meetingResponsible : [result['meetingResponsible'], Validators.required],
        meetingDate : [result['meetingDate'], Validators.required],
        meetingTime : [result['meetingTime'], Validators.required],
      });
    },
    err => {
      console.log('Err ', err);
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(){

    if(this.meetingForm.value.id == null) {

      this.create();

    } else {

      this.update();

    }

  }

  create(){

    this.service.insert(this.meetingForm.value).subscribe( result => {
      console.log('Meeting insert', result);
    },
    err => {
      console.log('Err ', err);
    });

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();

  }

  update(){

    this.service.update(this.meetingForm.value).subscribe( result => {
      console.log('Meeting update', result);
    },
    err => {
      console.log('Err ', err);
    });

    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.location.reload();
  }

}
