//"Howls" for use in Ludum Dare 32 Game

var hit = new Howl({urls: ['././Audio/47356__fotoshop__oof.wav'], volume: 0.1 });  //plays when you are struck with a bola
var chimes = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/131979__juskiddink__chimes.wav'], loop: true, volume: 0.2 }); //looping background music
var bounce = new Howl({urls: ['././Audio/198116__editor-adp__clang-1.wav'], volume: 0.2 }); //plays when you redirect a bola
var strike = new Howl({urls: ['././Audio/196733__paulmorek__crash-02.wav'], volume: 0.1 }); //plays when a redirected bola hits an enemy
var reflect = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122647__juskiddink__singing-bowl-2_edit.wav'], volume: 0.1 }); //plays when you redirect an enemy
var sadBell = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/59535__juskiddink__bell2.wav'], volume: 0.5 }); //plays on game over
var lowNote = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122680__juskiddink__gong-2.wav']}); //plays on game over
var song = new Howl({urls: ['././Audio/11078__maerkunst__female-voice/176118__maerkunst__short-song-1_edit.wav'], volume: 0 }).play(); //plays while shields are up via fadeIn/Out functions
var lowNote2 = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122680__juskiddink__gong-2.wav'], loop: true, volume: 0.2}); //looping background
var bellCall = new Howl({urls: ['././Audio/5069__juskiddink__bells-and-gongs/122650__juskiddink__singing-bowl_edit.wav'], volume: 0.1 }); //plays on mouse click