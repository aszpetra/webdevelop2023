import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Reading } from '../../shared/models/Reading';
import { ReadingService } from '../../shared/services/reading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user?: User;
  readings: Array<Reading> = [];


  constructor(private userService: UserService, private readingService: ReadingService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.readingService.getReadingsByUserId(this.user?.id as string).subscribe(readings => {
        this.readings = readings;
    }, error => {
      console.error(error);
    });
    
    })
  }

  delete(id: string){
    this.readingService.delete(id);
  }

}
