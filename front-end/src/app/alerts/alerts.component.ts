import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  @Input() alert_success: any;
  @Input() alert_warning: any;
  @Input() alert_danger: any;
  @Input() alert_message_success: any;
  @Input() alert_message_warning: any;
  @Input() alert_message_danger: any;
  @Input() nextRoute: any;

  constructor() {}

  changeRoute(){
    let next_route = "";
    for (let route of this.nextRoute){
      next_route+=route;
    }
    location.href = next_route;
  }
}
