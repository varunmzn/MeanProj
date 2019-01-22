import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { adminLteConf } from './admin-lte.conf';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { LayoutModule } from 'angular-admin-lte';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { LoadingPageModule, MaterialBarModule } from 'angular-loading-page';


import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { UserComponent } from './user/user.component';
// import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { UserProfileComponent } from './user-profile/user-profile.component';
// import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { UsersService } from './services/users/users-service.service';
import { AssessmentsService,SubjectsService ,QuestionsService  } from './services';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { WelcomeComponent } from './welcome/welcome.component';
import { ListUserComponent } from './user-master/list-user/list-user.component';
import { AddUserComponent } from './user-master/add-user/add-user.component';

// To use material components  
import { MatToolbarModule , MatMenuModule , MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatTableDataSource,MatPaginatorModule,MatSortModule} from '@angular/material';  
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateAssessComponent,ListAssessComponent } from './assessment';
import { CreateQuestionComponent } from './question/create-question/create-question.component';
import { ListQuestionComponent } from './question/list-question/list-question.component';
import { ListSubjectComponent } from './subject/list-subject/list-subject.component';
import { CreateSubjectComponent } from './subject/create-subject/create-subject.component';

import { CKEditorModule } from 'ngx-ckeditor';
import { MultiFilesUploadComponent } from './multi-files-upload/multi-files-upload.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule.forRoot(adminLteConf),
    LoadingPageModule, MaterialBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,  
    BrowserModule,  
    MatToolbarModule , MatMenuModule , MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatPaginatorModule,MatSortModule,
    CKEditorModule  
  ],  
  exports:[  
    MatToolbarModule , MatMenuModule , MatInputModule , MatTableModule ,MatButtonModule,MatCardModule,MatPaginatorModule,MatSortModule  
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    // SignUpComponent,
    UserProfileComponent,
    // SignInComponent,
    WelcomeComponent,
    ListUserComponent,
    AddUserComponent,
    CreateAssessComponent,
    ListAssessComponent,
    CreateQuestionComponent,
    ListQuestionComponent,
    ListSubjectComponent,
    CreateSubjectComponent,
    MultiFilesUploadComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,
  UserService,
  UsersService,
  AssessmentsService,
  SubjectsService ,
  QuestionsService
],
  bootstrap: [AppComponent]
})
export class AppModule {}
