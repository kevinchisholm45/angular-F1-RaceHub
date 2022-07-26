import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  //Function calls for next race counter method
  nextRace: any = {};
  nextRaceTime: string = '';
  nextRaceTimeConverted: string = '';
  nextRaceTD: string = '';
  nextRaceLoading: boolean = true;
  nextRaceUTCtime: string = '';
  nextRaceLocaltime: string = '';
  newDate = Date();
  

  text: any = {
    Year: 'Y',
    Month: 'M',
    Weeks: 'W',
    Days: 'Days',
    Hours: 'Hours',
    Minutes: 'Mins',
    Seconds: 'Secs',
    MilliSeconds: 'ms',
  };
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    //Info for next race countdown
    this.dataService.getNextRace().subscribe((res) => {
      this.nextRace = res.MRData.RaceTable.Races; 

      this.nextRaceTD = this.nextRaceTime.concat(
        res.MRData.RaceTable.Races[0].date,
        'T',
        res.MRData.RaceTable.Races[0].time
      );
      
      this.nextRaceUTCtime = res.MRData.RaceTable.Races[0].time.slice(0, -4);
      var createdDateTime = new Date(this.nextRaceTD);
      this.nextRaceTimeConverted = createdDateTime.toString().slice(16, -33);
      // Set loading to false
      this.nextRaceLoading = false;
    });


  }

}
