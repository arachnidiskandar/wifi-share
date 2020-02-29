import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { QrCodeHelper } from 'ngx-kjua';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ssid = '';
  pass = '';
  wifi = '';
  qrCode;

  @ViewChild('htmlQR', {static: false}) htmlQR: ElementRef;
  pdf = new jsPDF('p', 'mm', [297, 210]);
  constructor(private renderer: Renderer2) {
  }

  onChange() {
    console.log(this.htmlQR);
    this.wifi = QrCodeHelper.makeWifi(this.ssid, this.pass);
  }
  gerarPDF() {
    this.pdf.addHTML(this.htmlQR.nativeElement, () => {
      this.pdf.save('wifi-share.pdf');
    });
  }
}
