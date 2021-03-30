<template>
	<div class="loading-sceen" :class="{loading}" v-if="show">
		<div class="container">
			<div class="logo">
				<img src="/assets/logo.png" alt="">
			</div>
		</div>
	</div>
</template>
<script>
const keyframe = [
	{
		opacity: 1,
	}, {
		opacity: 0
	}
]

export default {
	name: 'loading',
	props: {
		loading: {
			type: Boolean,
			required: true
		}
	},
	data() {
		return {
			show: true
		}
	},
	watch: {
		loading (val) {
			if (!val) {
				this.$el.animate(keyframe, 2000)
					.addEventListener('finish', () => {
						this.show = false;
					});
			} else {
				this.$el.animate(keyframe.reverse(), 2000)
					.addEventListener('finish', () => {
						this.show = true;
					});
			}
		}
	}
}
</script>
<style scoped>
.loading-sceen {
	position: fixed;
	z-index: 1000;
	width: 100%;
	height: 100vh;
	background-color: #181818; /* If write "var(--theme-bg)" your eyes will explode if using a light theme. */
	position: relative;
	transition: all 300ms 0s ease;
}

div.container {
	display: inline-block;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translateY(-50%) translateX(-50%);
	transform: translateY(-50%) translateX(-50%);
}

div.logo, div.logo img {
	width: 150px;
	height: 150px;
	border-radius: 50%;
}
</style>