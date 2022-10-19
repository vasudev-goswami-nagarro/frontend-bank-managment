import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserProfilesComponent } from './user-profiles/user-profiles.component';
import {MatCardModule} from '@angular/material/card';


@NgModule({
  declarations: [UserProfilesComponent],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MatCardModule
    ]
})
export class AdminModule { }
