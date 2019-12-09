import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimplifiedTermComponent } from './simplified-term.component';

describe('SimplifiedTermComponent', () => {
  let component: SimplifiedTermComponent;
  let fixture: ComponentFixture<SimplifiedTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplifiedTermComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimplifiedTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
