import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address, Hero, states } from '../data-model';

// https://angular.io/guide/reactive-forms#the-data-model-and-the-form-model

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  heroForm: FormGroup;
  states = states;
  constructor(private _builder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.heroForm = this._builder.group({ // <-- the parent FormGroup
      name: ['', Validators.required ],
      address: this._builder.group( new Address()),
      power: '',
      sidekick: ''
    });
  }
}
