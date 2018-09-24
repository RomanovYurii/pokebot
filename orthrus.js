// ==UserScript==
// @name         Pokemon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.orthrusonline.ru/play/
// @grant        none
// ==/UserScript==

let check;

(function () {
    'use strict';

    $('#game').append(`<div id="script"></div>`);
    $('head').append(`<style>
        #script {
            position: absolute;
            height: 30px;
            width: 30px;
            background-color: white;
            bottom: 120px;
            left: 50px;
            z-index: 999;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url(https://image.flaticon.com/icons/png/512/32/32791.png);
            background-position: center;
            background-size: 90%;
            background-repeat: no-repeat;
            border: 5px solid #f1f0ec;
            cursor: pointer;
        }
        @media (max-width: 640px){
            #script {
                left: -20px;
                bottom: 100px;
            }
        }
        
        @media (max-width: 992px){
            #script {
                left: -20px;
                bottom: 100px;
            }
        }
    </style>`);

    let check;
    let START_SCRIPT = false;

    $('#script').click(function () {
        if (!START_SCRIPT) {
            check = setInterval(function () {
                let battle = $('#divFight').css('display') === 'block';
                let captcha = $('#captchaBody').length !== 0;
                console.log("Проверка...");

                if (captcha) {
                    $('body').append('<audio id="capthcaSound" src="http://soundbible.com/grab.php?id=1377&type=wav" preload="auto" autoplay></audio>');
                    setTimeout(function () {
                        $('#capthcaSound').trigger('pause');
                    }, 5000);
                } else if (battle) {
                    console.log("Боевая локация.");

                    setTimeout(function () {
                        let hp = +$('.bar').css('width').split('p')[0] * 100 / +$('.fight-hp').css('width').split('p')[0] >= 20;
                        let pp = checkPP();
                        let msg = $('.fmsg').length !== 0;
                        if (msg) {
                            console.log("Бой окончен.");

                            clickElements('#run-btn');
                            console.log("Успешно покинули поле боя.")
                        } else if (hp && pp) {
                            console.log("Атакуем...");

                            kick();
                        } else {
                            clickElements(
                                '#wildBtn',
                                '#run-btn',
                                '#run-btn',
                                '.map-moves ul li:nth-child(1) span',
                                '.map-moves ul li:nth-child(2) span',
                                '.map-moves ul li:nth-child(1) span',
                                '.map-moves ul li:nth-child(1) span',
                                '.map-moves ul li:nth-child(3) span',
                                '.map-npcs div:first-child',
                                '.next-btn',
                                '.links .npc-link:first-child',
                                '.map-moves ul li:nth-child(1) span',
                                '.map-moves ul li:nth-child(2) span',
                                '.map-moves ul li:nth-child(2) span',
                                '.map-moves ul li:nth-child(3) span',
                                '.map-moves ul li:nth-child(1) span',
                                '#wildBtn'
                            );
                        }
                    });
                }
            }, 10000);
        } else {
            clearInterval(check);
        }
        START_SCRIPT = !START_SCRIPT;
    });

    function checkPP() {
        let r = false;
        $('.mtmove').each(function (idx, el) {
            let disabled = $(el).hasClass('disabled');
            if (!disabled) {
                r = true;
                return false;
            }
        });
        return r;
    }

    function clickElements(...els) {
        let counter = 0;
        let clicker = setInterval(function clickElement() {
            let e = $(els[counter]);
            console.log(e.text());
            e.click();
            counter++;
            if (counter === els.length)
                clearInterval(clicker);
        }, 500);
    }

    function kick() {
        $('.mtmove').each(function (idx, el) {
            let disabled = $(el).hasClass('disabled');
            if (!disabled) {
                clickElements(el);
                return false;
            }
        });
    }


})();