import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: AppService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.service.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/taks-list']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciais inválidas';
      },
    });
  }
}
