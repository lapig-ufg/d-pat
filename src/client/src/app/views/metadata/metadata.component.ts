import {Component, EventEmitter, Inject, Input, Optional, OnInit, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html'
})

export class MetadataComponent implements OnInit {
  title: string;
  metadata: any = [];
  sectionTitle: string;

  constructor(
      public dialogRef: MatDialogRef<MetadataComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sectionTitle = data.title;
    this.title = data.metadata[0].description;
    this.metadata = data.metadata;
  }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close({event:'close'});
  }

  isDetails(data){
    return (data == "Detalhes" || data == "Details") ? true : false;
  }

}
