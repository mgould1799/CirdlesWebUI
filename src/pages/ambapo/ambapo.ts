import { Component, Input, NgZone } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import * as FileSaver from 'file-saver';

const ambapoURL: string = 'http://cirdlesserver.cs.cofc.edu/Services/ambapo';

@Component({
  selector: 'app-ambapo',
  templateUrl: './ambapo.html',
  styleUrls: ['./ambapo.scss']
})

export class Ambapo {
  zone: NgZone;
  fileName: string = 'ambapo.csv';
  isBulk: boolean = true;

  uploader: FileUploader = new FileUploader({
    url: ambapoURL,
    itemAlias: 'ambapoFile'
  });

  currentFile: FileItem;
  hasBaseDropZoneOver: boolean = false;
  typesOfConversions: Array<string> = ["LatLong to UTM", "UTM to LatLong", "LatLong to LatLong"];
  typeOfConversion: string = this.typesOfConversions[0].toLowerCase().trim();

  constructor() {

    var _this = this;

    // this will be used to properly cause screen updates
    this.zone = new NgZone({enableLongStackTrace: false});

    this.uploader.onBeforeUploadItem = function(fileItem: FileItem) {
      fileItem._xhr.responseType = 'arraybuffer';
    }

    this.uploader.onCompleteItem = function(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
      if (status === 200) {
        let blob: Blob = new Blob([response], {type: 'text/csv'});
        FileSaver.saveAs(blob, _this.fileName);
      }
    }

    

      // need to use NgZone to update the screen properly
    _this.zone.run(() => {
      });
    }

    convertFile() {  
      let options: FileUploaderOptions = {
        method: 'POST',
        additionalParameter: {
          'typeOfConversion': this.typeOfConversion.toLowerCase().trim()
        }
      }
      this.uploader.setOptions(options);
      this.uploader.uploadItem(this.currentFile);
    }

}


