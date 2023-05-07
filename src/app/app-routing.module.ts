import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
  { path: 'main', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule), canActivate: [AuthGuard] },
  { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) }, 
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) },
  { path: 'not-found', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reading', loadChildren: () => import('./pages/meter-reading/meter-reading.module').then(m => m.MeterReadingModule), canActivate: [AuthGuard] },
  { path: 'gas-meter', loadChildren: () => import('./pages/gas-meter/gas-meter.module').then(m => m.GasMeterModule), canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
