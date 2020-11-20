import { Menu } from './menu.model';

export const verticalMenuItems = [ 
    new Menu (1, 'Dashboard', '/account/dashboard', null, 'dashboard', null, false, 0),
    new Menu (2, 'Users', '/account/users', null, 'supervisor_account', null, false, 0),
    new Menu (3, 'News', null, null, 'new_releases', null, true, 0),
    new Menu (4, 'All News', '/account/news', null, 'new_releases', null, false, 3),
    new Menu (5, 'All Trends', '/account/trends', null, 'new_releases', null, false, 3)
]