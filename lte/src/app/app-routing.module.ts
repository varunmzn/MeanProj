import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddUserComponent } from './user-master/add-user/add-user.component';
import { ListUserComponent } from './user-master/list-user/list-user.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
  path: '',
  data: {
      title: 'Get Started'
  },
  children: [
    {
      path: '',
      component: HomeComponent
    }, {
      path: 'accordion',
      loadChildren: './+accordion/accordion.module#AccordionModule',
      data: {
        title: 'Accordion'
      }
    }, {
      path: 'alert',
      loadChildren: './+alert/alert.module#AlertModule',
      data: {
        title: 'Alert',
      }
    }, {
      path: 'layout',
      data: {
        title: 'Layout',
      },
      children: [
        {
          path: 'configuration',
          loadChildren: './+layout/configuration/configuration.module#ConfigurationModule',
          data: {
            title: 'Configuration'
          }
        }, {
          path: 'custom',
          loadChildren: './+layout/custom/custom.module#CustomModule',
          data: {
            title: 'Disable Layout'
            // disableLayout: true
          }
        }, {
          path: 'content',
          loadChildren: './+layout/content/content.module#ContentModule',
          data: {
            title: 'Content'
          }
        }, {
          path: 'header',
          loadChildren: './+layout/header/header.module#HeaderModule',
          data: {
            title: 'Header'
          }
        }, {
          path: 'sidebar-left',
          loadChildren: './+layout/sidebar-left/sidebar-left.module#SidebarLeftModule',
          data: {
            title: 'Sidebar Left'
          }
        }, {
          path: 'sidebar-right',
          loadChildren: './+layout/sidebar-right/sidebar-right.module#SidebarRightModule',
          data: {
            title: 'Sidebar Right'
          }
        },
      ]
    }, {
      path: 'boxs',
      data: {
        title: 'Boxs',
      },
      children: [
        {
          path: 'box',
          loadChildren: './+boxs/box-default/box-default.module#BoxDefaultModule',
          data: {
            title: 'Box'
          }
        }, {
          path: 'info-box',
          loadChildren: './+boxs/box-info/box-info.module#BoxInfoModule',
          data: {
            title: 'Info Box'
          }
        }, {
          path: 'small-box',
          loadChildren: './+boxs/box-small/box-small.module#BoxSmallModule',
          data: {
            title: 'Small Box'
          }
        }
      ]}, {
        path: 'dropdown',
        loadChildren: './+dropdown/dropdown.module#DropdownModule',
        data: {
          title: 'Dropdown',
        }
      }, {
        path: 'tabs',
        loadChildren: './+tabs/tabs.module#TabsModule',
        data: {
          title: 'Tabs',
        }
      }
    ]
  }, 
  {
    path: 'form',
    data: {
      title: 'Form',
    },
    children: [
      {
        path: 'input-text',
        loadChildren: './+form/input-text/input-text.module#InputTextModule',
        data: {
          title: 'Input Text',
        }
      }
    ]
  }, {
    path: 'login1',
    loadChildren: './+login/login.module#LoginModule',
    data: {
      // customLayout: true,
      layoutName:'default'
    }
  }, {
    path: 'register1',
    loadChildren: './+register/register.module#RegisterModule',
    data: {
      // customLayout: true,
      layoutName:'default'
    }
  },

  {
    path: 'login',
    loadChildren: './user/sign-in/sign-in.module#SignInModule',
    data: {
      // customLayout: true,
      layoutName:'default'
    }
  },

  {
    path: 'signup',
    loadChildren: './user/sign-up/sign-up.module#SignUpModule',
    data: {
      // customLayout: true,
      layoutName:'layoutTwo'
    }
  },



  //  {
  //       path: 'signup', component: UserComponent,s
  //       children: [{ path: '', component: SignUpComponent }]
  //   },
  //   {
  //       path: 'login', component: UserComponent,
  //       children: [{ path: '', component: SignInComponent }]
  //   },
    {
      path: 'welcome', component: WelcomeComponent,canActivate:[AuthGuard],
      children: [{ path: '', component: WelcomeComponent }],
      data: {
        // customLayout: false,
        layoutName: 'layoutOne'
      }
  },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },

  {
    path: 'listuser', component: ListUserComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: ListUserComponent }],
    data: {
      layoutName: 'layoutOne'
    },
  },

  {
    path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard],
    children: [{ path: '', component: AddUserComponent }],
    data: {
      layoutName: 'layoutOne'
    },
  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
