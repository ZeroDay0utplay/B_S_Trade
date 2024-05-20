import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadProfileService } from '../services/upload-profile.service';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailValidatorService } from '../services/email-validator.service';
import { User } from '../Interfaces/user';
import { UpdateService } from '../services/update.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  updateForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl(''),
    job: new FormControl(''),
    bio: new FormControl('')
  });

  @ViewChild('avatarImg', { static: true }) avatarImgElement: ElementRef | undefined;

  @Input() photo: any;
  @Output() photoUpdated = new EventEmitter<string>();

  showAddPhotoOverlay = false;
  id: any;
  username: any;

  alert_success = false;
  alert_danger = false;
  alert_warning = false;

  alert_message_success = "";
  alert_message_danger = "";
  alert_message_warning = "";

  constructor(private uploadService: UploadProfileService,
    private route: ActivatedRoute,
    private getDataService: GetDataService,
    private sanitizer: DomSanitizer,
    private updateService: UpdateService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDataService.getData('/profile/'+this.id).subscribe(response => {
      const data = response.message;
      const profile_pic = data.profile_pic;
      const username = data.full_name;
      this.photo = (profile_pic) ? this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${profile_pic}`): null;
      this.username = username;
    });
    
  }

  addPhoto(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {        
        const file = target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
          this.avatarImgElement!.nativeElement.src = fileReader.result as string;
        };
        fileReader.readAsDataURL(file);
        
        this.uploadService.update(file, this.id).subscribe(response => {
            console.log(response);
          }, error => {
            console.error(error);
          });;

        //this.photo = 'xxxx';
        this.photoUpdated.emit(this.photo);
      }
    }

  openFileInput(fileInput: { click: () => void; }){
    fileInput.click()
    this.showAddPhotoOverlay=false
  }

  removePhoto() {
    this.avatarImgElement!.nativeElement.src = '';
    this.photo = '';
    this.photoUpdated.emit(this.photo);
  }

  setAllFalse(){
    this.alert_danger = false;
    this.alert_success = false;
    this.alert_warning = false;
  }

  onSubmit() {
    if (this.updateForm.valid){
      const body: User = this.updateForm.value as User;      
      this.updateService.update(body, '/profile/'+this.id).subscribe(response => {
        const message = response.body.message;
        this.setAllFalse();
        this.alert_success = true;
        this.alert_message_success = message;
      },
      error => {
        console.log(error);
        let message = error.error.message;
        this.setAllFalse();
        this.alert_danger = true;
        this.alert_message_danger = message;
      });

          
    }
    
  }

}
