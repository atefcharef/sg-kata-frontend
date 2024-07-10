import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NumberTransformerService } from '../core/number-transformer.service';
import {catchError, of, tap} from "rxjs";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent {
  form: FormGroup;
  result: string | null = null;

  constructor(
      public activeModal: NgbActiveModal,
      private fb: FormBuilder,
      private numberTransformerService: NumberTransformerService
  ) {
    this.form = this.fb.group({
      number: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  closeModal() {
    this.activeModal.close();
  }

  onSubmit() {
    if (this.form.valid) {
      const number = this.form.value.number;
      this.numberTransformerService.transformNumber(number).pipe(
          tap((result) => {
            this.result = result;
          }),
          catchError((error) => {
            console.error(error);
            this.result = 'Error transforming number';
            return of();
          })
      ).subscribe();
    }
  }
}
