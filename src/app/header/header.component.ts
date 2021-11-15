import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { DataStorageService } from './../services/data-storage.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  isAuthenticated: boolean = false;
  private userSub: Subscription;
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {}

  ngOnInit(): void {

    this.userSub = this.authService.user.subscribe((user) => {
      // using ! ! (2 x !) because one is for determining if user is null;
      // and other is deciding if user is null, return false to isAuthenticated
      // in simple form, it just means ( if (user != null) return true else return false  )
      this.isAuthenticated = !!user;
    });
  }
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
