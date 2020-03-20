import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import {HttpClient} from "@angular/common/http";

declare  var $: any;

@Component({
  selector: 'app-hotsite',
  templateUrl: './hotsite.component.html',
  styleUrls: ['./hotsite.component.css']
})
export class HotsiteComponent implements OnInit,OnDestroy {
 
  pt_br:boolean;
  languagestexts:any;
  texts:any = {};

  videoplay: any = {};

  constructor(private http: HttpClient,private elementRef: ElementRef) { 

  }


    onLangClick(lang){
        if(lang == 'pt-br'){
            this.pt_br =  true;
        }else{
            this.pt_br =  false;
        }

        this.http.get('/service/hotsite/lang?lang=' + lang).subscribe(result => {
            this.texts = result;
        });
    }

    ngOnDestroy(): void {
      console.log(this.elementRef.nativeElement)
      this.videoplay.remove();
    }

  ngOnInit() {
    this.pt_br = true;

    this.http.get('/service/hotsite/lang?lang=pt-br').subscribe(result => {
        this.texts = result;
    });

    this.videoplay = $("#container").YTPlayer(
      {
        useOnMobile:true,
        mobileFallbackImage:'../../../assets/img/background_1.svg',
        videoURL:'https://youtu.be/lXV5cSMoAuw',
        quality: 'medium',
        coverImage: '../../../assets/img/background_1.svg',
        containment:'body',
        autoPlay:true,
        optimizeDisplay:true,
        showControls:false,
        startAt:0,
        stopMovieOnBlur: false,
        opacity:1,
        mute:true
      }
    );

    $("#container").YTPlayer({
      mask:{
          25: '../../../assets/img/background_5.png'
      }
    });
  }


}
