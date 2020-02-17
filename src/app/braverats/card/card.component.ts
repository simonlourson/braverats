import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Output() onClick = new EventEmitter();
  @Input() card: Card

  constructor() { }

  ngOnInit() {
  }

  clickCard() {
    this.onClick.emit();
  }
}
