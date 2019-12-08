import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SimplifiedTextPageRoutingModule } from './simplified-text-routing.module';

import { SimplifiedTextPage } from './simplified-text.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SimplifiedTextPageRoutingModule
  ],
  declarations: [SimplifiedTextPage]
})
export class SimplifiedTextPageModule {}
