import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import MetisMenu from 'metismenujs';
import { Router, NavigationEnd } from '@angular/router';
import { MENU } from './menu';
import { MenuItem } from './menu.model';
import * as _ from "lodash";
import { TranslateService } from '@ngx-translate/core';
import { ServerSettingService } from 'src/app/service/serverSetting.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar Component
 */
export class SidebarComponent implements OnInit {
  loginUser:any=[];
  @ViewChild('sideMenu') sideMenu!: ElementRef;
  menu: any;
  menuItems: MenuItem[] = [];

  constructor(private router: Router, public translate: TranslateService) {
    translate.setDefaultLang('en');
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
      }
    });
  }

  ngOnInit(): void {
    // this.loginUser = JSON.parse(sessionStorage.getItem('cshareUser')|| '').employee;
    this.menuItems = MENU;

    console.log("this.loginUser",this.loginUser)
    console.log("this.menuItems",this.menuItems)
    
    // if(this.loginUser.role === 'CALL_CENTRE_EMPLOYEE'){
    //   this.menuItems = MENU.filter(menuItem => menuItem.loginUserRole == 'CALL_CENTRE_EMPLOYEE');
    // }
    
    // if(this.loginUser.role == 'SERVICE_ADMIN'){
    //   this.menuItems = MENU.filter(menuItem => menuItem.loginUserRole == 'SERVICE_ADMIN');
    // } 
    // if(this.loginUser.role == 'REGIONAL_CUSTOMER_SUPPORT_MANAGER'){
    //   this.menuItems = MENU.filter(menuItem => menuItem.loginUserRole == 'REGIONAL_CUSTOMER_SUPPORT_MANAGER');
    //   this.menuItems = MENU.filter(menuItem => menuItem.clientName == 'SUSHMA');
    // }
    {
      this.menuItems = MENU;
    }
  }

  /**
   * Initialize
   */
  initialize(): void {
    this.menuItems = MENU;
  }

  /***
   * Activate droup down set 
   */
  ngAfterViewInit() {
    this.menu = new MetisMenu('#side-menu');
    this._activateMenuDropdown();
  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className: any) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');
    const links: any = document.getElementsByClassName('side-nav-link-ref');
    let menuItemEl = null;
    // tslint:disable-next-line: prefer-for-of
    const paths = [];
    for (let i = 0; i < links.length; i++) {
      paths.push(links[i]['pathname']);
    }
    var itemIndex = paths.indexOf(window.location.pathname);
    if (itemIndex === -1) {
      const strIndex = window.location.pathname.lastIndexOf('/');
      const item = window.location.pathname.substr(0, strIndex).toString();
      menuItemEl = links[paths.indexOf(item)];
    } else {
      menuItemEl = links[itemIndex];
    }
    if (menuItemEl) {
      menuItemEl.classList.add('active');
      const parentEl = menuItemEl.parentElement;
      if (parentEl) {
        parentEl.classList.add('mm-active');
        const parent2El = parentEl.parentElement.closest('ul');
        if (parent2El && parent2El.id !== 'side-menu') {
          parent2El.classList.add('mm-show');
          const parent3El = parent2El.parentElement;
          if (parent3El && parent3El.id !== 'side-menu') {
            parent3El.classList.add('mm-active');
            const childAnchor = parent3El.querySelector('.has-arrow');
            const childDropdown = parent3El.querySelector('.has-dropdown');
            if (childAnchor) {
              childAnchor.classList.add('mm-active');
            }
            if (childDropdown) {
              childDropdown.classList.add('mm-active');
            }
            const parent4El = parent3El.parentElement;
            if (parent4El && parent4El.id !== 'side-menu') {
              parent4El.classList.add('mm-show');
              const parent5El = parent4El.parentElement;
              if (parent5El && parent5El.id !== 'side-menu') {
                parent5El.classList.add('mm-active');
                const childanchor = parent5El.querySelector('.is-parent');
                if (childanchor && parent5El.id !== 'side-menu') {
                  childanchor.classList.add('mm-active');
                }
              }
            }
          }
        }
      }
    }
  }
}
