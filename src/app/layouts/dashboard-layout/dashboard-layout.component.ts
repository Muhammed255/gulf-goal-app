import { Component, OnInit, ViewChild, HostListener, ViewChildren, QueryList } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {

  @ViewChild('sidenav', {static: true}) sidenav:any;  
  @ViewChild('backToTop', {static: true}) backToTop:any;
  public showSidenav:boolean = false;
  public toggleSearchBar:boolean = false;

  constructor(public router:Router, private menuService: MenuService){
  }
  
  ngOnInit() {
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if(window.innerWidth <= 960){
        this.sidenav.close(); 
      }            
    });
    this.menuService.expandActiveSubMenu(this.menuService.getVerticalMenuItems()); 
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

  public onPsScrollY(event){   
    (event.target.scrollTop > 300) ? this.backToTop.nativeElement.style.display = 'flex' : this.backToTop.nativeElement.style.display = 'none';
  }
  
  public closeSubMenus(){
    this.menuService.closeAllSubMenus();
  }

}
