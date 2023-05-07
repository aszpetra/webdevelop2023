import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/models/User';
import { Reading } from '../../shared/models/Reading';
import { ReadingService } from '../../shared/services/reading.service';
import { Meter } from '../../shared/models/Meter';
import { MeterService } from '../../shared/services/meter.service';

@Component({
  selector: 'app-meter-reading',
  templateUrl: './meter-reading.component.html',
  styleUrls: ['./meter-reading.component.scss']
})
export class MeterReadingComponent implements OnInit {

  user?: User;
  meter_id?: string;
  update_current?: number;

  readingForm = this.createForm({
    id: '',
    user_id: '',
    date: 0,
    reading: 0,
    meter: '',
  })


  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private readingService: ReadingService,
    private meterService: MeterService
    ) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.readingForm.get('user_id')?.setValue(this.user?.id);
    }, error => {
      console.error(error);
    });
  }

  getMeterName(meter?: Meter) {
    this.readingForm.get('meter')?.setValue(meter?.name);
    this.meter_id = meter?.id
  }

  createForm(model: Reading) {
    let formGroup = this.fb.group(model);
    formGroup.get('reading')?.addValidators([Validators.required]);
    formGroup.get('meter')?.addValidators([Validators.required]);
    return formGroup;
  }

  addReading() {
    if (this.readingForm.valid) {
      if (this.readingForm.get('reading') && this.readingForm.get('meter')) {
        this.readingForm.get('date')?.setValue(new Date().getTime());
        
        this.meterService.updateCurrent(this.meter_id as string, this.update_current as number)

        this.readingService.create(this.readingForm.value).then(_ => {
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

}
