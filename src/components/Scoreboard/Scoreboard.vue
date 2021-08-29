<template>
	<div class="scoreboard" v-if="loaded">
		<header><minecraft-text-format :text="displayTitle" /></header>
		<main>
			<div class="score" v-for="(v, i) in scores" :key="i">
				<minecraft-text-format :text="placeholder(v)" />
			</div>
		</main>
	</div>
</template>

<script>
import { getDatabase, ref, onValue } from 'firebase/database';
import MinecraftTextFormat from './MinecraftTextFormat.vue';

export default {
	name: "Scoreboard",
	components: {
		MinecraftTextFormat
	},
	data: () => ({
		displayTitle: "",
		scores: [],
		loaded: false
	}),
	computed: {
		mapViewer() { return this.$bluemap.mapViewer.data }
	},
	methods: {
		placeholder (text) {
			return text
				.replace('%server_name', 'BlueMap')
				.replace('%world_name', this.mapViewer.map.name);
		}
	},
	mounted () {
		const db = getDatabase();
		const sidebarData = ref(db, 'sidebarData');

		onValue(sidebarData, (snapshot) => {
			const data = snapshot.val();
			this.displayTitle = data.displayTitle;
			this.scores = data.scores;
			this.loaded = true;
		});
	}
}
</script>

<style lang="scss">
.scoreboard {
	position: fixed;
	right: 0;
	top: 50%;
	transform: translateY(-50%);
	white-space: pre;
	color: white;

	header {
		text-align: center;
		background-color: #00000083;
		padding: 4px;
	}
	
	main {
		background-color: #0000006c;

		.score {
			padding: 4px;
		}
	}
}
</style>