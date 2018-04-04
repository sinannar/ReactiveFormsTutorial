import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address, Hero, states } from '../data-model';
import { JsonPipe } from '@angular/common';

// https://angular.io/guide/reactive-forms#the-data-model-and-the-form-model

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnChanges {
  @Input() hero: Hero;
  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {

    this.createForm();

  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address()
    });
  }

  createForm() {
    this.heroForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required],
      address: this.fb.group(new Address()),
      power: '',
      sidekick: ''
    });
  }

  /*
  The setValue() method checks the data object thoroughly before assigning any form control values.
  It will not accept a data object that doesn't match the FormGroup structure or is missing values for any control in the group.
  This way, it can return helpful error messages if you have a typo or if you've nested controls incorrectly.
  Conversely, patchValue() will fail silently.
  With patchValue() you have more flexibility to cope with divergent data and form models.
  But unlike setValue(), patchValue() cannot check for missing control values and doesn't throw helpful errors.
  */
  setValue() {
    this.heroForm.setValue({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address(),
      power: 'strength',
      sidekick: 'true'
    });
  }

  cleanValue() {
    this.heroForm.setValue({
      name: '',
      address: new Address(),
      power: '',
      sidekick: ''
    });
  }

  patchName() {
    this.heroForm.patchValue({ name: this.hero.name });
  }

  patchNameAndAdress() {
    this.heroForm.patchValue({
      name: this.hero.name,
      address: this.hero.addresses[0] || new Address(),
    });
  }

}
