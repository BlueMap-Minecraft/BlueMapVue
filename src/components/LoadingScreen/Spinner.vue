<template>
	<div
		class="spinner"
		:style="{
			borderTop: `3.5px solid ${color}`,
			borderLeft: `3.5px solid ${color}`,
			width: `${size}px`,
			height: `${size}px`
		}"></div>
</template>
<script>
export default {
	name: "spinner",
	props: {
		size: {
			type: Number,
			default: 40
		},
		color: {
			type: String,
			default: "black"
		}
	}
}
</script>
<style scoped>
.spinner {
	margin: 15px;
	box-sizing: border-box;
	border-radius: 50%;
	position: relative;
	border-right: 3.5px solid #00000000;
	border-bottom: 3.5px solid #00000000;
	transform: rotate(135deg);
	animation-name: spin;
	animation-duration: 0.5s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes spin {
	from {
		transform: rotate(135deg);
	}

	to {
		transform: rotate(-225deg)
	}
}
</style>