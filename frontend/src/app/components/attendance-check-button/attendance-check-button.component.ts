import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-attendance-check-button',
  templateUrl: './attendance-check-button.component.html',
  styleUrls: ['./attendance-check-button.component.scss']
})
export class AttendanceCheckButtonComponent implements OnInit {

  @Input() public troopId: string;

  constructor() {
  }

  ngOnInit() {
  }

}
