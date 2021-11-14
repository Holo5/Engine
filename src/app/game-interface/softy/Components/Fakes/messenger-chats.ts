const msg: Array<HoloInterface.Messenger.Message> = [
    {
        date: 'Envoyé à 13:30',
        body: 'salut mec ça va ? car moi oui',
        from: 'him',
        viewed: true,
    },
    {
        date: 'Envoyé à 13:30',
        body: 'ouais, tu fais quoi ??',
        from: 'me',
        viewed: true,
    },
    {
        date: 'Envoyé à 13h30',
        body: 'absolument rien d\'intéressant et toi ?',
        from: 'him',
        viewed: true,
    },
    {
        date: 'Envoyé à 13:30',
        body: 'je fais un test des emotes! | | | |||',
        from: 'me',
        viewed: true,
    },
];

export const fakeMessages: Array<HoloInterface.Messenger.Discussion> = [
    {
        id: 1,
        friend: 'Eklopsis',
        messages: [ // TODO: Put fake messages in file
            ...msg,
            ...msg,
            {
                date: 'Envoyé à 13h30',
                body: 'd\'acc',
                from: 'him',
                viewed: false,
            },
            {
                date: 'Envoyé à 13h30',
                body: 'd\'accodak ok dacc !!!!!!!!!!',
                from: 'him',
                viewed: false,
            },
        ],
    },
    {
        id: 2,
        friend: 'Pitt05',
        messages: [
            ...msg,
            {
                date: 'Envoyé à 13h30',
                body: 'd\'acc',
                from: 'him',
                viewed: false,
            },
        ],
    },
    {
        id: 3,
        friend: 'Softy',
        messages: msg,
    },
    {
        id: 4,
        friend: 'Anis',
        messages: [
            ...msg,
            {
                date: 'Envoyé à 13h30',
                body: 'd\'acc',
                from: 'him',
                viewed: false,
            },
            {
                date: 'Envoyé à 13h30',
                body: 'd\'accodak ok dacc !!!!!!!!!!',
                from: 'him',
                viewed: false,
            },
        ],
    },
];
