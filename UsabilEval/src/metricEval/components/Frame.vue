<template>
    <div>
        <Checkbox v-model="selected" @input="handleClick">{{ frame.name }}</Checkbox>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import { Checkbox } from 'figma-plugin-ds-vue';

export default {
    name: 'Frame',
    props: {
        frame: {
            type: Object,
            default: null,
        },
    },
    components: {
        Checkbox,
    },
    data() {
        return {
            isClicked: false,
            selected: false,
        }
    },
    computed: {
        ...mapState(['selectedFrames']),
    },
    watch: {
        selectedFrames() {
            const index = this.selectedFrames.findIndex((selectedFrame) => selectedFrame.name === this.frame.name);
            if (index >= 0 ) {
                this.selected = true;
            } else {
                this.selected = false;
            }
        },
    },
    methods: {
        handleClick() {
            this.$emit('selected', { name: this.frame.name, id: this.frame.id, isSelected: this.selected });
        },
    },
};
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";
</style>
