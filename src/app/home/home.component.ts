import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Firestore} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

declare var adsbygoogle: any;
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})

export class HomeComponent implements OnInit {
  constructor(public dataService: DataService, public firestore:Firestore, public router:Router,private datePipe: DatePipe ) { }
  currentDate:any
  lotteries: any
  async ngOnInit(): Promise<void> {
      this.lotteries=await this.dataService.fetchData()
      this.sortLotteriesByDate()
      this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy')!;
  }
  

sortLotteriesByDate() {
  this.lotteries.sort((a:any, b:any) => {
    return this.parseDate(b.draw_date).getTime() - this.parseDate(a.draw_date).getTime();
  });
}

private parseDate(dateString: string): Date {
  const parts = dateString.split('/');
  const day = +parts[0]; 
  const month = +parts[1] - 1; 
  const year = +parts[2];
  return new Date(year, month, day);
}


goToResult(id: number) {
 
  this.router.navigate(['/result', id]);
  
}

isNew(drawDate: string): boolean {
  return drawDate === this.currentDate;
}


}
