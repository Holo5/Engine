import { Module } from 'vuex';

export interface IStateInterface {
    logged: boolean,
}

export const BetaModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        logged: false,
    },
    mutations: {
        setLogged: (state: IStateInterface, payload: boolean) => {
            state.logged = payload;
        },
    },
    actions: {
        login: async ({ dispatch, state }, payload: { login: string, password: string, pin: string }) => {
            const formData = new FormData();
            formData.append('username', payload.login);
            formData.append('password', payload.password);
            formData.append('pin', payload.pin);

            const init: RequestInit = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch('https://www.habbocity.me/app/actions/HoloLogin.php', init).then((resp) => resp.json());
            if (response.response === 'connected') {
                state.logged = true;
                dispatch('bridge/initCore', response.sso, { root: true });
            }
        },
    },
};
