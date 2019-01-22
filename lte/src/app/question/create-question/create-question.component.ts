import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl,Validators, NgForm } from "@angular/forms";  
import { QuestionsService } from '../../services/questions/questions.service';  
import { Router,ActivatedRoute } from "@angular/router"; 



@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})

export class CreateQuestionComponent implements OnInit {
  submitted = false;
  userformlabel: string = 'Add Question';  
  userformbtn: string = 'Save'; 
  showSucessMessage: boolean;
  serverErrorMessages: string;
  _id:string;
  
   
  subjectId:any;

  subjects = [{
    id: '8f8c6e98',
    name: 'USA',
    code: 'USD'
   },
   {
    id: '169fee1a',
    name: 'Canada',
    code: 'CAD'
   },
   {
    id: '3953154c',
    name: 'UK',
    code: 'GBP'
   }]


  constructor( private QuestionsService: QuestionsService,private route: ActivatedRoute,private router: Router) {  
  }
  

  // addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() { 
   // selected value for subject
   this.subjectId="0"
   this._id=null

   this.route.params.subscribe(params =>{
    if (params['id']) {
   this.QuestionsService.listQuestions(params['id']).subscribe(
    res => {
      this.QuestionsService.selectedQuestion=res;
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
 });
     
   
  }  
 
  onSubmit(form: NgForm) {
    alert("Start")
    this.QuestionsService.createQuestion(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        alert("done")
        this.router.navigate(['listquestion']);

        // this.resetForm(form);
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
    this.QuestionsService.selectedQuestion = {
      questionName: '',
      subjectId:0
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
//   onSubmit(form :NgForm) {
//     this.submitted = true;
//     console.log(form.value)
//     this.QuestionService.createUser(form.value).subscribe((result) => {
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

