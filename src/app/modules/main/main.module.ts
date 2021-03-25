import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

// Components
import { FooterComponent } from './components/footer/footer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

// Pages
import { MainPageComponent } from './pages/main-page/main-page.component';


@NgModule({
  declarations: [
    MainComponent,
    ToolbarComponent,
    MainPageComponent,
    FooterComponent,
  ],
  imports: [CommonModule, MainRoutingModule],
})
export class MainModule {}
