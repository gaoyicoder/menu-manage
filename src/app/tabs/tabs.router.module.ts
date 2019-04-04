import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from '../guards/auth.guard';
const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'index',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../index/index.module#IndexPageModule'
          }
        ]
      },
      {
        path: 'order',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../order/order.module#OrderPageModule'
          }
        ]
      },
      {
        path: 'balance',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../balance/balance.module#BalancePageModule'
          }
        ]
      },
      {
        path: 'member',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../member/member.module#MemberPageModule'
          }
        ]
      },
      {
        path: 'menu',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../menu/menu.module#MenuPageModule'
          },
          {
            path: 'menu-type',
            loadChildren: '../menu-type/menu-type.module#MenuTypePageModule'
          }
        ]
      },
      {
        path: 'menu-detail',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../menu-detail/menu-detail.module#MenuDetailPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/index',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
