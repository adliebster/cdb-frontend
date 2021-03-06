import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { PartnerService } from './partner.service';
import { StudentsService } from '../../students/students.service';
import { ProjectsService } from '../../projects/projects.service';
import { ProgramsService } from '../../programs/programs.service';
import { UtilsService } from '../../utils/utils.service';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BackendService} from '../../backend/backend.service';
import {ProfileComponent} from '../../reuseable-components/profile/profile.component';


@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css', '../../app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PartnerComponent implements OnInit {
  // Might be better to just update the entry in the table, not send a full request
  public programs: Array<Object>;
  public projects: Array<Object>;
  public students: Array<Object>;

  public contactForm: FormGroup;

  public contactResult= true;
  public contactDisplay = false;



  public contacts = [{name: 'FullName', phone: 'Number', email: 'email', title: 'title', connected_parter: 'connection'}];

  private static objectToForm(object: Object) {
    const formData: FormData = new FormData(); // Printing this out is weird be careful, use .get()
    for (const key in object) {
      formData.append(key, object[key]);
    }

    return formData;
  }

  constructor(public partnerService: PartnerService,
    private backendService: BackendService,
    private programsService: ProgramsService,
    private dialogRef: MatDialogRef<PartnerComponent>,
    @Inject(MAT_DIALOG_DATA) public id: string) {}

  ngOnInit() {
    // TODO: this isnt working
    this.programsService.getProgramViewsPromiseForPartner(this.id).then(programViews => {
      console.log('Program Views: ' + JSON.stringify(programViews));
      this.programs = programViews;
      this.programs.sort(UtilsService.comparisonFunction2);
    });


    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      number: new FormControl(),
      email: new FormControl(),
      title: new FormControl(),
      organization: new FormControl()
    });



  }

  public createContact() {
    if (!this.contactForm.valid) {
      console.log('Form is not valid');
    } else {
      console.log(this.contactForm.value);
    }
    // TODO: need this to acutally be created
    // this.createEntity('contact', this.contactForm).then((entityResult: Object) => {
    //   this.contactDisplay = true;
    //   this.contactResult = entityResult;
    // });
  }
}
