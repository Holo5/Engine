import { ChatStyle } from './ChatStyle';
import { IStyle } from './interfaces/IStyle';
import { Configuration } from '../../../../conf';

export class ChatStyles {
    static styles: IStyle[] = [
        new ChatStyle(0, 'normal').serialize(),
        new ChatStyle(1, 'generic').hideHead().notStaffOverrideable().serialize(),
        new ChatStyle(2, 'bot').notStaffOverrideable().allowHTML().serialize(),
        new ChatStyle(3, 'normal_red').serialize(),
        new ChatStyle(4, 'normal_blue').serialize(),
        new ChatStyle(5, 'normal_yellow').serialize(),
        new ChatStyle(6, 'normal_green').serialize(),
        new ChatStyle(7, 'normal_grey').serialize(),
        new ChatStyle(8, 'fortune_teller').system().notStaffOverrideable().serialize(),
        new ChatStyle(9, 'zombie_hand').hcOnly().serialize(),
        new ChatStyle(10, 'skeleton').hcOnly().serialize(),
        new ChatStyle(11, 'normal_sky_blue').hcOnly().serialize(),
        new ChatStyle(12, 'normal_pink').hcOnly().serialize(),
        new ChatStyle(13, 'normal_purple').hcOnly().serialize(),
        new ChatStyle(14, 'normal_dark_yellow').hcOnly().serialize(),
        new ChatStyle(15, 'normal_dark_turquoise').hcOnly().serialize(),
        new ChatStyle(16, 'hearts').hcOnly().serialize(),
        new ChatStyle(17, 'gothicrose').hcOnly().serialize(),
        new ChatStyle(19, 'piglet').hcOnly().serialize(),
        new ChatStyle(20, 'sausagedog').hcOnly().serialize(),
        new ChatStyle(21, 'firingmylazer').hcOnly().serialize(),
        new ChatStyle(22, 'dragon').hcOnly().serialize(),
        new ChatStyle(23, 'staff').serialize(),
        new ChatStyle(24, 'bats').hcOnly().serialize(),
        new ChatStyle(25, 'console').hcOnly().serialize(),
        new ChatStyle(26, 'steampunk_pipe').hcOnly().serialize(),
        new ChatStyle(27, 'storm').hcOnly().notStaffOverrideable().serialize(),
        new ChatStyle(28, 'parrot').system().notStaffOverrideable().serialize(),
        new ChatStyle(29, 'pirate').hcOnly().serialize(),
        new ChatStyle(30, 'bot_guide').system().allowHTML().notStaffOverrideable()
            .serialize(),
        new ChatStyle(31, 'bot_rentable').system().notStaffOverrideable().serialize(),
        new ChatStyle(32, 'skelestock').system().notStaffOverrideable().serialize(),
        new ChatStyle(33, 'bot_frank_large').system().allowHTML().notStaffOverrideable()
            .serialize(),
        new ChatStyle(34, 'notification').system().notStaffOverrideable().serialize(),
        new ChatStyle(35, 'goat').system().notStaffOverrideable().serialize(),
        new ChatStyle(36, 'santa').system().notStaffOverrideable().serialize(),
        new ChatStyle(37, 'ambassador').system().ambassador().serialize(),
        new ChatStyle(38, 'radio').system().notStaffOverrideable().serialize(),
    ];

    static getFromId(id: number): IStyle {
        return this.styles.filter((style: IStyle) => style.id === id)[0];
    }

    static getForSelection(withHc: boolean, rank: number, ambassador: boolean): IStyle[] {
        return this.styles.filter((style: IStyle) => {
            if (!style.systemOnly && Configuration.chats.bubbles.includes(style.id)) {
                if (
                    (!withHc && style.isHcOnly)
                  || (!ambassador && style.ambassadorOnly)
                  || (rank < Configuration.chats.minRankChatBubbles && (style.id === 23 || style.id === 37))
                ) {
                    return false;
                }

                return true;
            }

            return false;
        });
    }
}
