import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Address, Hero, states } from '../data-model';
import { JsonPipe } from '@angular/common';
import { HeroService }           from '../hero.service';

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

  nameChangeLog: string[] = [];

  constructor(private fb: FormBuilder, private heroService: HeroService) {

    this.createForm();
    this.logNameChange();

  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('ngOnChanges');
    this.rebuildForm();
  }

  rebuildForm() {
    this.heroForm.reset({
      name: this.hero.name,
    });
    this.setAddresses(this.hero.addresses);
  }

  createForm() {
    this.heroForm = this.fb.group({ // <-- the parent FormGroup
      name: ['', Validators.required],
      secretLairs: this.fb.array([]), // <-- secretLairs as an empty FormArray
      power: '',
      sidekick: ''
    });
  }

  setAddresses(addresses: Address[]) {
    const addressFGs = addresses.map(address => this.fb.group(address));
    const addressFormArray = this.fb.array(addressFGs);
    this.heroForm.setControl('secretLairs', addressFormArray);
  }

  get secretLairs(): FormArray {
    return this.heroForm.get('secretLairs') as FormArray;
  }

  addLair() {
    this.secretLairs.push(this.fb.group(new Address()));
  }

  logNameChange() {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }

  prepareSaveHero(): Hero {
    const formModel = this.heroForm.value;

    // deep copy of form model lairs
    const secretLairsDeepCopy: Address[] = formModel.secretLairs.map(
      (address: Address) => Object.assign({}, address)
    );

    // return new `Hero` object containing a combination of original hero value(s)
    // and deep copies of changed form model values
    const saveHero: Hero = {
      id: this.hero.id,
      name: formModel.name as string,
      // addresses: formModel.secretLairs // <-- bad!
      addresses: secretLairsDeepCopy
    };
    return saveHero;
  }

  onSubmit() {
    this.hero = this.prepareSaveHero();
    this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    this.rebuildForm();
  }

  revert() { this.rebuildForm(); }


  /*
  The setValue() method checks the data object thoroughly before assigning any form control values.
  It will not accept a data object that doesn't match the FormGroup structure or is missing values for any control in the group.
  This way, it can return helpful error messages if you have a typo or if you've nested controls incorrectly.
  Conversely, patchValue() will fail silently.
  With patchValue() you have more flexibility to cope with divergent data and form models.
  But unlike setValue(), patchValue() cannot check for missing control values and doesn't throw helpful errors.
  */
  setValue() {
    // this.heroForm.setValue({
    //   name: this.hero.name,
    //   secretLairs: this.setAddresses(this.hero.addresses),
    //   power: 'strength',
    //   sidekick: 'true'
    // });
  }

  cleanValue() {
    // this.heroForm.setValue({
    //   name: '',
    //   secretLairs: this.fb.array([]),
    //   power: '',
    //   sidekick: ''
    // });
  }

  patchName() {
    // this.heroForm.patchValue({ name: this.hero.name });
  }

  patchNameAndAdress() {
    // this.heroForm.patchValue({
    //   name: this.hero.name,
    // });
    // this.setAddresses(this.hero.addresses);
  }

}
