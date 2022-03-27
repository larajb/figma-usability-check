<template>
    <div>
        <div class="input-with-button">
            <input id="taskname" class="input" type="text" placeholder="Aufgabe">
            <button class="button button--primary" @click="addTask">Erstellen</button>
        </div>
        <p v-if="!hasTasks" class="type--pos-medium-normal">
            Wähle einen Namen für die Aufgabe und erstelle sie.
        </p>
        <div v-else-if="hasTasks" class="type--pos-medium-normal">
            <p>Füge die einzelnen Bearbeitungsschritte der Aufgabe hinzu.</p>
            <button class="button button--primary">Hinzufügen</button>
        </div>
        <div id="tasks" class="type--pos-medium-normal">
        </div>
    </div>
</template>

<script>

export default {
    name: 'TaskDefinition',
    data() {
        return {
            hasTasks: false,
        }
    },
    methods: {
        addTask() {
			let taskname = document.getElementById('taskname').value;
			// wenn taskname leer Fehler zurückgeben

			let tasks = document.getElementById('tasks');

            // create element for task annotation
            var element = document.createElement('div');
            element.id = 'annotation-' + taskname;

            // create title element for color square and task title
			let taskTitle = document.createElement('div');
            taskTitle.id = 'annotation-title-' + taskname;
			taskTitle.classList.add('annotation-list-entry');
			taskTitle.classList.add('type--pos-medium-normal');

            // create color square for title
            var colorSquare = document.createElement('div');
            colorSquare.classList.add('annotation-list-entry-colorsquare');
            colorSquare.style.backgroundColor = this.getRandomColor();
            // check if color already used

            // create text content for title
            var textContent = document.createTextNode(taskname);

            // create entry symbols for edit and delete
			var trashSymbol = document.createElement('div');
			trashSymbol.id = 'delete-' + taskname;
			trashSymbol.classList.add('icon');
			trashSymbol.classList.add('icon--trash');
			trashSymbol.onclick = function() {
				var annotation = document.getElementById('annotation-' + taskname);
                annotation.parentNode.removeChild(annotation);
                if (!tasks.hasChildNodes()) {
                    this.hasTasks = false;
                }
			};

            // add elements as child to each other
            taskTitle.appendChild(colorSquare);
            taskTitle.appendChild(textContent);
            taskTitle.appendChild(trashSymbol);
            element.appendChild(taskTitle);

            // add element to task annotations
            tasks.appendChild(element);

            this.hasTasks = true;

            // save in task list file
		},
        getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return 'rgb(' + r + ', ' + g + ', ' + b +')';
        },
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .annotation-list-entry {
		display: flex;
        margin-top: 20px;
		margin-bottom: 20px;
	}

    .input-with-button {
		display: flex;
		justify-content: space-between;
	}

    .annotation-list-entry-colorsquare {
		width: 15px;
		height: 15px;
		margin-right: 15px;
		border-radius: 10px;
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
