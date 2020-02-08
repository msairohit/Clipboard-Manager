import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-paste',
  templateUrl: './paste.component.html',
  styleUrls: ['./paste.component.css']
})
export class PasteComponent implements OnInit {

  previousText: String = '';
  currentText: String = '';
  data: any;

  @ViewChild('manualText', { static: false }) manualText: ElementRef;

  allData: String[] = [];
  blacklist : String [] = [];

  constructor() { }
  clearList() {
    this.allData = [];
  }

  paste() {
    navigator.clipboard.readText()
      .then(text => {
        this.previousText = text;
        this.data = text;
        this.allData.push(text);
      })
      .catch(err => {
        console.log('Something went wrong', err);
      })
  }
  removeSingleData(event: String) {
    this.allData = this.allData.filter(item => item !== event);
  }
  manualAdd(text) {
    this.allData.push(text);
    this.manualText.nativeElement.value = "";
  }

  checkChange() {
    this.getCurrentClipboardText();
    console.log("previousText", this.previousText);
    console.log("currentText", this.currentText);
    if (this.previousText != this.currentText) {
      document.getElementById("openModalButton").click();
      alert("Clipboard changed do you want to copy??");
    }
  }

  checkChange1() {
    navigator.clipboard.readText()
      .then(text => {
        this.currentText = text;
        console.log("blacklist", this.blacklist);
        if (!this.allData.includes(this.currentText) && !this.blacklist.includes(this.currentText)) {
          console.log("previous text ", this.previousText);
          console.log("current text", this.currentText);
          // alert("not same");
          document.getElementById("openModalButton").click();
        }
        //if user clicks dont need this word dont check it till next word is saved
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  getCurrentClipboardText() {
    console.log("calling");
    navigator.clipboard.readText()
      .then(text => {
        console.log(text);
        this.currentText = text;
      })
      .catch(err => {
        console.log('Something went wrong', err);
      });
  }

  ignoreTheCopiedChange(){
    console.log("entered into ignoring method");
    this.getCurrentClipboardText();
    console.log(this.currentText);
    this.blacklist.push(this.currentText);
  }

  ngOnInit() {

    /* navigator.clipboard.addEventListener('paste', e => {
      alert("changed");
      console.log(e);
    }) */

    setInterval(() => this.checkChange1(), 10000);

    document.addEventListener('paste', (e) => {
      var values = e.clipboardData.getData('text/plain');
      console.log(values);
      this.previousText = values;
    })
  }

}
