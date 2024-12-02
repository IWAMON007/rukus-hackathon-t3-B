<template>
    <section class="chat-view">
        <ul class="chat-list">
            <!-- 各messageをforで回す -->
            <Message v-for="{ user, msgType, timeStamp, isMine, msg, id } in chatList" :key="id" :id="id" :msg="msg"
                :isMine="isMine" :msgType="msgType" :user="user" :timeStamp="timeStamp">
            </Message>
        </ul>
    </section>
</template>


<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from "vue";
import Message from "./Message.vue";

const chatList = inject("chatList");

let lastScrollPosition = 0;

const handleScroll = () => {
    const chatView = document.querySelector(".chat-view");
    const currentScrollPosition = chatView.scrollTop;

    const moveBackground = () => {
        const scrollSpeed = currentScrollPosition - lastScrollPosition;
        const currentBackgroundPosition = parseFloat(getComputedStyle(chatView).backgroundPositionY) || 0;
        chatView.style.backgroundPositionY = `${currentBackgroundPosition + scrollSpeed * 1.0}px`;
        lastScrollPosition = currentScrollPosition;
    };

    requestAnimationFrame(moveBackground);

};

onMounted(() => {
    const chatView = document.querySelector(".chat-view");
    chatView.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
    const chatView = document.querySelector(".chat-view");
    chatView.removeEventListener("scroll", handleScroll);
});
</script>



<style scoped>
.chat-view {
    overflow-y: auto;
    padding-bottom: 80px;
    padding: 60px 0 140px 0;
    width: 80%;
    background: url("/road.png");
    background-size: contain; 
    background-position: center center;
    background-position-y: 0;
    transition: background-position 0.1s linear;
}

ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
}

.chat-list {
    margin: 0px 50px;
}
</style>
