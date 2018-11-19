<template>
    <RadioGroup v-model="radioArr" type="button" @on-change="$emit('radioType', radioArr)">
        <Radio :label="item" v-for="(item, index) in arr" :key="index"></Radio>
    </RadioGroup>
</template>
<script>
import { RadioGroup, Radio } from 'iview';
export default {
    props: ['arr'],
    data() {
        return {
            radioArr: this.arr && this.arr[0] || '',
        };
    },
    methods: {
    },
    components: {
        RadioGroup,
        Radio,
    },
};
</script>
<style lang="sass" scoped>

</style>
