import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadProfileService } from '../services/upload-profile.service';
import { ActivatedRoute } from '@angular/router';
import { GetDataService } from '../services/get-data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('avatarImg', { static: true }) avatarImgElement: ElementRef | undefined;

  @Input() photo: any;
  @Output() photoUpdated = new EventEmitter<string>();

  showAddPhotoOverlay = false;
  id: any;
  username: any;

  constructor(private uploadService: UploadProfileService, private route: ActivatedRoute, private getDataService: GetDataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDataService.getData('/profile/'+this.id).subscribe(response => {
      const data = response.message;
      const profile_pic = data.profile_pic;
      const username = data.full_name;
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${profile_pic}`);
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
        
        this.uploadService.update(file, 'ca0db592eaac8636f3aa20fbcdcd947f').subscribe(response => {
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

}
