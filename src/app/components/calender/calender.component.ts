import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.services';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  raceCalendar: any = {};
  raceCalendarLoading: boolean = true;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCalendar().subscribe((res) => {
      this.raceCalendar = res.MRData.RaceTable;
      
      this.raceCalendarLoading = false;
    });
  }

}
