import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'actions'];
  meetings = [];
  length: number = 0;
  totalRecordsPerPage: number = 5;
  meetingNameFind: string =  '';
  meetingDateFind: string = '';

  constructor(private service: MeetingService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.findAll(0, 'meetingDate','');
  }

  findAll(pageNumber: number, sortField: string, filters: string) {

    this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe(meetingReturn => {

      this.meetings = meetingReturn['meeting'];
      this.length = meetingReturn['page'].size;

    }, err => {
      console.log("Error: " + err);
      console.log("Error status: " + err.status);
      console.log("Error error: " + err.console.error);
      console.log("Err headers: " + err.headers);
    });
  }

  getServerData(event?:PageEvent) {
    this.findAll(event.pageIndex, 'meetingDate', null);
  }
}
