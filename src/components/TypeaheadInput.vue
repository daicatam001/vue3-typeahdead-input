<script setup>
import { onMounted, ref, toRefs, watch, computed, onUpdated, useSlots } from "vue";
const props = defineProps({
    label: String,
    value: String | Number | Object,
    modelValue: String | Number | Object,
    readonly: Boolean,
    disabled: Boolean,
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
    skipItemValue: {
        type: Boolean,
        default: false
    },
    emptyMessage: {
        type: String,
        default: "No data available"
    }
});

const emit = defineEmits(["change", "update:modelValue"]);
const { label,
    items,
    value,
    modelValue,
    itemText,
    itemValue,
    skipItemValue,
    readonly,
    disabled,
    emptyMessage 
    
    } = toRefs(props);
const slots = useSlots()

const input = ref(null);
const panel = ref(null);
const panelPlace = ref(null);
const panelHolder = ref(null);
const jumpedItem = ref(null);
const optionItems = ref([])
const internalValue = ref(undefined);
const isFocused = ref(false);
const isPanelActived = ref(false);
const query = ref(null);

const mapItemField = (item, key) => typeof item === 'object' ? item[key] : item


const mappedItems = computed(() => items.value.map(item => ({
    text: mapItemField(item, itemText.value),
    value: mapItemField(item, itemValue.value),
    item
})))

const panelItems = computed(() =>
    query.value
        ? mappedItems.value.filter((item) =>
            item.text.toString().toLowerCase().includes(query.value.toLowerCase())
        )
        : mappedItems.value
);

