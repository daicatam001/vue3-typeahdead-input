Use component in template
```html
<template>
    <div>
        <TypeaheadInput
            :items="items"
            @change="onChange"
            >
        </TypeaheadInput>    
    </div>
</template>

```
```html
<script setup>
    const items = [
        {
            text:'Item 1',
            value: 'item-1'
        },
        {
            text:'Item 2',
            value: 'item-2'
        },
        {
            text:'Item 3',
            value: 'item-3'
        },
    ]
    const onChange = (value)=>{
        console.log(value)
    }
</script>

```

## Properties


| Property  | Type | Description | Default |
|---|---|---|---|
| items | Array | An array of objects. It will look for a text and value keys. This can be changed using the item-text, item-value | [] |
| item-text | string | Set property of items’s text value | text |
| item-value | string | Set property of items’s value | value |