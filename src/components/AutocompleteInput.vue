<script setup>
import { computed } from "vue";
import { onMounted, ref, toRefs, watch } from "vue";
const props = defineProps({
    label: String,
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
});

const emit = defineEmits(["change"]);
const { items, value, itemText, itemValue, name } = toRefs(props);
const input = ref(null);
const panel = ref(null);
const panelPlace = ref(null);
const panelHolder = ref(null);
const jumpedItem = ref(null);
const internalValue = ref(undefined);
const isFocused = ref(false);
const isPanelActived = ref(false);
const query = ref(null);

const panelItems = computed(() =>
    query.value
        ? items.value.filter((item) =>
            item[itemText.value].toLowerCase().includes(query.value.toLowerCase())
        )
        : items.value
);

const itemIndexEntry = computed(() =>
    panelItems.value.reduce(
        (entry, item, index) => ({
            ...entry,
            [item[itemValue.value]]: index,
        }),
        {}
    )
);

onMounted(() => {
    updateInputText();
    calPanelPosition();
});

const calPanelPosition = () => {
    const rect = panelPlace.value.getBoundingClientRect();
    panelHolder.value.style.left = rect.x + "px";
    panelHolder.value.style.top = rect.y + "px";
    panelHolder.value.style.width = panelPlace.value.offsetWidth + "px";
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
    emit("input", internalValue.value);
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
    console.log(isPanelActived.value);
    updateInputText();
};

const updateInputText = () => {
    if (input.value && internalValue.value) {
        const selectedItem = items.value.find(
            (item) => item[itemValue.value] === internalValue.value
        );
        input.value.value = selectedItem[itemText.value];
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
    jumpedItem.value = panelItems.value[nextIndex][itemValue.value];
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
    jumpedItem.value = panelItems.value[nextIndex][itemValue.value];
    scrollElement();
};

const scrollElement = () => {
    const jumpedElement = document.getElementById(
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

watch(
    value,
    (value) => {
        if (value !== internalValue.value) {
            internalValue.value = value;
        }
    },
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
    <div class="ta-autocomplete"
        :class="{ 'ta-is-focused': isFocused, 'ta-has-label': !!label }"
        @mousedown.prevent="onClick">
        <label v-if="label"
            class="ta-autocomplete-label">{{ label }}</label>
        <input ref="input"
            type="text"
            @blur="onBlur"
            @input="filterItems"
            @keydown.esc.prevent="isPanelActived = false"
            @keydown.enter.stop="onSelectItem($event)"
            @keydown.up.prevent="onJumpItemUp"
            @keydown.down.prevent="onJumpItemDown"
            class="ta-autocomplete-input" />
        <div class="ta-autocomplete-arrow"></div>
        <div class="ta-autocomplete-panel-place"
            ref="panelPlace"></div>
        <div ref="panelHolder"
            v-show="isPanelActived"
            class="ta-autocomplete-panel-holder">
            <div ref="panel"
                class="ta-autocomplete-panel">
                <div role="button"
                    v-for="item of panelItems"
                    :key="item[itemValue]"
                    class="ta-autocomplete-item"
                    :id="`${name}-${item[itemValue]}`"
                    @mousedown.stop="onSelectItem($event, item[itemValue])"
                    :class="{ 'ta-autocomplete-item-jumped': jumpedItem == item[itemValue] }"> {{ item[itemText] }} </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

@tailwind base;
@tailwind components;
@tailwind utilities;

.ta-autocomplete {
    @apply h-10 bg-white border border-gray-300 relative rounded;

    &.ta-has-label {
        @apply h-16;
    }

    &.ta-is-focused {
        @apply border-indigo-500;

        .ta-autocomplete-label {
            @apply text-indigo-500;
        }
    }

    &-label {
        @apply select-none absolute top-2 left-4 text-gray-500 text-sm;
    }

    &-input {
        @apply absolute bottom-2 left-4 w-[calc(100%-3rem)] outline-none
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
            @apply bg-gray-300 rounded;
        }
    }

    &-item {
        @apply py-1 hover:bg-gray-100  px-3;
    }
    &-item-jumped{
        @apply bg-gray-100
    }
}
</style>
