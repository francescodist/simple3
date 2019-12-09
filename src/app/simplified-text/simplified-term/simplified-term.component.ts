import { Component, OnInit, Input } from '@angular/core';
import { SimplifiedTerm } from 'src/app/models/simplified-term';

@Component({
  selector: 'app-simplified-term',
  templateUrl: './simplified-term.component.html',
  styleUrls: ['./simplified-term.component.scss'],
})
export class SimplifiedTermComponent implements OnInit {

  @Input() term: SimplifiedTerm;
  showDefinition = false;

  constructor() { }

  ngOnInit() {}

  public toggleDefinition() {
    this.showDefinition = !this.showDefinition;
  }

}
