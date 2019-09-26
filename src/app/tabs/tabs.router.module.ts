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
          { 
            path: 'discount-type', 
            loadChildren: '../discount-type/discount-type.module#DiscountTypePageModule'
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
          },
          {
            path: 'order-history',
            loadChildren: '../order-history/order-history.module#OrderHistoryPageModule'
          },
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
          { 
            path: 'tag', 
            loadChildren: '../tag/tag.module#TagPageModule' 
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
        path: 'tag-detail',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            loadChildren: '../tag-detail/tag-detail.module#TagDetailPageModule'
          }
        ]
      },
      { 
        path: 'guest-detail',
        canActivate: [AuthGuard],
        children: [
         {
           path: '',
           loadChildren: '../guest-detail/guest-detail.module#GuestDetailPageModule'
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
