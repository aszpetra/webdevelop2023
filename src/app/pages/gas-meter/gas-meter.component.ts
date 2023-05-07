import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/User';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { MeterService } from '../../shared/services/meter.service';
import { Meter } from '../../shared/models/Meter';

@Component({
  selector: 'app-gas-meter',
  templateUrl: './gas-meter.component.html',
  styleUrls: ['./gas-meter.component.scss']
})
export class GasMeterComponent implements OnInit {

  user?: User;
  meters: Array<Meter> = [];
  meterForm = this.createForm({
    id:'',
    user_id: '',
    name: '',
    start: 0,
    current: 0,
  });
  

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private meterService: MeterService) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(user.uid).subscribe(data => {
      this.user = data;
      this.meterForm.get('user_id')?.setValue(this.user?.id);
      this.meterService.getMetersByUserId(this.user?.id as string).subscribe(meters => {
        this.meters = meters;
      }, error => {
        console.error(error);
      });
    }, error => {
    console.error(error);
    });
  }

  createForm(model: Meter) {
    let formGroup = this.fb.group(model);
    formGroup.get('name')?.addValidators([Validators.required]);
    formGroup.get('start')?.addValidators([Validators.required]);
    return formGroup;
  }

  addMeter() {
    if (this.meterForm.valid) {
      if (this.meterForm.get('name') && this.meterForm.get('start')) {
          const values = this.meterForm.getRawValue();
          this.meterForm.get('current')?.setValue(values.start);
          this.meterService.create(this.meterForm.value).then(_ => {
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

}
