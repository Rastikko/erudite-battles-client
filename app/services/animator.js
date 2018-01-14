import Service from '@ember/service';
import Evented from '@ember/object/evented';

import {computed} from '@ember/object';

export default Service.extend(Evented, {

    init() {
        this._super(...arguments);
        this.queuedAnimations = [];
    },

    isAnimationInProgress: false,
    haveAnimationsRemaining: computed.gt('queuedAnimations.length', 0),
    isAnimating: computed.or('isAnimationInProgress', 'haveAnimationsRemaining'),

    queue: function(tween) {
        this.get('queuedAnimations').pushObject(tween);
        this._triggerNextAnimation();
    },

    run: function() {

    },

    _triggerNextAnimation() {
        if (this.get('haveAnimationsRemaining') && !this.get('isAnimationInProgress')) {
            const nextAnimation = this.get('queuedAnimations.0');
            nextAnimation.vars.onComplete = () => {
                this.get('queuedAnimations').shiftObject();
                this.set('isAnimationInProgress', false);
                if (this.get('haveAnimationsRemaining')) {
                    this._triggerNextAnimation();
                } else {
                    this.trigger('animationsEnded');
                }
            }
            this.set('isAnimationInProgress', true);
            nextAnimation.resume();
        }
    }
});
