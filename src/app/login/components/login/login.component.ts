import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorModel } from 'src/app/doctor/models/doctor.model';
import { DoctorService } from 'src/app/doctor/services/doctor.service';
import { LocalStorageKeysEnum } from 'src/app/shared/local-storage/local-storage-keys.enum';
import { AlertService } from 'src/app/shared/services/utils/alert.service';
import { NavigationService } from 'src/app/shared/services/utils/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup = this.formBuilder.group({});
  public subscription: Subscription = new Subscription();

  constructor(
    private service: DoctorService,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private navigationService: NavigationService
  ) { }

  public ngOnInit(): void {
    this.generateForm();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public login(): void {
    console.log(this.loginData);
    this.subscription = this.service.login(this.loginData.username, this.loginData.password).subscribe(
      doctor => this.manageSuccessLogin(doctor),
      error => this.manageErrorLogin(error)
    );
  }

  private manageSuccessLogin(doctor: DoctorModel): void {
    if (doctor) {
      localStorage.setItem(LocalStorageKeysEnum.DOCTOR, JSON.stringify(doctor));
      this.alert.success('Bem-vindo', `Olá Dr(a). ${doctor.fullname} :)`);
      this.navigationService.navigateTo('dashboard');
    } else {
      this.alert.error('Acesso negado', 'Usuário ou senha inválidos. Por favor, tente novamente.');
    }
  }

  private manageErrorLogin(err: any): void {
    console.error(err);
    this.alert.error('Acesso negado', 'Usuário ou senha inválidos. Por favor, tente novamente.');
  }

  private generateForm(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get loginData() {
    return this.form.getRawValue();
  }

}
