<script setup lang="ts">
import KeyboardKey from "./KeyboardKey.vue";
</script>

<template>
  <div>
    <div class="flex">
			<KeyboardKey val="Q"/>
			<KeyboardKey val="W"/>
			<KeyboardKey val="E"/>
			<KeyboardKey val="R"/>
			<KeyboardKey val="T"/>
			<KeyboardKey val="Y"/>
			<KeyboardKey val="U"/>
			<KeyboardKey val="I"/>
			<KeyboardKey val="O"/>
			<KeyboardKey val="P"/>
    </div>
    <div class="flex">
			<KeyboardKey val="A"/>
			<KeyboardKey val="S"/>
			<KeyboardKey val="D"/>
			<KeyboardKey val="F"/>
			<KeyboardKey val="G"/>
			<KeyboardKey val="H"/>
			<KeyboardKey val="J"/>
			<KeyboardKey val="K"/>
			<KeyboardKey val="L"/>
    </div>
    <div class="flex">
			<KeyboardKey val="ENTER"/>
			<KeyboardKey val="Z"/>
			<KeyboardKey val="X"/>
			<KeyboardKey val="C"/>
			<KeyboardKey val="V"/>
			<KeyboardKey val="B"/>
			<KeyboardKey val="N"/>
			<KeyboardKey val="M"/>
			<KeyboardKey val="DELETE"/>
		</div>
  </div>
</template>
