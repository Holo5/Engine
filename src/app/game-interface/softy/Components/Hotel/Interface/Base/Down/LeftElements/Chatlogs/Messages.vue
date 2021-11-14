<template>
    <div class="messages" ref="messages-container" @mousedown="canScroll = false" @mouseup="canScroll = true">
        <message-one v-for="message in messages" :message="message"></message-one>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MessageOne from './Message.vue';
import {mapState} from "vuex";

export default Vue.extend({
    name: 'room-infos-chatlogs-messages',
    components: {
        MessageOne,
    },
    computed: {
        ...mapState('chatHistory', ['messages']),
    },
    data: () => ({
        canScroll: true,
    }),
    watch: {
        messages(newMessage) {
            if (this.canScroll) {
                const container = this.$refs['messages-container'];

                container.scrollTo(0, container.scrollHeight);
            }
        },
    },
});
</script>

<style lang="scss" scoped>
.messages {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 10px;
}
</style>
