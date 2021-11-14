namespace HoloInterface {
    export interface Notification {
        title: string
        body: string
        room?: number
        url?: string
    }

    export interface DraggablePositions {
        clientX: number
        clientY: number
        movementX: number
        movementY: number
    }

    export namespace Figure {
        export type Headonly = Boolean;
        export type Direction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
        export type Size = 'l' | 'large' | 'n' | 'normal' | 's' | 'small' | 'big';
    }

    export namespace Messenger {
        export interface Discussion {
            id: number
            friend: string
            messages: HoloInterface.Messenger.Message[]
        }

        export interface Message {
            date: string
            body: string
            from: 'him' | 'me'
            viewed: boolean
        }

        export interface FriendList {
            chatID: number
            username: string
            messagesUnviewed: number
        }

        export interface Disabled {
            up: boolean
            down: boolean
        }
    }

    export namespace Shop {
        export interface Category {
            visible?: boolean
            index?: number
            id: number
            caption: string
            icon?: string
            pageType?: string
            categories?: HoloInterface.Shop.Category[]
            itempage?: HoloInterface.Shop.Layout.Itempage
            frontpage?: HoloInterface.Shop.Layout.Frontpage[]
            introductionpage?: HoloInterface.Shop.Layout.IntroductionPage
            items?: HoloInterface.Shop.Item[]
            display?: HoloInterface.Shop.Item[]
        }

        export interface Group {
            id: number
            name: string
            ownerId?: number
        }

        export interface Event {
            id: number
            name: string
        }

        export namespace Layout {
            export interface Frontpage {
                caption: string
                image: string
            }

            export interface Itempage {
                items: HoloInterface.Shop.Item[]
                description: string
                image: string
            }

            export interface IntroductionPage {

            }
        }

        export interface Gift {
            item: HoloInterface.Shop.Item
            count: number
        }

        export interface Item {
            id: number
            caption: string
            icon: string
            priceType: string | string[]
            ltd?: boolean
            price: number | number[]
        }
    }

    export namespace User {
        export interface Friend {
            id: number
            username: string
            fakeUsername?: string
        }

        export interface Room {
            id: number
            name: string
        }

        export interface Data {
            id: number
            username: string
            wallet: {
                credits: number
                duckets: number
                diamonds: number
            },
            figure: string
        }
    }

    export namespace Navigator {
        export interface Category {
            name: string
            title: string
        }

        export interface Room {
            id: number
            title: string
            description: string
            status: string
            statusText: string
            users_in: number
            users_max: number
            photo?: string
            owner: object
            isGroupHQ: boolean
        }
    }
}
