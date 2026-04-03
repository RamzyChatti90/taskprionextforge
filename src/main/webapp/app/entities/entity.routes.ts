import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'taskprionextforgeApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'task',
    data: { pageTitle: 'taskprionextforgeApp.task.home.title' },
    loadChildren: () => import('./task/task.routes'),
  },
  {
    path: 'category',
    data: { pageTitle: 'taskprionextforgeApp.category.home.title' },
    loadChildren: () => import('./category/category.routes'),
  },
  {
    path: 'comment',
    data: { pageTitle: 'taskprionextforgeApp.comment.home.title' },
    loadChildren: () => import('./comment/comment.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;
