<script setup>
import { onMounted, ref, toRefs, watch, computed, onUpdated, useSlots } from "vue";
const props = defineProps({
    label: String,
    placeholder: String,
    value: String | Number | Object,
    modelValue: String | Number | Object,
    items: {
        type: Array,
        default: () => [],
    },
    itemText: {
        type: String,
        default: "text",
    },
    itemValue: {
        type: String,
        default: "value",
    },
    name: String,
    emptyMessage: {
        type: String,
        default: "No data available"
    }
});

const emit = defineEmits(["change"]);
const { label, placeholder, items, value, modelValue, itemText, itemValue, name, emptyMessage } = toRefs(props);
const slots = useSlots()

const input = ref(null);
const panel = ref(null);
const panelPlace = ref(null);
const panelHolder = ref(null);
const jumpedItem = ref(null);
const internalValue = ref(undefined);
const isFocused = ref(false);
const isPanelActived = ref(false);
const query = ref(null);

const mapItemField = (item, key) => typeof item === 'object' ? item[key] : item

const mappedItems = computed(() => items.value.map(item => ({
    text: mapItemField(item, itemText.value),
    value: mapItemField(item, itemValue.value)
})))

const panelItems = computed(() =>
    query.value
        ? mappedItems.value.filter((item) =>
            item.text.toLowerCase().includes(query.value.toLowerCase())
        )
        : mappedItems.value
);

const itemIndexEntry = computed(() =>
    panelItems.value.reduce(
        (entry, item, index) => ({
            ...entry,
            [item.value]: index,
        }),
        {}
    )
);

onMounted(() => {
    updateInputText();
    calPanelPosition();
});

onUpdated(() => {
    calPanelPosition();
})

const calPanelPosition = () => {
    const rectPlace = panelPlace.value.getBoundingClientRect();
    const rectHolder = panelHolder.value.getBoundingClientRect()
    if (rectPlace.x !== rectHolder.x || rectPlace.y !== rectHolder.y) {
        panelHolder.value.style.left = rectPlace.x + "px";
        panelHolder.value.style.top = rectPlace.y + "px";
        panelHolder.value.style.width = panelPlace.value.offsetWidth + "px";
    }

};

const filterItems = (event) => {
    query.value = event.target.value;
    isPanelActived.value = true;
};

const onSelectItem = (event, value) => {
    if (!isPanelActived.value) {
        return;
    }
    event.preventDefault();
    if (value) {
        internalValue.value = value;
        jumpedItem.value = value;
    } else if (jumpedItem.value) {
        internalValue.value = jumpedItem.value;
    }
    reset();
    input.value.focus();
    emit("change", internalValue.value);
    emit("update:modelValue", internalValue.value);
};


const onBlur = () => {
    isFocused.value = false;
    reset();
};

const onClick = () => {
    input.value.focus();
    isFocused.value = true;
    isPanelActived.value = true;
};

const reset = () => {
    query.value = null;
    isPanelActived.value = false;
    updateInputText();
};

const updateInputText = () => {
    if (input.value && internalValue.value) {
        const selectedItem = mappedItems.value.find(
            (item) => item.value === internalValue.value
        );
        input.value.value = selectedItem.text;
    }
};

const onJumpItemDown = () => {
    if (!isPanelActived.value) {
        isPanelActived.value = true;
        return;
    }
    let nextIndex = 0;
    if (
        jumpedItem.value &&
        itemIndexEntry.value[jumpedItem.value] !== undefined &&
        itemIndexEntry.value[jumpedItem.value] !== panelItems.value.length - 1
    ) {
        nextIndex = itemIndexEntry.value[jumpedItem.value] + 1;
    }
    jumpedItem.value = panelItems.value[nextIndex].value;
    scrollElement();
};

const onJumpItemUp = () => {
    if (!isPanelActived.value) {
        isPanelActived.value = true;
        return;
    }
    let nextIndex = panelItems.value.length - 1;
    if (
        jumpedItem.value &&
        itemIndexEntry.value[jumpedItem.value] !== undefined &&
        itemIndexEntry.value[jumpedItem.value] !== 0
    ) {
        nextIndex = itemIndexEntry.value[jumpedItem.value] - 1;
    }
    jumpedItem.value = panelItems.value[nextIndex].value;
    scrollElement();
};

