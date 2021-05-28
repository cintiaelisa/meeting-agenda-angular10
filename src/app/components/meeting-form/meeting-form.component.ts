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

  constructor(

    private service: MeetingService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MeetingFormComponent>,
    //@Optional @Inject(MAT_DIALOG_DATA) public data: string) {}

  ) { }

  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id : [null],
      meetingName : ['', Validators.required],
      meetingSubject : ['', Validators.required],
      meetingResponsible : ['', Validators.required],
      meetingDate : ['', Validators.required],
      meetingTime : ['', Validators.required],
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
    //window.location.reload();

  }

  update(){

    this.service.update(this.meetingForm.value).subscribe( result => {
      console.log('Meeting insert', result);
    },
    err => {
      console.log('Err ', err);
    });

    this.dialogRef.close(true);
    this.meetingForm.reset();
    //window.location.reload();
  }

}
