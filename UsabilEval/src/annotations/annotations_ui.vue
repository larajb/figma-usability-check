<template>
  	<div>
		<p class="type--pos-large-bold">
			Annotationen
		</p>
		<p class="type--pos-medium-normal">
			Wähle einen Annotationstypen und füge eine Annotation hinzu.
		</p>
		<div class="annotation-add">
			<select id="annotation-type-select" class="select-menu">
				<option value="button">Button</option>
				<!-- <option value="footer">Footer</option> -->
				<option value="form">Form</option>
				<!-- <option value="header">Header</option> -->
				<option value="homepage">Homepage</option>
				<option value="input">Input</option>
				<option value="link">Link</option>
				<!-- <option value="main">Main</option> -->
				<!-- <option value="menu">Menu</option> -->
				<!-- <option value="nav">Nav</option> -->
				<!-- <option value="section">Section</option> -->
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
		</div>
	</div>
</template>

<script>
import { dispatch, handleEvent } from '../uiMessageHandler';

import '../figma-ui/js/selectMenu';
import '../figma-ui/js/iconInput';
import '../figma-ui/js/disclosure';

export default {
	data() {
		return {
		};
	},
	mounted() {
		window.selectMenu.init();
    	window.iconInput.init();
    	window.disclosure.init();

		dispatch('getAnnotations');

		handleEvent('currentAnnotations', annotations => {
			for (let i = 0; i < annotations.length; i++) {
				this.addAnnotationsToScreen(annotations[i]);
			}
		});

		handleEvent('annotationAdded', info => {
			this.addAnnotationsToScreen(info);
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
			console.log('info', info);
			var annotations = document.getElementById('annotations');
			var element = null;
			if (document.getElementById('annotation-' + info.type) == null) {

				// create element for annotation type entry
				element = document.createElement('div');
				element.id = 'annotation-' + info.type;

				// create title element for color square and type title
				var title = document.createElement('div');
				title.id = 'annotation-title-' + info.type;
				title.classList.add('annotation-list-entry');
				title.classList.add('type--pos-medium-normal');

				// create color quare for title
				var colorSquare = document.createElement('div');
				colorSquare.classList.add('annotation-list-entry-colorsquare');
				colorSquare.style.backgroundColor = this.getColor(info.type);
				title.appendChild(colorSquare);

				// create text content for title
				var textContent = document.createTextNode(info.type);

				// add elements as child to each other
				title.appendChild(textContent);
				element.appendChild(title);
			} else {
				element = document.getElementById('annotation-' + info.type);
			}

			// create entry for type
			var entry = document.createElement('div');
			entry.id = 'annoation-entry-' + info.id;
			entry.classList.add('annotation-entry' + info.type);
			entry.classList.add('type--pos-medium-normal');
			entry.classList.add('annotation-list-entry-element');

			// create entry title
			var entryTitle = document.createTextNode(info.id);

			// create entry symbols for edit and delete
			var entrySymbols = document.createElement('div');
			entrySymbols.classList.add('annotation-list-entry-element-symbols');
			// var settingsSymbol = document.createElement('div');
			// settingsSymbol.classList.add('icon');
			// settingsSymbol.classList.add('icon--settings');
			// entrySymbols.appendChild(settingsSymbol);
			var trashSymbol = document.createElement('div');
			trashSymbol.id = 'delete-' + info.id;
			trashSymbol.classList.add('icon');
			trashSymbol.classList.add('icon--trash');
			trashSymbol.onclick = function() {
				dispatch('deleteAnnotation', info.id);
				var element = document.getElementById('annoation-entry-' + info.id);
				element.parentNode.removeChild(element);
				var entries = document.getElementsByClassName('annotation-entry' + info.type);
				if (entries.length === 0) {
					element = document.getElementById('annotation-' + info.type);
					element.parentNode.removeChild(element);
				}
			};
			entrySymbols.appendChild(trashSymbol);

			// add title and symbols as child to entry
			entry.appendChild(entryTitle);
			entry.appendChild(entrySymbols);

			// add entry to element
			element.appendChild(entry);

			// add element to annotations list
			annotations.appendChild(element);
		},
		getColor(type) {
			var colors = {
				'button': 'rgb(255, 255, 0)',
				// 'footer': 'rgb(255, 168, 0)',
				'form': 'rgb(158, 0, 196)',
				// 'header': 'rgb(2555, 168, 0)',
				'homepage': 'rgb(64, 224, 209)',
				'input': 'rgb(0, 0, 255)',
				'link': 'rgb(255, 255, 0)',
				// 'main': 'rgb(0, 0, 0)',
				// 'menu': 'rgb(128, 255, 255)',
				'nav': 'rgb(0, 255, 0)',
				// 'section': 'rgb(0, 0, 0)'
			};
			return colors[type];
		}
	}
};
</script>

<style lang='scss'>
	@import "../figma-ui/figma-plugin-ds";

	.annotation-add {
		display: flex;
	}

	.annotation-list-entry {
		display: flex;
		margin-bottom: 20px;
	}

	.annotation-list-entry-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
	}

	.annotation-list-entry-element {
		width: 80%;
		margin-left: 15%;
		display: flex;
		justify-content: space-between;
	}

	.annotation-list-entry-element-symbols {
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