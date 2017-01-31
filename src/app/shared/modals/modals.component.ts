import { MainComponent } from './../../main/main.component';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})

export class ModalsComponent {

  @Input() type;  

  private showing: boolean;
  private inputValue: any;

  constructor(
    private main: MainComponent
  ) {
      this.showing = false;
      this.inputValue = "";
  }

  show() {
     //showing animation 
  }

  private handleConfirmation() {
    //logic...
    switch (this.type) {
        case "passwordPrompt":
            this.main.reGetAfterPassPrompt(this.inputValue);
            break;
    };
  }
  
}
