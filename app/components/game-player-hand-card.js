import Component from '@ember/component';

import { TweenLite } from 'gsap';

import {inject} from '@ember/service';

export default Component.extend({
    classNames: ['game-player-hand-card', 'card'],

    animator: inject(),

    didInsertElement() {
        this._super(...arguments);
        // TweenLite.to(this.element, 1.5, {width: '100%', height: '100%'});
        const tween = TweenLite.fromTo(this.element, 0.2, {scaleX:0.5, scaleY:0, opacity: 0}, {scaleX:1, scaleY:1, opacity: 1, paused: true});
        this.get('animator').queue(tween);
    },
});
