import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  ValidationErrors,
  Validators,
} from '@angular/forms';

export function httpsUrlValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;
  if (value && !value.startsWith('https://')) { // <-- თუ არასწორია ვალიდაცია დააბრუნე true რადგან, AbstractControl ი გვიბრუნებს ობიექტს შეცდომებით ან არაფერს
    return { httpsUrl: true };
  }
  return null;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'forms';
  emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  product = {
    name: '',
    comment: '',
    quantity: null,
  };

  onSubmit(form: NgForm) {
    let isValid = form.valid; // <-- აბრუნებს true თუ ფორმა ვალიდურია და false თუ არასწორია

    if (isValid) {
      let parsedValue = JSON.stringify(form.value);
      alert(parsedValue);
      form.reset(); // <-- დაარესეტებს ჩვენს ფორმას
    } else {
      alert('ფორმა არასწორია');
    }
  }

  // Reactive Forms
  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      website: ['', [Validators.required, httpsUrlValidator]],
    });
  }

  Register() {
    if (this.registrationForm.valid) {
      alert(JSON.stringify(this.registrationForm.value));
    } else {
      alert('ფორმა არასწორია');
    }
  }
}
