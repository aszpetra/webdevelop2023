import { Component, Output, OnInit, OnChanges, EventEmitter } from '@angular/core';
import { MeterService } from '../../../shared/services/meter.service';
import { UserService } from '../../../shared/services/user.service';
import { Meter } from '../../../shared/models/Meter';
import { User } from '../../../shared/models/User';

@Component({
  selector: 'meter-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnChanges {

  meterInput: Array<Meter> = [];
  @Output() meterEmitter: EventEmitter<Meter> = new EventEmitter();
  chosenGasmeter?: Meter;
  user?: User;

  constructor(private meterService: MeterService, private userService: UserService) { 
    
  }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.meterService.getMetersByUserId(this.user?.id as string).subscribe(meters =>{
        this.meterInput = meters;
      }, error => {
        console.error(error);
      });
    }, error => {
      console.error(error);
    });
    
    this.chosenGasmeter = this.meterInput[0];
    this.reload();
  }

  ngOnChanges() {
    if (this.meterInput) {
      this.chosenGasmeter = this.meterInput[0];
      this.reload();
    }
  }
  
  reload() {
    this.meterEmitter.emit(this.chosenGasmeter);
  }

}
