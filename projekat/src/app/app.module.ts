import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { EnterNewPassComponent } from './enter-new-pass/enter-new-pass.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { PlayerPageComponent } from './player-page/player-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SupervisorPageComponent } from './supervisor-page/supervisor-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { AnagramSupervisorComponent } from './anagram-supervisor/anagram-supervisor.component';
import { ZGSupervisorComponent } from './zgsupervisor/zgsupervisor.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { AnagramGameComponent } from './anagram-game/anagram-game.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { GameOTDPickComponent } from './game-otdpick/game-otdpick.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ZGGameComponent } from './zggame/zggame.component';
import { MyNumberGameComponent } from './my-number-game/my-number-game.component';
import { My5x5GameComponent } from './my5x5-game/my5x5-game.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { Supervisor5x5GameComponent } from './supervisor5x5-game/supervisor5x5-game.component';
import { GameTestModeComponent } from './game-test-mode/game-test-mode.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FirstpageComponent,
    PasswordChangeComponent,
    GuestUserComponent,
    ForgotPasswordComponent,
    AnswerQuestionComponent,
    EnterNewPassComponent,
    PlayerPageComponent,
    AdminPageComponent,
    SupervisorPageComponent,
    AnagramSupervisorComponent,
    ZGSupervisorComponent,
    PlayerStatsComponent,
    AnagramGameComponent,
    RequestsPageComponent,
    GameOTDPickComponent,
    ZGGameComponent,
    MyNumberGameComponent,
    My5x5GameComponent,
    Supervisor5x5GameComponent,
    GameTestModeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
