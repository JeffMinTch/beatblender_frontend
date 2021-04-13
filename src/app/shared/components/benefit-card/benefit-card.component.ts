import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-benefit-card',
  templateUrl: './benefit-card.component.html',
  styleUrls: ['./benefit-card.component.scss']
})
export class BenefitCardComponent implements OnInit {

  @Input() iconName: string;
  @Input() text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
