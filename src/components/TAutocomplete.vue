
<template>
    <div class="t-autocomplete relative">
        {{ itemIndexEntry }} {{ jumbedItem }}
        <input ref="input" type="text" @keydown.enter.prevent="onSelectItem()" @keydown.up.prevent="onJumpItemUp"
            @focus="onFocus" @blur="onBlur" @keydown.down.prevent="onJumpItemDown" @input="filterItems"
            @keydown.esc.prevent="isPanelActived = false">
        <div class="panel " ref="panel" v-show="isPanelActived">
            <div class="item" v-for="item of panelItems" :key="item.value" :id="`name-${item.value}`"
                @mousedown="onSelectItem(item.value)" :class="{ 'jumped': item.value === jumbedItem }">{{ item.text }}
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, toRefs, watch } from 'vue';

const props = defineProps(['items', 'value'])
const emit = defineEmits(['change'])
const { items, value } = toRefs(props)
const input = ref(null)
const panel = ref(null)
const jumbedItem = ref(null)
const internalValue = ref(undefined)
const isFocused = ref(false)
const isPanelActived = ref(false)
const query = ref(null)

const panelItems = computed(() => query.value ? items.value
    .filter(item => item.text.toLowerCase().includes(query.value.toLowerCase())) : items.value)

const itemIndexEntry = computed(() => panelItems.value.reduce((entry, item, index) => ({
    ...entry,
    [item.value]: index
}), {}))

onMounted(() => {
    updateInputText()
})


const filterItems = event => {
    query.value = event.target.value
    console.log(query.value)
    isPanelActived.value = true
}

const onSelectItem = (value) => {
    if (value) {
        internalValue.value = value
        jumbedItem.value = value
    } else if (jumbedItem.value) {
        internalValue.value = jumbedItem.value
    }
    reset()
    input.value.focus()
    emit('change', value)
}


const onFocus = () => {
    isFocused.value = true
    isPanelActived.value = true
}

const onBlur = (event) => {
    isFocused.value = false
    reset()
}

const reset = () => {
    query.value = null
    isPanelActived.value = false
    updateInputText()
}

const updateInputText = () => {
    if (input.value && internalValue.value) {
        const selectedItem = items.value.find(item => item.value === internalValue.value)
        input.value.value = selectedItem.text
    }
}

const onJumpItemDown = () => {
    if (!isPanelActived.value) {
        isPanelActived.value = true
        return
    }
    let indexItem = 0;
    if (jumbedItem.value && itemIndexEntry.value[jumbedItem.value].toString() && itemIndexEntry.value[jumbedItem.value] !== panelItems.value.length - 1) {
        indexItem = itemIndexEntry.value[jumbedItem.value] + 1
        console.log('change', indexItem)
    }
    jumbedItem.value = panelItems.value[indexItem].value
    scrollElement()
}

const onJumpItemUp = () => {
    if (!isPanelActived.value) {
        isPanelActived.value = true
        return
    }
    let indexItem = panelItems.value.length - 1;
    if (jumbedItem.value && itemIndexEntry.value[jumbedItem.value].toString() && itemIndexEntry.value[jumbedItem.value] !== 0) {
        indexItem = itemIndexEntry.value[jumbedItem.value] - 1
        console.log('change', indexItem)
    }
    jumbedItem.value = panelItems.value[indexItem].value
    scrollElement()
}

const scrollElement = () => {
    const jumpedElement = document.getElementById(`name-${jumbedItem.value}`)
    const { offsetHeight: panelOffsetHeight, scrollTop: panelScrollTop } = panel.value
    const { offsetHeight: itemOffsetHeight, offsetTop: itemOffsetTop } = jumpedElement

    // Element still in panel view port and not last 2 item or first 2 item
    if (itemOffsetTop - panelScrollTop < panelOffsetHeight - itemOffsetHeight * 2 && itemOffsetTop - itemOffsetHeight - panelScrollTop > 0) {
        return
    }
    // under view port order or is on of last 2 items
    if (itemOffsetTop >= panelOffsetHeight + panelScrollTop - itemOffsetHeight * 2) {
        // scroll to last 2 position
        panel.value.scrollTop = panelScrollTop + (itemOffsetTop - (panelOffsetHeight + panelScrollTop)) + itemOffsetHeight * 2
        // above view port order or is on of frist 2 items
    } else if (itemOffsetTop < panelOffsetHeight + panelScrollTop) {
        // scroll to first 2 position
        panel.value.scrollTop = panelScrollTop + (itemOffsetTop - panelScrollTop - itemOffsetHeight)
    }
}



watch(value, value => {
    if (value !== internalValue.value) {
        internalValue.value = value
    }
}, { immediate: true })
watch(internalValue, (value) => {
    updateInputText()
})

watch(query, query => {
    console.log(query)
    if (query === '') {
        internalValue.value = null
        jumbedItem.value = null
    }
})

watch(items, () => {
    updateInputText()
}, { immediate: true })


</script>
<style scoped>
.t-autocomplete {
    position: relative;
}

.panel {
    max-height: 184px;
    width: 300px;
    overflow: auto;
    position: absolute;
    top: calc(100% + 10px);
    left: 0;
    border: 1px solid black;
}

.jumped {
    background-color: aqua;
}
</style>