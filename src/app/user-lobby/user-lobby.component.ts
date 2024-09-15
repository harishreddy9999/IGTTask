import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap } from 'rxjs/operators';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { setUsers, sortUsersByName } from '../userActions'; // Import the action
import { selectSortedUsers } from '../userSelector'; // Import the selector

@Component({
  selector: 'app-user-lobby',
  templateUrl: './user-lobby.component.html',
  styleUrls: ['./user-lobby.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class UserLobbyComponent implements OnInit {
  users: any[] = [];
  totalUsers: number = 0;
  currentPage: number = 1;
  pageLimit: number = 12;
  searchQuery: string = '';
  selectedGender: string = '';
  selectedStatus: string = '';
  sortField: string = '';
  sortDirection: string = '';
  private searchSubject = new Subject<string>();
  subscription_2:any;
  users$ = this.store.select(selectSortedUsers); // Use the selector for sorted users

  constructor(private userService: UserService, private dialog: MatDialog, private store: Store) {
    this.users$ = this.store.select((state) => state);
    this.subscription_2 = this.users$.pipe(
      tap((data: any) => {
        console.log("emittedvalue", data.user.users);
        this.users = data.user.users;
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.searchSubject
      .pipe(
        debounceTime(1000), // Adjust debounce time as needed
        switchMap((searchValue) => {
          const query = {
            search: searchValue,
            gender: this.selectedGender,
            status: this.selectedStatus,
            sortField: this.sortField,
            sortDirection: this.sortDirection,
          };
          return this.userService.getUsersListApi(this.currentPage, this.pageLimit, query);
        })
      )
      .subscribe((response) => {
        this.users = [...this.users, ...response.data];
        this.totalUsers = response.meta.pagination.total;
        this.userService.setUsersList(this.users);
      });
  }

  fetchUsers() {
    const query = {
      search: this.searchQuery,
      gender: this.selectedGender,
      status: this.selectedStatus,
      sortField: this.sortField,
      sortDirection: this.sortDirection,
    };

    this.userService.getUsersListApi(this.currentPage, this.pageLimit, query).subscribe((response) => {
      this.users = [...this.users, ...response.data];
      this.totalUsers = response.meta.pagination.total;
      // debugger;
      this.userService.setUsersList(this.users);
      // Dispatch the setUsers action to update the NgRx store with fetched users
      this.store.dispatch(setUsers({ users: this.users }));
      console.log(this.users);
    });
  }

  onSearchChange(event: any) {
    this.resetUsers();
    this.searchQuery = event.target.value;
    this.searchSubject.next(this.searchQuery);
  }

  onFilterChange() {
    this.resetUsers();
    this.fetchUsers();
  }

  sortByDirection: string = '';
  onSortName(field: string) {
    if(this.sortByDirection == '' || this.sortByDirection == 'desc'){
      this.sortByDirection = 'asc';
      this.store.dispatch(sortUsersByName({ sortDirection: 'asc' })); 
    }else{
      this.sortByDirection = 'desc';
      this.store.dispatch(sortUsersByName({ sortDirection: 'desc' })); 
    }
    
    
  }

  // Sort users by email without NgRx (local sorting)
  onSortEmail(field: string) {
    const sortedByEmailAsc = this.users.sort((a, b) => {
      if (a.email < b.email) return -1;
      if (a.email > b.email) return 1;
      return 0;
    });
    this.users = sortedByEmailAsc;
  }

  showMore() {
    if (this.users.length < this.totalUsers) {
      this.currentPage++;
      this.fetchUsers();
    }
  }

  resetUsers() {
    this.users = [];
    this.currentPage = 1;
  }

  showUserList(user: any) {
    const dialogRef = this.dialog.open(UserdetailsComponent, {
      hasBackdrop: true,
      width: '30%',
      minHeight: '100px',
      maxHeight: '100px',
      backdropClass: 'cdk-overlay-transparent-backdrop',
      data: {
        id: user.id,
      },
    });
    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      this.fetchUsers();
    });
  }
}
