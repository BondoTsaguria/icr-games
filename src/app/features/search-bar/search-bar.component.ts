import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  isAuthenticated = false;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['search', form.value.search]);
  }

  onLogin() {
    this.dialog.open(LoginComponent, {
      width: '60%',
      height: '400px',
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
