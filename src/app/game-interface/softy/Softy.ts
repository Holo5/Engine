import Vue from 'vue';
import VTooltip, { VPopover } from 'v-tooltip';
import { Configuration } from '../../../conf';
import { IGameInterface } from '../../interfaces/IGameInterface';
import './Components/Hotel/Interface/types';

import App from './Components/App.vue';
import { HStore } from '../../store/Store';

export class Softy implements IGameInterface {
    private _vueM: Vue;

    public init(store: typeof HStore): Promise<void> {
        Object.defineProperty(Vue.prototype, '$config', { value: { APP_URL: Configuration.images.imageDomain } });

        Vue.use(VTooltip);
        Vue.component('v-popover', VPopover);

        return new Promise((resolve, reject) => {
            this._vueM = new Vue({
                el: '#game',
                template: '<app></app>',
                components: {
                    App,
                },
                store,
                mounted() {
                    resolve();
                },
            });
        });
    }
}
