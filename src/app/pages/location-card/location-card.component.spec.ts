import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationCardComponent } from './location-card.component';

describe('LocationCardComponent', () => {
  let component: LocationCardComponent;
  let fixture: ComponentFixture<LocationCardComponent>;

  beforeAll(() => {
    class MockMap {
      setCenter = jasmine.createSpy('setCenter');
    }
    
    class MockLatLng {
      constructor(public lat: number, public lng: number) {}
    }
  
    window['google'] = {
      maps: {
        ...window['google']?.maps,
        Map: MockMap as any,
        LatLng: MockLatLng as any,
      } as any,
    };
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationCardComponent]
    });
    fixture = TestBed.createComponent(LocationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
