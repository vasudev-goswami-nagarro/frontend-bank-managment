import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {FakeApiService} from './services/fake-api.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeApiService),
  ]
})
export class CoreModule { }
