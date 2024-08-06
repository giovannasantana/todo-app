import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  onLogin() {
    this.service.login(this.email, this.password).subscribe({
      next: () => {
      console.log("entrei")
        this.router.navigate(['/taks-list']); // Redireciona para a tela de tarefas
      },
      error: (err) => {
      console.log("entrei222")
        this.errorMessage = 'Credenciais inválidas';
        console.error('Erro ao autenticar', err);
      }
    });
  }
}
