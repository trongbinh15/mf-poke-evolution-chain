import singleSpaVue from "single-spa-vue";
import { createApp, h } from "vue";
import VueBlocksTree from "vue3-blocks-tree";
import "vue3-blocks-tree/dist/vue3-blocks-tree.css";
import VueLazyLoad from "vue3-lazyload";
import App from "./App.vue";
import "./assets/tailwind.css";
import "./index.css";
import { router } from "./route/route";

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        // single-spa props are available on the "this" object. Forward them to your component as needed.
        // https://single-spa.js.org/docs/building-applications#lifecyle-props
        // if you uncomment these, remember to add matching prop definitions for them in your App.vue file.
        /*
        name: this.name,
        mountParcel: this.mountParcel,
        singleSpa: this.singleSpa,
        */
      });
    },
  },
  handleInstance: (app)=>{
    app.use(VueBlocksTree, { treeName: "blocks-tree" });
    app.use(VueLazyLoad);
    app.use(router);
  }
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
