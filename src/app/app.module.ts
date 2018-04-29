import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

//import { CustomMaterialModule } from './custom-material.module';
import { CustomPrimeNGModule } from './custom-primeng.module';

import {RestDatabaseService as DatabaseService} from './services/rest-database.service';
import {GeneratePasswordService} from './services/generate-password.service';
import {SessionService} from './services/session.service';

import { AppComponent } from './app.component';
import {PlayerListComponent} from './player-list.component';
import {EditPlayerComponent} from './edit-player.component';
import {RegimeListComponent} from './regime-list.component';
import {EditRegimeComponent} from './edit-regime.component';
import {MainToolbarComponent} from './main-toolbar.component';

const appRoutes: Routes = [
    {path: 'players', component: PlayerListComponent},
    {path: 'player/:id', component: EditPlayerComponent},
    {path: 'regimes', component: RegimeListComponent},
    {path: 'regime/:id', component: EditRegimeComponent}
];

@NgModule({
  declarations: [
      AppComponent,
      PlayerListComponent,
      EditPlayerComponent,
      RegimeListComponent,
      EditRegimeComponent,
      MainToolbarComponent
  ],
  imports: [
      RouterModule.forRoot(appRoutes),
      BrowserModule,
      HttpClientModule,
      // JwtModule.forRoot({
      //     config: {
      //         tokenGetter: () => localStorage.getItem('access_token')
      //     }
      // }),
      BrowserAnimationsModule,
      FormsModule,
      CustomPrimeNGModule
  ],
  providers: [
      DatabaseService,
      GeneratePasswordService,
      SessionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
