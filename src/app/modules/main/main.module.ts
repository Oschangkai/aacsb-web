import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CdsIconModule } from '@cds/angular';
import { ClarityIcons, homeIcon, cogIcon, userIcon, usersIcon, listIcon,
  fileGroupIcon, tableIcon, dataClusterIcon, bookIcon, assignUserIcon } from '@cds/core/icon';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SubnavComponent } from './components/subnav/subnav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Pages
import { MainPageComponent } from './pages/main-page/main-page.component';

// Resolver
import { SharedModule } from '@shared/shared.module';

const Pages = [
  MainPageComponent
];
const Components = [
  MainComponent, ToolbarComponent, FooterComponent,
  SidenavComponent, SubnavComponent
];
const CdsModules = [CdsIconModule];

import '@cds/core/icon/register.js';
ClarityIcons.addIcons(
  homeIcon, cogIcon, userIcon, usersIcon, listIcon, fileGroupIcon,
  tableIcon, dataClusterIcon, bookIcon, assignUserIcon);

@NgModule({
  declarations: [...Pages, ...Components],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MainRoutingModule,
    SharedModule,
    ...CdsModules
  ],
  providers: []
})
export class MainModule {}
