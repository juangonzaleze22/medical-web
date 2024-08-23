import { JsonPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { TOOLBAR_EDITOR_INPUT } from '../../const';

@Component({
  selector: 'app-input-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgxEditorModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './input-editor.component.html',
  styleUrl: './input-editor.component.scss',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true })
    }
  ]
})
export class InputEditorComponent{

  @Input({required: true}) controlName: string = '';
  parentContainer = inject(ControlContainer);

  toolbar: Toolbar = TOOLBAR_EDITOR_INPUT;
  editor: Editor = new Editor();

  get control(): AbstractControl | null {
    return this.parentContainer?.control?.get(this.controlName) ?? null;
  }
}


