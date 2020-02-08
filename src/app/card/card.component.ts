import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input('parentData') parentData: String[];

  @Output() removeElement = new EventEmitter<String>();

  clicked(data) {
    navigator.clipboard.writeText(data);
  }

  removeItem(data) {
    this.removeElement.emit(data);
  }

  constructor() { }

  ngOnInit() {
  }

}
