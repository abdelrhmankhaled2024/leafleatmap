import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, inject} from '@angular/core';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface Title {
  name: string;
}

@Component({
  selector: 'app-afi',
  templateUrl: './afi.component.html',
  styleUrl: './afi.component.css',
 
})
export class AfiComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  titles: Title[] = [{name: 'AFI'}];

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our title
    if (value) {
      this.titles.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(title: Title): void {
    const index = this.titles.indexOf(title);

    if (index >= 0) {
      this.titles.splice(index, 1);

      this.announcer.announce(`Removed ${title}`);
    }
  }

  edit(title: Title, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove title if it no longer has a name
    if (!value) {
      this.remove(title);
      return;
    }

    // Edit existing title
    const index = this.titles.indexOf(title);
    if (index >= 0) {
      this.titles[index].name = value;
    }
  }
}