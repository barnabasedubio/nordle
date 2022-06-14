<script setup lang="ts">
import { useStore } from "../store/store.js"

const store = useStore()
const testValue: String = store.wordList[0]
</script>

<template>
<div>
{{ testValue }}
</div>
</template>
