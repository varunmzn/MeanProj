import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl,Validators, NgForm } from "@angular/forms";  
import { AssessmentService } from '../../services/assessments/assessment.service';  
import { Router,ActivatedRoute } from "@angular/router"; 

@Component({
  selector: 'app-create-assess',
  templateUrl: './create-assess.component.html',
  styleUrls: ['./create-assess.component.css']
})
export class CreateAssessComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  submitted = false;
  userformlabel: string = 'Add Assessment';  
  userformbtn: string = 'Save';  
  constructor(private formBuilder: FormBuilder, private router: Router, private AssessmentService: AssessmentService,private route: ActivatedRoute) {  
  }
  

  // addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() { 
    this.registerForm = new FormGroup ({
      _id: new FormControl(null),
      assessmentName: new FormControl(null, [Validators.required]),
      createdBy : new FormControl(null, [Validators.required]),
      createdOn :new FormControl(null, [Validators.required]),
      updatedOn: new FormControl(null, [Validators.required])
    });

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

