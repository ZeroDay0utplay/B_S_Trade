import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UploadProfileService } from '../services/upload-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('avatarImg', { static: true }) avatarImgElement: ElementRef | undefined;

  @Input() photo: string | undefined;
  @Output() photoUpdated = new EventEmitter<string>();

  showAddPhotoOverlay = false;

  constructor(private uploadService: UploadProfileService) { }

  ngOnInit() {
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
        
        this.uploadService.update(file, 'e949092c724d30df7675750a01a8ea0c').subscribe(response => {
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
