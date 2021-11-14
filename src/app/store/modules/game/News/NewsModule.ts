import { Module } from 'vuex';
import { INew } from './interfaces/INew';
import { GetGiftWrappingConfigurationComposer } from '../../../../core/network/packets/outgoing/catalog/GetGiftWrappingConfigurationComposer';

interface IStateInterface {
    display: boolean,
    news: INew[]
}

export const NewsModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        display: false,
        news: [],
    },
    mutations: {
        closeBox: (state) => {
            state.display = false;
        },
        setAllNews: (state, news: INew[]) => {
            state.display = true;
            state.news = news;
        },
    },
    actions: {
        loadNews:({ commit }, login: string) => {
            const formData = new FormData();
            formData.append('login', login);
            formData.append('key', localStorage.getItem('sess_id'));

            fetch('https://api.holo5.co/news.php', { method: 'post', body: formData })
                .then(response => {
                    if (response.status === 501) {
                        commit('network/close', undefined, { root: true });
                    }

                    response.json().then((news: INew[]) => {
                        if (news.length > 0) {
                            commit('setAllNews', news);
                        }
                    });
                });

        },
    },
};

