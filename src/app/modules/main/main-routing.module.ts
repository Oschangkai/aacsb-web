import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { MainComponent } from './main.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {FailureMailPageComponent} from './pages/failure-mail-page/failure-mail-page.component';

// Resolver
import {FailureMailResolver} from '@module/main/pages/failure-mail-page/failure-mail-resolver.service';

const routes: Routes = [{
    path: '',
    component: MainComponent,
    children: [{
      path: '',
      component: MainPageComponent
    }, {
      path: 'failure-mail',
      component: FailureMailPageComponent,
      resolve: { failureMailEvents: FailureMailResolver },
      children: [{ path: '', component: FailureMailPageComponent }],
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
