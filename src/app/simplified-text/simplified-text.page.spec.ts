import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimplifiedTextPage } from './simplified-text.page';

describe('SimplifiedTextPage', () => {
  let component: SimplifiedTextPage;
  let fixture: ComponentFixture<SimplifiedTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplifiedTextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimplifiedTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
