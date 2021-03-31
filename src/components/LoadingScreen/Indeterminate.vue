<template>
	<div class="indeterminate"></div>
</template>
<script>
export default {
	name: 'Indeterminate'
}
</script>
<style scoped>
.indeterminate {
	height: 3px;
	width: 100%;
	--bg-color: #00000000;
	--bg-light-color: #333;
	background-color: var(--bg-color);
	position: relative;
	margin: 10px;
}

.indeterminate::before {
	content: "";
	background-color: var(--bg-light-color);
	position: absolute;
	height: 100%;
	top: 0;
	animation-name: anim;
	animation-duration: 1s;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
}

@keyframes anim {
	0% {
		left: 0;
		width: 0;
	}
	25% {
		left: 0;
		width: 25%;
	}
	50% {
		left: 30%;
		width: 40%;
	}
	75% {
		left: 75%;
		width: 25%;
	}
	100% {
		left: 100%;
		width: 0;
	}
}
</style>