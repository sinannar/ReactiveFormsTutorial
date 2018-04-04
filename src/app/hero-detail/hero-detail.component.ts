import { Component, OnInit,Input } from '@angular/core';
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

  constructor(private _builder: FormBuilder) {

    this.createForm();

  }

  ngOnInit() {
  }

  initHero() {
    this.hero = {
      id: 1,
      name: 'Whirlwind',
      addresses: [
        { street: '123 Main', city: 'Anywhere', state: 'CA', zip: '94801' },
        { street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226' },
      ],
    }
  }

  callSetValue() {
    console.log("Form value:"+( JSON.stringify(this.heroForm.value)))

    this.heroForm.patchValue({
      name: this.hero.name,
    });
    this.heroForm.patchValue({
      address: { street: '123 Main', city: 'Anywhere', state: 'CA', zip: '94801' }
    });

    console.log("Form value:"+( JSON.stringify(this.heroForm.value)))
  }

  createForm() {
    this.heroForm = this._builder.group({ // <-- the parent FormGroup
      name: ['', Validators.required],
      address: this._builder.group(new Address()),
      power: '',
      sidekick: ''
    });
  }

}
