<template>
    <div :class="['message', { withIcon: isRoomVisitMessage }]" v-tooltip.left="message.time">
        <span v-if="this.isRoomVisitMessage">
            <i class="icon room"></i> {{ message.body }}
        </span>
        <span v-else :class="{ whisper: message.isWhisper }">
            <b>{{ message.username }}:</b> {{ message.body }}
        </span>
    </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {HistoryLine} from "../../../../../../../../../core/logic/history/HistoryLine";
import {EHistoryLineType} from "../../../../../../../../../core/logic/history/enum/EHistoryLineType";

export default Vue.extend({
    name: 'room-infos-chatlogs-message-one',
    props: {
        message: {
            type: Object as PropType<HistoryLine>,
        }
    },
    computed: {
        isRoomVisitMessage() {
            return this.message.type === EHistoryLineType.ROOM;
        },
    },
});
</script>

<style lang="scss" scoped>
@import "../../../../../../../assets/sass/colors";
@import "../../../../../../../assets/sass/mixins";

.message {
    width: 100%;
    display: flex;
    flex-direction: row;

    &.withIcon {
        margin-top: 2px;
    }

    span {
        font-size: 12px;
        color: $white;
        width: 100%;
        white-space: pre-wrap;
        word-wrap: break-word;

        .whisper {
            font-style: italic;
            opacity: 0.8;
        }

        .icon {
            margin-top: -2px;
            margin-right: 5px;
            float: left;

            &.room {
                @include itf-icon(18px, 18px, -300px, -19px);
            }

            &.date {
                @include itf-icon(18px, 18px, -300px, 0);
            }
        }

        b {
            font-size: 12px;
            color: rgba($white, 0.8);
            font-weight: bold;
            float: left;
        }
    }
}
</style>
