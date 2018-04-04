import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address, Hero, states } from '../data-model';
import { JsonPipe } from '@angular/common';

// https://angular.io/guide/reactive-forms#the-data-model-and-the-form-model

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  heroForm: FormGroup;
  states = states;

  constructor(private fb: FormBuilder) {

    this.createForm();

  }

  ngOnInit() {
  }

  createForm() {
    this.heroForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      address: this.fb.group({ // <-- the child FormGroup
        street: '',
        city: '',
        state: '',
        zip: ''
      }),
      power: '',
      sidekick: ''
    });
  }


}
