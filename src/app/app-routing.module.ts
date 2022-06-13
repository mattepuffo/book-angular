import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AutoriComponent} from './autori/autori.component';
import {HomeComponent} from './home/home.component';
import {EditoriComponent} from "./editori/editori.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
        {path: '', component: HomeComponent},
        {path: 'autori', component: AutoriComponent},
        {path: 'editori', component: EditoriComponent},
      ]
    )
  ],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
