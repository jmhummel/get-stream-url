import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'get-stream-url';
  reKey = /var key= '(\w+)';/;
  reMasterkey = /var masterkey= '(\w+)';/;
  reServer = /var server='([\w\d.]+)';/;
  key = '';
  masterkey = '';
  server = '';
  hlsUrl = '';
  hlsContents = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

  }

  fetchHlsUrls(url: string): void {
    this.http.get(url, {responseType: 'text'})
      .subscribe(data => {
        // console.log(data);
        let matches = this.reKey.exec(data);
        // console.log(matches);
        if (!matches) {
          throw new Error('no key found');
        }
        this.key = matches[1];

        matches = this.reMasterkey.exec(data);
        // console.log(matches);
        if (!matches) {
          throw new Error('no masterkey found');
        }
        this.masterkey = matches[1];

        matches = this.reServer.exec(data);
        // console.log(matches);
        if (!matches) {
          throw new Error('no server found');
        }
        this.server = matches[1];
        this.hlsUrl = 'http://' + this.server + '/' + this.key + '.m8';
        console.log(this.hlsUrl);

        // this.http.get(this.hlsUrl, {responseType: 'text'})
        //   .subscribe(hlsContents => {
        //     this.hlsContents = hlsContents;
        //   });
      });
  }
}
