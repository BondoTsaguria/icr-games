import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from 'src/app/features/auth/sign-up/sign-up.component';
import { DetailsComponent } from 'src/app/features/details/details.component';
import { HomeComponent } from 'src/app/features/home/home.component';
import { AboutUsComponent } from 'src/app/features/info/about-us/about-us.component';
import { FaqComponent } from 'src/app/features/info/faq/faq.component';

import { SignUpGuard } from 'src/app/features/auth/signUp.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:game-search', component: HomeComponent },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [SignUpGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
