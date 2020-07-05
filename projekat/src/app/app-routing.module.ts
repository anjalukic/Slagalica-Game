import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RegisterComponent } from './register/register.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { GuestUserComponent } from './guest-user/guest-user.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AnswerQuestionComponent } from './answer-question/answer-question.component';
import { EnterNewPassComponent } from './enter-new-pass/enter-new-pass.component';
import { PlayerPageComponent } from './player-page/player-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { SupervisorPageComponent } from './supervisor-page/supervisor-page.component';
import { AnagramSupervisorComponent } from './anagram-supervisor/anagram-supervisor.component';
import { ZGSupervisorComponent } from './zgsupervisor/zgsupervisor.component';
import { PlayerStatsComponent } from './player-stats/player-stats.component';
import { AnagramGameComponent } from './anagram-game/anagram-game.component';
import { RequestsPageComponent } from './requests-page/requests-page.component';
import { GameOTDPickComponent } from './game-otdpick/game-otdpick.component';
import { ZGGameComponent } from './zggame/zggame.component';
import { MyNumberGameComponent } from './my-number-game/my-number-game.component';
import { My5x5GameComponent } from './my5x5-game/my5x5-game.component';
import { Supervisor5x5GameComponent } from './supervisor5x5-game/supervisor5x5-game.component';
import { GameTestModeComponent } from './game-test-mode/game-test-mode.component';


const routes: Routes = [
  {path : '', component: FirstpageComponent},
  {path : 'Login', component: LoginComponent},
  {path : 'Register', component: RegisterComponent},
  {path : 'PswChange', component: PasswordChangeComponent},
  {path: 'Guest', component: GuestUserComponent},
  {path: 'ForgotPsw', component: ForgotPasswordComponent},
  {path: 'Question', component: AnswerQuestionComponent},
  {path: 'NewPass', component: EnterNewPassComponent},
  /*{path: 'player',
  component: PlayerPageComponent,
  canActivate: [RouteForbidService]},*/
  {path: 'player', component: PlayerPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'supervisor', component: SupervisorPageComponent},
  {path: 'anagramSup', component: AnagramSupervisorComponent},
  {path: 'zgSup', component: ZGSupervisorComponent},
  {path: 'myStats', component: PlayerStatsComponent},
  {path: 'anagramGame', component: AnagramGameComponent},
  {path: 'requestsPage', component: RequestsPageComponent},
  {path: 'gameOTDPick', component: GameOTDPickComponent},
  {path: 'zgGame', component: ZGGameComponent},
  {path: 'myNumberGame', component: MyNumberGameComponent},
  {path: 'my5x5Game', component: My5x5GameComponent},
  {path: '5x5Sup', component: Supervisor5x5GameComponent},
  {path: 'testMode', component: GameTestModeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
