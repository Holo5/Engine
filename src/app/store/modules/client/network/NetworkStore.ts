import { Module } from 'vuex';
import { Outgoing } from '../../../../core/network/packets/outgoing/Outgoing';
import { SocketClient } from '../../../../core/network/web-socket/SocketClient';

let socketClient: SocketClient;

export const NetworkModule: Module<{}, any> = {
    namespaced: true,
    mutations: {
        attachSocketClient: (state: {}, sC: SocketClient) => {
            socketClient = sC;
        },
        composePacket: (state: {}, composer: Outgoing) => {
            if (socketClient !== undefined) {
                socketClient.processOutgoing(composer);
            }
        },
        close: () => {
            if (socketClient !== undefined) {
                socketClient.close();
            }
        },
    },
};
