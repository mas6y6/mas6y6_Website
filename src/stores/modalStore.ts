import { defineStore } from 'pinia'
import {type Component, markRaw} from "vue";

export const modalStore = defineStore("modalStore",{
    state: () => ({
        modal: null as Component | null
    }),

    actions: () => ({
        modal: null as Component | null,

        setModal(component: Component) {
            this.modal = markRaw(component);
        },

        clear() {
            this.modal = null;
        }
    })
})