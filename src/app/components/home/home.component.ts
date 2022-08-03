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
  nextRaceDateConverted: string = ''
  nextRaceTD: string = '';
  nextRaceLoading: boolean = true;
  nextRaceUTCtime: string = '';
  nextRaceLocaltime: string = '';
  tempDate: string = ';'
  newDate = Date();
  demo: string = '';
  
  

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

      this.nextRaceDateConverted = createdDateTime.toString().slice(4, -33);
      var countDownDate =  new Date(this.nextRaceDateConverted).getTime();
      var x = setInterval(()=>{
          var now = new Date().getTime();
          var difference = countDownDate - now;
          var days = Math.floor(difference/(1000*60*60*24));
          var hours = Math.floor((difference % (1000*60*60*24)) / (1000*60*60));
          var minutes = Math.floor((difference % (1000*60*60)) / (1000*60));
          var seconds = Math.floor((difference % (1000*60)) / 1000);
          this.demo = days + 'D ' +  hours + "H " + minutes + "M " + seconds + "S ";
      })
      // Set loading to false
      this.nextRaceLoading = false;
    });


  }

}
