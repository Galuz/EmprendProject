import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShareIdeasComponent } from './share-ideas.component';
import { UserService } from 'src/app/share-ideas/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShareIdeasComponent', () => {
  let component: ShareIdeasComponent;
  let fixture: ComponentFixture<ShareIdeasComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let authServiceMock: jasmine.SpyObj<AuthService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['getUser', 'getAllComments', 'addComment', 'updateComment', 'deleteComment']);
    authServiceMock = jasmine.createSpyObj('AuthService', ['logout', 'removeToken']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ ShareIdeasComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
        DatePipe
      ]
    });

    fixture = TestBed.createComponent(ShareIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    userServiceMock.getUser.calls.reset();
    const userData = { 
      data: {
        id: 1, 
        name: 'Test User', 
        email: 'test@example.com',
        comments: [],
        created_at: '2023-09-28T12:00:00Z',
        updated_at: '2023-09-28T12:00:00Z'
      } 
    };
    
    userServiceMock.getUser.and.returnValue(of(userData));
  
    component.ngOnInit();
  
    expect(component.userData).toEqual(userData.data);
  });

  it('should load all comments on init', () => {
    userServiceMock.getAllComments.calls.reset();
    const commentsData = { 
      data: [{
        id: 1, 
        body: 'Test Comment', 
        user: {
          id: 1, 
          name: 'Test User',
          email: 'test@example.com'
        },
        created_at: '2023-09-28T12:00:00Z',
        updated_at: '2023-09-28T12:00:00Z',
        // incluir isEditing y editingValue?
      }], 
      meta: { last_page: 2 } 
    };
    userServiceMock.getAllComments.and.returnValue(of(commentsData));
  
    component.ngOnInit();
  
    expect(component.allComments).toEqual(commentsData.data);
    expect(component.ideas).toEqual(commentsData.data);
    expect(component.totalPages).toEqual(commentsData.meta.last_page);
    expect(component.showPagination).toBeTrue();
  });

});
