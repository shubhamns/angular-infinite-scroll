import { Component, Input } from "@angular/core";
import { Users } from "src/app/models/users";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent {
  @Input() story!: Users;
}
