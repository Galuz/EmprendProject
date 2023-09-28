import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from 'src/app/navigation/navbar/navbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LandingComponent } from './landing.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { LocationCardComponent } from '../location-card/location-card.component';
import { FooterComponent } from 'src/app/navigation/footer/footer.component';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandingComponent, NavbarComponent, FooterComponent, ContactFormComponent, LocationCardComponent, CardComponent],
      imports: [HttpClientTestingModule, FormsModule]
    });
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
