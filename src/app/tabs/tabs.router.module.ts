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
        path: 'guest',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../guest/guest.module#GuestPageModule'
          },
          {
            path: 'recharge-type',
            loadChildren: '../recharge-type/recharge-type.module#RechargeTypePageModule'
          },
          { 
            path: 'recharge', 
            loadChildren: '../recharge/recharge.module#RechargePageModule' 
          },
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
          },
          { 
            path: 'table', 
            loadChildren: '../table/table.module#TablePageModule' 
          },
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
        redirectTo: '/tabs/order',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/order',
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
