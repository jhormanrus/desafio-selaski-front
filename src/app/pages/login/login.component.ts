import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private sUser: UserService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm =  this.fb.group({
      email: ['ruswel@example.com', Validators.required],
      password: ['456789', Validators.required]
    })
  }

  handleLogin() {
    const body: UserLogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.sUser.login(body.email, body.password).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token)
        this.router.navigate(['/orders'])
      }
    })
  }
}