const itemIndexEntry = computed(() =>
    panelItems.value.reduce(
        (entry, item, index) => ({
            ...entry,
            [item.value]: {
                index,
                ...item
            },
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
    panelPlace.value.style = null;
    let rectPlace;
    rectPlace = panelPlace.value.getBoundingClientRect();
    const rectHolder = panelHolder.value.getBoundingClientRect()
    // check if panel show in view point
    if (rectPlace.bottom + panelHolder.value.offsetHeight > (window.innerHeight || document.documentElement.clientHeight)) {
        panelPlace.value.style.top = -(panelHolder.value.offsetHeight + 10) + 'px';
        rectPlace = panelPlace.value.getBoundingClientRect();
    }

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
    emit("update:modelValue", skipItemValue.value ? itemIndexEntry.value[internalValue.value].item : internalValue.value);
};


const onBlur = () => {
    isFocused.value = false;
    reset();
};

const onClick = () => {
    if (disabled.value || readonly.value) {
        return
    }
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
    if (!input.value) {
        return
    }
    const selectedItem = itemIndexEntry.value[internalValue.value]
    input.value.value = selectedItem ? selectedItem.text : '';
};

const onJumpItemDown = () => {
    if (!isPanelActived.value) {
        isPanelActived.value = true;
        return;
    }
    let nextIndex = 0;
    if (
        jumpedItem.value &&
        itemIndexEntry.value[jumpedItem.value].index !== undefined &&
        itemIndexEntry.value[jumpedItem.value].index !== panelItems.value.length - 1
    ) {
        nextIndex = itemIndexEntry.value[jumpedItem.value].index + 1;
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
        itemIndexEntry.value[jumpedItem.value].index !== undefined &&
        itemIndexEntry.value[jumpedItem.value].index !== 0
    ) {
        nextIndex = itemIndexEntry.value[jumpedItem.value].index - 1;
    }
    jumpedItem.value = panelItems.value[nextIndex].value;
    scrollElement();
};

const scrollElement = () => {
    const jumpedElement = optionItems.value[itemIndexEntry.value[jumpedItem.value].index]
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
    if (skipItemValue.value) {
        if (typeof value === 'object' && value && value[itemValue.value] !== internalValue.value) {
            internalValue.value = value[itemValue.value];
        }
    } else if (value !== internalValue.value) {
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

watch(isPanelActived, isPanelActived => {
    if (isPanelActived) {
        window.addEventListener('scroll', calPanelPosition)
    } else {
        window.removeEventListener('scroll', calPanelPosition)
    }
})

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

defineExpose({
    input
})
</script>
<template>
    <div class="ta-input"
        :class="{ 'ta-input-focused': isFocused, 'ta-input-readonly': readonly, 'ta-input-disabled': disabled, 'ta-input-has-label': !!label }"
        @mousedown.prevent="onClick">
        <label v-if="label"
            class="ta-input-label">{{ label }}</label>
        <input ref="input"
            v-bind="$attrs"
            :readonly="readonly"
            :disabled="disabled"
            @blur.stop="onBlur"
            @input.stop="filterItems"
            @keydown.esc.prevent.stop="onBlur"
            @keydown.enter.stop="onSelectItem($event)"
            @keydown.up.prevent.stop="onJumpItemUp"
            @keydown.down.prevent.stop="onJumpItemDown"
            class="ta-input-input" />
        <div class="ta-input-arrow"></div>
        <div class="ta-input-panel-place"
            ref="panelPlace"></div>
        <div ref="panelHolder"
            data-test="panel-holder"
            v-show="isPanelActived"
            class="ta-input-panel-holder">
            <div ref="panel"
                data-test="panel"
                v-if="panelItems.length"
                class="ta-input-panel">
                <div role="button"
                    v-for="(item, index) of panelItems"
                    :key="item.value"
                    class="ta-input-item"
                    data-test="panel-item"
                    :ref="(el) => (optionItems[index] = el)"
                    @mousedown.stop="onSelectItem($event, item.value)"
                    :class="{ 'ta-input-item-jumped': jumpedItem == item.value }">
                    <slot v-if="slots['option-item']"
                        name="option-item"
                        :value="item.value"
                        :item="item.item"></slot>
                    <template v-else> {{ item.text }} </template>
                </div>
            </div>
            <div v-else
                data-test="empty-message"
                class="ta-input-empty-message">{{ emptyMessage }}</div>
        </div>
    </div>
</template>

<style lang="scss">
.ta-input {
    height: 2.5rem;
    border: 1px solid #d1d5db;
    position: relative;
    border-radius: 0.25rem;

    &.ta-input-has-label {
        height: 3.25rem;

        .ta-input-input {
            bottom: 0.25rem;
            transform: translateY(0)
        }
    }

    &.ta-input-focused {
        border-color: #6365f1;

        .ta-input-label {
            color: #6365f1
        }
    }

    &.ta-input-disabled {
        background-color: #f3f4f6;
    }

    &.ta-input-disabled,
    &.ta-input-readonly {
        input {
            cursor: default;
        }
    }

    &-label {
        user-select: none;
        position: absolute;
        top: 0.25rem;
        left: 1rem;
        color: #333333;
        font-size: 0.875rem;
        line-height: 1.25rem
    }

    &-input {
        position: absolute;
        font-size: 1rem;
        bottom: 50%;
        transform: translateY(50%);
        left: 1rem;
        width: calc(100% - 3rem);
        outline: none;
        padding: 0;
        border: 0;
        background-color: transparent;

        /* Chrome, Safari, Edge, Opera */
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        /* Firefox */
        &[type=number] {
            -moz-appearance: textfield;
        }
    }

    &-arrow {
        position: absolute;
        top: 50%;
        right: 0.75rem;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #d1d5db;
    }

    &-panel-place {
        position: absolute;
        left: -1px;
        top: calc(100% + 0.5rem);
        width: calc(100% + 2px);
        z-index: -10;
    }

    &-panel-holder {
        position: fixed;
        z-index: 10;
        padding: 0.5rem 0;
        border-radius: 0.25rem;
        border: 1px solid #e5e7eb;
        background-color: #ffffff;
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.1) 0px 4px 6px -4px;

    }

    &-panel {
        max-height: 190px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;

        &::-webkit-scrollbar {
            width: 0.25rem;
        }

        /* Track */
        &::-webkit-scrollbar-track {
            border-radius: 0.25rem;
        }

        /* Handle */
        &::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 0.25rem;
        }
    }

    &-item {
        padding: 0.25rem 0.75rem;
        font-size: 1rem;

        &:hover {
            background-color: #f3f4f6;
        }

    }

    &-item-jumped {
        background-color: #f3f4f6;
    }

    &-empty-message {
        padding: 0 0.75rem;
    }
}
</style>
