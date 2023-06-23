import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UsersService } from "src/app/services/users.service";
import { Users } from "src/app/models/users";

@Component({
  selector: "app-example1",
  templateUrl: "./example1.component.html",
  styleUrls: ["./example1.component.scss"],
})
export class Example1Component implements OnInit {
  private subscription!: Subscription;
  loading: boolean = true;
  stories: Array<Users> = [];
  count: number = 0;
  page: number = 1;
  limit: number = 5;
  hasMore: boolean = true;
  throttle: number = 50;
  scrollDistance: number = 2;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    const param = {
      page: this.page,
      limit: this.limit,
    };
    this.subscription = this.usersService.getUsersApi(param).subscribe({
      next: (resp: any) => {
        this.loading = false;
        this.count = resp.total;
        this.stories = this.stories.concat(resp.data);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onScroll() {
    if (this.count === this.stories.length) {
      this.hasMore = false;
      return;
    }
    this.page = this.page + 1;
    this.loadUsers();
  }
}
