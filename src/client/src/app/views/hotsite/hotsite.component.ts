import {Component, OnInit, ElementRef, OnDestroy, AfterViewInit, HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {loadConfigurationFromPath} from "tslint/lib/configuration";

declare  var $: any;

@Component({
    selector: 'app-hotsite',
    templateUrl: './hotsite.component.html'
})
export class HotsiteComponent implements OnInit, OnDestroy, AfterViewInit {
    pt_br: boolean;
    texts: any = {};
    interValMasks: any = {};
    fullpage: any = {};
    videoplay: any = {};
    showInfo: boolean;
    constructor(
        private http: HttpClient,
        private elementRef: ElementRef,
        private router: Router
    ) {
        this.showInfo = false;
        clearInterval(this.interValMasks);
    }

    onLangClick(lang) {
        if (lang == 'pt-br') {
            this.pt_br = true;
        } else {
            this.pt_br = false;
        }

        this.http.get('/service/hotsite/lang?lang=' + lang).subscribe(result => {
            this.texts = result;
        });
    }

    openMenu() {

        let firstMask = true;

        this.interValMasks = setInterval(function () {

            if (firstMask) {
                $('#container').YTPPause();
                $('#container').YTPAddMask('../assets/img/background_overlay_1.png');
            } else {
                $('#container').YTPPause();
                $('#container').YTPAddMask('../assets/img/background_overlay_2.png');
            }
            firstMask = !firstMask;

        }, 5000);

        $('#container').YTPAddMask('../assets/img/background_overlay_2.png');
        $('#container').YTPMute();
        $('#container').YTPPause();
        $('.btn-navigate').css('display', 'grid').fadeIn()

        $(".content-overlay, .bg-overlay").addClass("opened"),
            $("#logo").addClass("pushed"),
            $(".c-hamburger").addClass("is-active"),
            $(".info").addClass("is-active"),
            $(".menu").css('display', 'none'),
            $(".info-2").css('display', 'block'),
            $("#dpat-nav").addClass("active"),
            $.fn.fullpage.moveTo(1)
    }

    closeMenu() {
        clearInterval(this.interValMasks);

        $('#container').YTPRemoveMask();
        $('#container').YTPPlay();
        $('.btn-navigate').fadeOut()
        $(".content-overlay, .bg-overlay").removeClass("opened"),
            $("#logo").removeClass("pushed"),
            $(".menu").css('display', 'block'),
            $(".c-hamburger").removeClass("is-active"),
            $(".info-2").css('display', 'none'),
            $(".info").removeClass("is-active"),
            $(".section, #dpat-nav").removeClass("active")
    }

    moveUp() {
        $.fn.fullpage.moveSectionUp();
    }
    moveDown() {
        $.fn.fullpage.moveSectionDown();
    }

    handleMenu(event) {
        clearInterval(this.interValMasks);
        this.showInfo = !this.showInfo;
        if (this.showInfo) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }

    ngOnInit() {
        this.pt_br = true;

        this.http.get('/service/hotsite/lang?lang=pt-br').subscribe(result => {
            this.texts = result;
        });

        this.fullpage = $("#fullpage").fullpage({
            navigation: true,
            showActiveTooltip: true,
            slidesNavigation: true,
            // navigationTooltips: ["O QUE É?", "DIFERENCIAL", "COMO USAR?", "FIP MONITORAMENTO", "EQUIPE"],
        });

        this.videoplay = $("#container").YTPlayer(
            {
                useOnMobile: true,
                mobileFallbackImage: '../../../assets/img/background_1.svg',
                videoURL: 'https://youtu.be/lXV5cSMoAuw',
                quality: 'highres',
                coverImage: '../../../assets/img/background_1.svg',
                containment: '#hotsite, #body-mobile-hotsite',
                autoPlay: true,
                onReady: true,
                optimizeDisplay: true,
                showControls: false,
                startAt: 0,
                stopMovieOnBlur: false,
                opacity: 1,
                mute: true
            }
        );

        $("#container").YTPlayer({
            mask: {
                5: '../../../assets/img/background_3.png',
            }
        });

        $(".section").removeClass("active");

        if (window.innerWidth < 900) {
            this.router.navigate(['/mobile']);
        }
    }

    ngAfterViewInit() {

    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (window.innerWidth < 900) {
            this.router.navigate(['/mobile']);
        }
    }

    ngOnDestroy(): void {
        $.fn.fullpage.destroy('all');
    }

}
