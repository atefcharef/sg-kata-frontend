import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalFormComponent } from './modal-form.component';
import { NumberTransformerService } from '../number-transformer.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;
  let service: NumberTransformerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalFormComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        NgbActiveModal,
        {
          provide: NumberTransformerService,
          useValue: {
            transformNumber: (number: number) => of('FOO')
          }
        }
      ]
    })
        .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(NumberTransformerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with number control', () => {
    expect(component.form.contains('number')).toBeTruthy();
  });

  it('should make the number control required', () => {
    const control = component.form.get('number');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should display result after form submission', () => {
    const control = component.form.get('number');
    control?.setValue(3);

    component.onSubmit();

    expect(component.result).toEqual('FOO');
  });
});
