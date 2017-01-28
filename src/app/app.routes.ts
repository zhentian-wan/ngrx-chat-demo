

import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";

const indexRoute = {path: '', redirectTo: 'home', pathMatch: 'full'};

export const routes = [
  indexRoute,
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent}
];
