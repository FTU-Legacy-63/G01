/* Asset routing only. No case IDs, financial rules or campaign save data. */
(()=>{'use strict';
window.PitchLedger.audioConfig=Object.freeze({
 settingsKey:'pitch-ledger:audio:v1',resumeKey:'pitch-ledger:audio-resume:v1',
 musicVolume:0.7,effectsVolume:0.7,fadeMs:700,sliderIntervalMs:80,
 music:Object.freeze({start:'./assets/audio/bgm/bgm_start_screen.ogg',gameplay:'./assets/audio/bgm/bgm_gameplay.ogg',result:'./assets/audio/bgm/bgm_result_screen.ogg'}),
 effects:Object.freeze({click:'./assets/audio/sfx/sfx_button_click.wav',confirm:'./assets/audio/sfx/sfx_button_confirm.wav',back:'./assets/audio/sfx/sfx_button_back.wav',tick:'./assets/audio/sfx/sfx_slider_tick.wav',release:'./assets/audio/sfx/sfx_slider_release.wav'})
});})();
