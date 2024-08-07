import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/shared/interfaces/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  sort!: string;
  games!: Array<Game>;
  private routeSub!: Subscription;
  private gameSub!: Subscription;
  bang!: object;
  isAuthenticated = false;
  isMenuOpen = false;

  constructor(
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.getIsAuth();
    this.authService.getAuthStatusListener().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
