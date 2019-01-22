import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl,Validators, NgForm } from "@angular/forms";  
import { SubjectsService } from '../../services/subjects/subjects.service';  
import { Router,ActivatedRoute } from "@angular/router"; 
@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {
  submitted = false;
  userformlabel: string = 'Add Subject';  
  userformbtn: string = 'Save'; 
  showSucessMessage: boolean;
  serverErrorMessages: string; 
  constructor( private SubjectsService: SubjectsService,private route: ActivatedRoute) {  
  }
  

  // addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() { 
    // this.registerForm = new FormGroup ({
    //   _id: new FormControl(null),
    //   subjectName: new FormControl(null, [Validators.required]),
    //   createdBy : new FormControl(null, [Validators.required]),
    //   createdOn :new FormControl(null, [Validators.required]),
    //   updatedOn: new FormControl(null, [Validators.required])
    // });

  //   this.route.params.subscribe(params =>{
  //     if (params['id']) {
  //       this.SubjectService.listUsers(params['id']).subscribe(success => {
  //         console.log(success)
  //         this.userformlabel="Edit User"
  //         this.registerForm.patchValue(success);
  //       }, error => {
  //         console.log (error);
  //       })
  //     }
  //  });   
    
   
  }  
 
  onSubmit(form: NgForm) {
    this.SubjectsService.createSubject(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.SubjectsService.selectedSubject = {
      subjectname: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
//   onSubmit(form :NgForm) {
//     this.submitted = true;
//     console.log(form.value)
//     this.SubjectService.createUser(form.value).subscribe((result) => {
//       //  console.log(result)
//       alert("Updated");
//       this.router.navigate(['listuser']);
//     });
    
//     // stop here if form is invalid
//     if (this.registerForm.invalid) {
//         return;
//     }
// }




}

