import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import {LoginComponent } from './user/login/login.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: LoginComponent,
        children: [{ path: '', component: LoginComponent }]
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }
];