import { Injectable } from '@angular/core';

import { BackendService } from '../backend/backend.service';

@Injectable()
export class StudentsService {
  private backendService: BackendService;

  constructor(pBackendService: BackendService) {
    this.backendService = pBackendService;
   }

  public getStudentsPromise() {
   return this.backendService.resource('GET', 'student/', null);
  }

  public getStudentsPromiseForProject(projectName) {
    return this.backendService.resource('GET', `student/project/${projectName}`, null);
  }

  public getStudentsPromiseForPartner(partnerName) {
    return this.backendService.resource('GET', `student/partner/${partnerName}`, null);
  }

  public getStudentsPromiseForProgram(programName) {
    return this.backendService.resource('GET', `student/program/${programName}`, null);
  }
}
