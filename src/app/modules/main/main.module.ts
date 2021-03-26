import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ClrIconModule } from '@clr/angular';
import { MainComponent } from './main.component';

// Components
import { AlertComponent } from './components/alert/alert.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Pages
import { MainPageComponent } from './pages/main-page/main-page.component';


const ClrModules = [ClrIconModule];

@NgModule({
  declarations: [
    MainComponent,
    ToolbarComponent,
    MainPageComponent,
    FooterComponent,
    AlertComponent,
    AlertComponent,
    SidenavComponent,
    SubnavComponent,
  ],
  imports: [CommonModule, MainRoutingModule, ...ClrModules],
})
export class MainModule {}
