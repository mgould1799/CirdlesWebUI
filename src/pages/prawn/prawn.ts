import { Component, Input, NgZone } from '@angular/core';
import { FileUploader, FileUploaderOptions, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Observable } from 'rxjs/Observable';
import * as FileSaver from 'file-saver';

const prawnURL: string = 'http://cirdlesserver.cs.cofc.edu/Services/prawn';

@Component({
  selector: 'app-prawn',
  templateUrl: './prawn.html',
  styleUrls: ['./prawn.scss']
})
export class Prawn {

  downloadSuccess: boolean = false;
  fileName: string = 'reports.zip';
  @Input() fileProgress: number = 0;
  zone: NgZone;

  uploader: FileUploader = new FileUploader({
    url: prawnURL,
    itemAlias: 'prawnFile'
  });
  currentFile: FileItem;
  hasBaseDropZoneOver: boolean = false;
  uploading: boolean = false;
  downloading: boolean = false;

  useSBM: boolean = true;
  useLinFits: boolean = false;
  rmValues: Array<string> = ["T"];
  selectedRM: string = this.rmValues[0];

  constructor() {
    var _this = this;

    // this will be used to properly cause screen updates
    this.zone = new NgZone({enableLongStackTrace: false});

    // must override this method to set the response type to "arraybuffer"
    this.uploader.onBeforeUploadItem = function(fileItem: FileItem) {
      fileItem._xhr.responseType = 'arraybuffer';
    }
    // overrides progress method to use our own progress variable
    this.uploader.onProgressItem = function(fileItem: FileItem, progress: any) {
      if (progress === 100) {
        _this.uploading = false;
        _this.downloading = true;
      }

      // need to use NgZone to update the screen properly
      _this.zone.run(() => {
        _this.fileProgress = progress;
      });
    }

    // must override the on complete method for the uploader so that
    // we can download the file from the repsonse
    this.uploader.onCompleteItem = function(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
      if (status === 200) {
        _this.downloadSuccess = true;
        _this.downloading = false;
        let blob: Blob = new Blob([response], {type: 'application/zip'});
        FileSaver.saveAs(blob, _this.fileName);
      }
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileChosen() {
    if (this.uploader.queue.length > 1)
      this.uploader.queue = [this.uploader.queue[this.uploader.queue.length-1]];
    this.currentFile = this.uploader.queue[0];
    this.reset();
  }

  uploadFile() {
    this.uploading = true;

    let options: FileUploaderOptions = {
      method: 'POST',
      additionalParameter: {
        'useSBM': this.useSBM,
        'userLinFits': this.useLinFits,
        'firstLetterRM': this.selectedRM
      }
    }
    this.uploader.setOptions(options);

    this.uploader.uploadItem(this.currentFile);
  }

  cancelUpload() {
    this.currentFile.cancel();
    this.reset();
  }

  removeCurrentFile() {
    this.uploader.queue[0].remove();
    this.currentFile = null;
    this.reset();
  }

  reset() {
    this.uploading = false;
    this.downloading = false;
    this.downloadSuccess = false;
  }

}
