import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlgorithmDetailComponent } from './algorithm-detail/algorithm-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ComparisonComponent } from './comparison/comparison.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "algorithm", children: [
    {path: "", component: DashboardComponent},
    {path: ":id", component: AlgorithmDetailComponent}
  ]},
  { path: "comparison", component: ComparisonComponent },
  { path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
