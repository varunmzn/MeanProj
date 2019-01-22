import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl,Validators, NgForm } from "@angular/forms";  
import { AssessmentsService } from '../../services/assessments/assessments.service';  
import { Router,ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'app-create-assess',
  templateUrl: './create-assess.component.html',
  styleUrls: ['./create-assess.component.css']
})
export class CreateAssessComponent implements OnInit {
  submitted = false;
  userformlabel: string = 'Add Assessment';  
  userformbtn: string = 'Save'; 
  showSucessMessage: boolean;
  serverErrorMessages: string; 
  constructor( private AssessmentsService: AssessmentsService,private route: ActivatedRoute) {  
  }
  

  // addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() { 
    // this.registerForm = new FormGroup ({
    //   _id: new FormControl(null),
    //   assessmentName: new FormControl(null, [Validators.required]),
    //   createdBy : new FormControl(null, [Validators.required]),
    //   createdOn :new FormControl(null, [Validators.required]),
    //   updatedOn: new FormControl(null, [Validators.required])
    // });

  //   this.route.params.subscribe(params =>{
  //     if (params['id']) {
  //       this.AssessmentService.listUsers(params['id']).subscribe(success => {
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
    this.AssessmentsService.createAssessment(form.value).subscribe(
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
    this.AssessmentsService.selectedAssessment = {
      assessmentname: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
//   onSubmit(form :NgForm) {
//     this.submitted = true;
//     console.log(form.value)
//     this.AssessmentService.createUser(form.value).subscribe((result) => {
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

