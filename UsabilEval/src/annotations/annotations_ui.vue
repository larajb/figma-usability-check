<template>
  	<div class="annotations-ui">
		<p class="type--pos-large-bold">
			Annotationen
		</p>
		<p class="type--pos-medium-normal">
			Wähle einen Annotationstypen und füge eine Annotation hinzu.
		</p>
		<div class="annotations__selection">
			<select id="annotation-type-select" class="select-menu">
				<option value="button">Button</option>
				<option value="form">Form</option>
				<option value="homepage">Homepage</option>
				<option value="input">Input</option>
				<option value="link">Link</option>
			</select>
			<button class="button button--primary" @click="sendSelection()">
				Hinzufügen
			</button>
		</div>
		<hr class="style-one">
		<p class="type--pos-medium-bold">
			Deine Annotationen
		</p>
		<div id="annotations" class="type--pos-medium-normal">
			<annotation-list-entry v-for="(annotation, index) in annotations" :key="index" :annotation-type="annotation.type" :annotations="annotation.annotations" @delete="deletedAnnotation($event)" />
		</div>
	</div>
</template>

<script>
import { dispatch, handleEvent } from '../uiMessageHandler';

import { selectMenu, iconInput, disclosure } from 'figma-plugin-ds';

import AnnotationListEntry from './components/AnnotationListEntry.vue';

export default {
	data() {
		return {
			annotations: [],
		}
	},
	components: {
		AnnotationListEntry,
	},
	mounted() {
		selectMenu.init();
    	// window.iconInput.init();
    	// window.disclosure.init();

		this.getAnnotationStorage();

		handleEvent('annotationAdded', info => {
			this.addAnnotationsToScreen(info);
		});

		// Verschiedene Fehlermeldungen für verschiedene Fehler
		handleEvent('annotationCannotBeAdded', errorCode => {
			var message = 'Annotation konnte nicht hinzugefügt werden. ';
			switch(errorCode) {
				case 0:
					message += 'Es wurde kein Knoten ausgewählt.';
					break;
				case 1:
					message += 'Es wurden mehrere Knoten ausgewählt.';
					break;
			}
			alert(message);
		});
	},
	destroyed() {
        selectMenu.destroy();
    },
	methods: {
		sendSelection() {
			const select = document.getElementById('annotation-type-select');
			dispatch('selection', select.value);
		},
		addAnnotationsToScreen(info) {
			if (this.annotations.length > 0) {
				var myIndex = null;
				var found = this.annotations.find(function(element, index) {
					if(element.type === info.type) {
						myIndex = index;
						return true;
					} else {
						return false;
					}
				});
				if (found) {
					this.annotations[myIndex].annotations.push(info.id);
				} else {
					this.annotations.push({ type: info.type, annotations: [info.id] });
				}
			} else {
				this.annotations.push({ type: info.type, annotations: [info.id] });
			}
			this.setAnnotationStorage();
		},
		deletedAnnotation(args) {
			for (let i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i].type === args.type) {
					for (let j = 0; j < this.annotations[i].annotations.length; j++) {
						if (this.annotations[i].annotations[j] === args.id) {
							if (this.annotations[i].annotations.length === 1) {
								this.annotations.splice(i, 1);
							} else if (this.annotations[i].annotations.length > 1) {
								this.annotations[i].annotations.splice(j, 1);
							}
						}
					}
				}
			}
			this.setAnnotationStorage();
        },
		getAnnotationStorage() {
			dispatch('getAnnotationStorage');
			handleEvent('currentAnnotationStorage', annotations => {
				if (annotations !== undefined) {
					this.annotations = annotations;
				}
			});
		},
		setAnnotationStorage() {
			dispatch('setAnnotationStorage', this.annotations);
		}
	},
};
</script>

<style lang='scss'>
	@import "../../node_modules/figma-plugin-ds/dist/figma-plugin-ds.css";

	.annotations-ui {
		padding: 10px;
	}

	.annotations__selection {
		display: flex;
	}

	hr.style-one {
		border: 0;
		height: 1px;
		background: #666;
		background-image: -webkit-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -moz-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -ms-linear-gradient(left, #ccc, #666, #666, #ccc);
		background-image: -o-linear-gradient(left, #ccc, #666, #666, #ccc);
	}
</style>