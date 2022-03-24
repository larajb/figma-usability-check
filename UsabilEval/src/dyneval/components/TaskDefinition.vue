<template>
    <div>
        <div class="input-with-button">
            <input id="taskname" class="input" type="text" placeholder="Aufgabe">
            <button class="button button--primary" @click="handleClick">Erstellen</button>
        </div>
        <p v-if="tasks.length === 0" class="type--pos-medium-normal">
            Wähle einen Namen für die Aufgabe und erstelle sie.
        </p>
        <!-- Wenn keine Aufgaben da Aufforung, sonst Liste mit Aufgaben -->
        <!-- -->
        <!-- <hr class="style-one">
        <p class="type--pos-medium-bold">
            Deine Aufgaben
        </p> -->
        <div id="tasks" class="type--pos-medium-normal">
        </div>
    </div>
</template>

<script>

export default {
    name: 'TaskDefinition',
    data() {
        return {
            tasks: [],
        }
    },
    methods: {
        handleClick() {
			let taskname = document.getElementById('taskname').value;
            this.tasks.push(taskname);
			// wenn taskname leer Fehler zurückgeben
			let element = document.getElementById('tasks');
			let child = document.createElement('div');
			child.innerHTML = '<p>' + taskname + '</p>';
			element.appendChild(child);
            // save in task list file
		},
    },
}
</script>

<style lang='scss'>
	@import "../../figma-ui/figma-plugin-ds";

    .input-with-button {
		display: flex;
		justify-content: space-between;
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
