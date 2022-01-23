<template>
  <div class="relative max-h-full">
    <div class="flex flex-col py-8 mx-auto space-y-4 bg-blue-300">
      <h1 class="text-center">Evolution Chain</h1>
      <div
        class="select-none max-h-[400px] box-content w-fit max-w-[300px] sm:max-w-full overflow-auto mx-auto"
        v-if="hasData"
      >
        <blocks-tree
          :data="treeData"
          :horizontal="true"
          :collapsable="false"
          :props="{
            label: 'label',
            expand: 'expand',
            children: 'children',
            id: 'id',
          }"
        >
          <template #node="{ data }">
            <div class="cursor-pointer">
              <span>{{ data.label }}</span>
              <br />
              <img
                v-lazy="{ src: getImageUrl(data.id), loading: spinner }"
                class="max-w-[96px] w-[96px] h-[96px] mx-auto"
              />
            </div>
          </template>
        </blocks-tree>
      </div>
      <div v-else class="text-center">Not found!</div>
      <div
        class="flex items-center w-10 cursor-pointer select-none -left-20"
        @click="gotoFirstPage"
      >
        &lt;&lt;
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  getImageUrl,
  getEvolutionChain,
  TreeProp,
} from "./services/pokemon.service";
import spinner from "./assets/Spinner-1s-96px.gif";

// at this time beforeRouteEnter is not support setup script
export default defineComponent({
  data() {
    return {
      treeData: {} as TreeProp,
      spinner: spinner,
    };
  },
  computed: {
    hasData(): boolean {
      return Object.keys(this.treeData).length > 0;
    },
  },
  methods: {
    //   onSelect(id: string) {
    //     this.$router.push(`/pokemon/${id}`);
    //   },
    getImageUrl(id: string) {
      return getImageUrl(id);
    },
    gotoFirstPage() {
      this.$router.push("/");
    },
  },
  async mounted() {
    const name = localStorage.getItem("pokemon");
    const data = await getEvolutionChain(name as string);
    if (data) {
      this.treeData = data;
    }
  },
});
</script>

<style>
* {
  font-family: "SuperLegendBoy";
}
</style>
