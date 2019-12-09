import { Component, OnInit } from '@angular/core';
import { SimplifiedResult, SimplifiedTerm } from '../models/simplified-term';
import { SimpleService } from '../services/simple.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simplified-text',
  templateUrl: './simplified-text.page.html',
  styleUrls: ['./simplified-text.page.scss'],
})
export class SimplifiedTextPage implements OnInit {

  public result: SimplifiedTerm[];

  constructor(private simpleService: SimpleService) { }

  ngOnInit() {
    this.result = this.simpleService.getResult();
  }

}
