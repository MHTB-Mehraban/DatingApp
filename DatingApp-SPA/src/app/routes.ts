import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolvers';
import { MemberListResolver } from './_resolvers/member-list.resolvers';

export const AppRoutes: Routes = [
    {path: '' , component: HomeComponent } ,
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'lists' , component: ListsComponent } ,
            {path: 'members' , component: MemberListComponent
                , resolve: {users: MemberListResolver}} ,
            {path: 'messages' , component: MessagesComponent } ,
            {path: 'members/:id' , component: MemberDetailComponent
                , resolve: {user: MemberDetailResolver}} ,
        ]
    },
   {path: '**' , redirectTo: '', pathMatch: 'full'} 
];