const scrollElement = () => {
    const jumpedElement = panelHolder.value.getElementById(
        `${name.value}-${jumpedItem.value}`
    );
    const { offsetHeight: panelOffsetHeight, scrollTop: panelScrollTop } =
        panel.value;
    const { offsetHeight: itemOffsetHeight, offsetTop: itemOffsetTop } =
        jumpedElement;
    // Element still in panel view port and not last 2 item or first 2 item
    if (
        itemOffsetTop - panelScrollTop < panelOffsetHeight - itemOffsetHeight * 2 &&
        itemOffsetTop - itemOffsetHeight - panelScrollTop > 0
    ) {
        return;
    }
    // under view port order or is on of last 2 items
    if (
        itemOffsetTop >=
        panelOffsetHeight + panelScrollTop - itemOffsetHeight * 2
    ) {
        // scroll to last 2 position
        panel.value.scrollTop =
            panelScrollTop +
            (itemOffsetTop - (panelOffsetHeight + panelScrollTop)) +
            itemOffsetHeight * 2;
        // above view port order or is on of frist 2 items
    } else if (itemOffsetTop < panelOffsetHeight + panelScrollTop) {
        // scroll to first 2 position
        panel.value.scrollTop =
            panelScrollTop + (itemOffsetTop - panelScrollTop - itemOffsetHeight);
    }
};

const updateInteralValue = (value) => {
    if (value !== internalValue.value) {
        internalValue.value = value;
    }
}

watch(
    value,
    updateInteralValue,
    { immediate: true }
);

watch(
    modelValue,
    updateInteralValue,
    { immediate: true }
);

watch(internalValue, () => {
    updateInputText();
});

watch(query, (query) => {
    if (query === "" && internalValue.value) {
        internalValue.value = null;
        jumpedItem.value = null;
        emit("change", null);
        emit("update:modelValue")
    }
});

watch(isPanelActived, () => {
    calPanelPosition();
});

watch(
    items,
    () => {
        updateInputText();
    },
    { immediate: true }
);
</script>
<template>
    <div class="ta-input"
        :class="{ 'ta-is-focused': isFocused, 'ta-has-label': !!label }"
        @mousedown.prevent="onClick">
        <label v-if="label"
            class="ta-input-label">{{ label }}</label>
        <input ref="input"
            type="text"
            :placeholder="placeholder"
            @blur="onBlur"
            @input="filterItems"
            @keydown.esc.prevent="isPanelActived = false"
            @keydown.enter.stop="onSelectItem($event)"
            @keydown.up.prevent="onJumpItemUp"
            @keydown.down.prevent="onJumpItemDown"
            class="ta-input-input" />
        <div class="ta-input-arrow"></div>
        <div class="ta-input-panel-place"
            ref="panelPlace"></div>
        <div ref="panelHolder"
            v-show="isPanelActived"
            class="ta-input-panel-holder">
            <div ref="panel"
                v-if="panelItems.length"
                class="ta-input-panel">
                <div role="button"
                    v-for="item of panelItems"
                    :key="item.value"
                    class="ta-input-item"
                    :id="`${name}-${item.value}`"
                    @mousedown.stop="onSelectItem($event, item.value)"
                    :class="{ 'ta-input-item-jumped': jumpedItem == item.value }">
                    <slot v-if="slots['option-item']"
                        name="option-item"
                        :value="item.value"
                        :item="item"></slot>
                    <template v-else> {{ item.text }} </template>
                </div>
            </div>
            <div v-else
                class="ta-input-empty-message">{{ emptyMessage }}</div>
        </div>
    </div>
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

.ta-input {
    @apply h-10 bg-white border border-gray-300 relative rounded;

    &.ta-has-label {
        @apply h-[3.25rem];

        .ta-input-input{
            @apply bottom-1 translate-y-0;
        }
    }

    &.ta-is-focused {
        @apply border-indigo-500;

        .ta-input-label {
            @apply text-indigo-500;
        }
    }

    &-label {
        @apply select-none absolute top-1 left-4 text-gray-500 text-sm;
    }

    &-input {
        @apply absolute bottom-1/2 translate-y-1/2 left-4 w-[calc(100%-3rem)] outline-none
    }

    &-arrow {
        @apply absolute top-1/2 right-3 -translate-y-1/2;
        @apply w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-gray-400;
    }

    &-panel-place {
        @apply absolute left-[-1px] top-[calc(100%+0.5rem)] w-[calc(100%+2px)] -z-10;
    }

    &-panel-holder {
        @apply fixed py-2 bg-white rounded shadow-lg z-10 border;
    }

    &-panel {
        @apply max-h-[190px] overflow-y-auto overflow-x-hidden relative;

        &::-webkit-scrollbar {
            @apply w-1;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            @apply bg-white rounded;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            @apply bg-gray-400 rounded;
        }
    }

    &-item {
        @apply py-1 hover:bg-gray-100 px-3;
    }

    &-item-jumped {
        @apply bg-gray-100
    }

    &-empty-message {
        @apply px-3;
    }
}
</style>
