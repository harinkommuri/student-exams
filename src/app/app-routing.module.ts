import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)},
  {
    path: 'subject-details',
    loadChildren: () => import('./pages/subject-details/subject-details.module').then( m => m.SubjectDetailsPageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./pages/exam/exam.module').then( m => m.ExamPageModule)
  },
  {
    path: 'subjects',
    loadChildren: () => import('./pages/subjects/subjects.module').then( m => m.SubjectsPageModule)
  },
  {
    path: 'topic-details',
    loadChildren: () => import('./pages/topic-details/topic-details.module').then( m => m.TopicDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
