import { Component, OnInit } from '@angular/core';  
import { FormBuilder, FormGroup, FormControl,Validators, NgForm } from "@angular/forms";  
import { UsersService } from '../../services/users/users-service.service';  
import { Router,ActivatedRoute } from "@angular/router";  
import 'rxjs/add/operator/map'



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})



export class AddUserComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  submitted = false;
  userformlabel: string = 'Add User';  
  userformbtn: string = 'Save';  
  constructor(private formBuilder: FormBuilder, private router: Router, private UsersService: UsersService,private route: ActivatedRoute) {  
  }
  

  // addForm: FormGroup;  
  btnvisibility: boolean = true;  
  ngOnInit() { 
    this.registerForm = new FormGroup ({
      _id: new FormControl(null),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email:  new FormControl(null, [Validators.required,Validators.email]),
      password:  new FormControl(null, [Validators.required,Validators.minLength(6)]),
      mobile:  new FormControl(null, [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]),
      gender: new FormControl(null, [Validators.required]),
      age:  new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe(params =>{
      if (params['id']) {
        this.UsersService.listUsers(params['id']).subscribe(success => {
          console.log(success)
          this.userformlabel="Edit User"
          this.registerForm.patchValue(success);
        }, error => {
          console.log (error);
        })
      }
   });
   
     
    
    // this.registerForm.get('age').setValue(47);


  //   this.registerForm = this.formBuilder.group({
  //     firstName: ['', Validators.required,Validators.email]
  //     // lastName: ['', Validators.required],
  //     // email: ['', [Validators.required, Validators.email]],
  //     // password: ['', [Validators.required, Validators.minLength(6)]],
  //     // mobile: ['', Validators.required],
  //     // gender: ['', Validators.required],
  //     // age: ['', Validators.required]
  // })
  
  
    // this.addForm = this.formBuilder.group({  
    //   id: [],  
    //   user_name: ['', Validators.required],  
    //   user_salary: ['', [Validators.required, Validators.maxLength(9)]],  
    //   user_age: ['', [Validators.required, Validators.maxLength(3)]]  
    // });  
  
    // let userid = localStorage.getItem('editEmpId');  
    // if (+userid > 0) {  
    //   this.userService.getUserById(+userid).subscribe(data => {  
    //     this.addForm.patchValue(data);  
    //   })  
    //   this.btnvisibility = false;  
    //   this.userformlabel = 'Edit User';  
    //   this.userformbtn = 'Update';  
    // }  
  }  
  
  onUpdate() {  
    // console.log('Update fire');  
    // this.userService.updateUser(this.addForm.value).subscribe(data => {  
    //   this.router.navigate(['list-user']);  
    // },  
    //   error => {  
    //     alert(error);  
    //   });  
  }  
  // get f() { return this.registerForm.controls; }

  onSubmit(form :NgForm) {
    this.submitted = true;
    console.log(form.value)
    this.UsersService.createUser(form.value).subscribe((result) => {
      //  console.log(result)
      alert("Updated");
      this.router.navigate(['listuser']);
    });
    
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
}




// ngOnDestroy() {
//   this.sub.unsubscribe();
// }

}
