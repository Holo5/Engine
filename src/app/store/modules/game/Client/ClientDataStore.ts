import { Module } from 'vuex';
import { ClubState } from '../../../../core/logic/client/ClubState';
import { PlayerRank } from '../../../../core/logic/client/PlayerRank';
import { Relationship } from '../../../../core/logic/profile/Relationship';

interface IStateInterface {
    userId: number;
    username: string | undefined;
    figure: string;
    clubState: ClubState;
    rank: number;
    ambassador: boolean;
    currencies: { credits: number, diamonds: number, duckets: number, seasonals: number };
    relationships: Relationship[];
}

export const ClientDataModule: Module<IStateInterface, any> = {
    namespaced: true,
    state: {
        userId: undefined,
        username: undefined,
        figure: '',
        clubState: undefined,
        rank: 0,
        ambassador: false,
        currencies: undefined,
        relationships: [],
    },
    mutations: {
        setUserId: (state: IStateInterface, id: number) => {
            state.userId = id;
        },
        setUsername: (state: IStateInterface, username: string) => {
            state.username = username;
        },
        setFigure: (state: IStateInterface, figure: string) => {
            state.figure = figure;
        },
        setClubState: (state: IStateInterface, clubState: ClubState) => {
            state.clubState = clubState;
        },
        setRank: (state: IStateInterface, playerRank: PlayerRank) => {
            state.rank = playerRank.rank;
            state.ambassador = playerRank.isAmbassador;
        },
        updateCurrencies: (state: IStateInterface, currencies: { credits: number, diamonds: number, duckets: number, seasonals: number }) => {
            state.currencies = currencies;
        },
        setPlayerRelationship: (state: IStateInterface, relationships: Relationship[]) => {
            state.relationships = relationships;
        },
    },
};
