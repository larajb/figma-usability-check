<template>
    <div>
        <div :id="'annotation-' + annotationType">
            <div :id="'annotation-title-' + annotationType" class="annotations__annotation-header">
                <div class="annotations__annotation-header-colorsquare" :style="myStyle"></div>
                <p class="type--pos-medium-normal">{{ annotationType }}</p>
            </div>
            <div id="temp">
                <div v-for="(annotation, index) in annotations" :key="index" :id="'annotation-entry-' + annotation" class="annotations__annotation-entry">
                    <p class="type--pos-medium-normal">{{ annotation }}</p>
                    <div class="annotations__annotation-entry-settings">
                        <div :id="'delete-' + annotation" class="icon icon--trash" @click="deleteAnnotation(annotation)"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { dispatch } from '../../uiMessageHandler';

export default {
    name: 'AnnotationListEntry',
    props: {
        annotationType: {
            type: String,
            default: null,
        },
        annotations: {
            type: Array,
            default: null,
        },
    },
    data() {
        return {
            myStyle: {
                backgroundColor: this.getColor(),
            }
        }
    },
    methods: {
        deleteAnnotation(annotation) {
            dispatch('deleteAnnotation', annotation);
            this.$emit('delete', { type: this.annotationType, id: annotation });
        },
        getColor() {
            var colors = {
				'button': 'rgb(255, 255, 0)',
				'form': 'rgb(158, 0, 196)',
				'homepage': 'rgb(64, 224, 209)',
				'input': 'rgb(0, 0, 255)',
				'link': 'rgb(255, 255, 0)',
			};
			return colors[this.annotationType];
        }
    }
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .annotations__annotation-header {
		display: flex;
		margin-bottom: 20px;
	}

	.annotations__annotation-header-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

	.annotations__annotation-entry {
		width: 80%;
		margin-left: 15%;
		display: flex;
		justify-content: space-between;
	}

	.annotations__annotation-entry-settings {
		display: flex;
	}
</style>
