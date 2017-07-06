import { Component } form "@angular/core"

@Component({
  seleector: 'app-logut',
  templateUrl: `
    <div class='col-md-8 col-md-offset-2'>
      <button class="btn btn-danger" (click)="onLogout()"> Logout </button>
    </div>
    `
  })

export class LogoutComponent {
      onLogout() {


      }
}
