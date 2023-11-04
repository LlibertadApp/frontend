// vite.config.ts
import react from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite/dist/node/index.js";
import autoAlias from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite-plugin-auto-alias/dist/index.esm.js";
import dynamicImport from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite-plugin-dynamic-import/dist/index.mjs";
import { ViteImageOptimizer } from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite-plugin-image-optimizer/dist/index.mjs";
import { ViteMinifyPlugin } from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite-plugin-minify/dist/index.js";
import { viteObfuscateFile } from "file:///E:/CodeVarious/VLLC/LibertApp/frontend/node_modules/vite-plugin-obfuscator/index.js";
var obfuscator_options = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  debugProtectionInterval: 0,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: false,
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: [],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.01,
  unicodeEscapeSequence: false
};
var vite_config_default = defineConfig({
  plugins: [
    react(),
    autoAlias({
      mode: "sync",
      prefix: "#"
    }),
    ViteImageOptimizer(),
    ViteMinifyPlugin({}),
    viteObfuscateFile(obfuscator_options),
    dynamicImport()
  ],
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules"))
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlVmFyaW91c1xcXFxWTExDXFxcXExpYmVydEFwcFxcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kZVZhcmlvdXNcXFxcVkxMQ1xcXFxMaWJlcnRBcHBcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGVWYXJpb3VzL1ZMTEMvTGliZXJ0QXBwL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJWaXRlL2NsaWVudFwiLz5cclxuXHJcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCBhdXRvQWxpYXMgZnJvbSBcInZpdGUtcGx1Z2luLWF1dG8tYWxpYXNcIjtcclxuaW1wb3J0IGR5bmFtaWNJbXBvcnQgZnJvbSBcInZpdGUtcGx1Z2luLWR5bmFtaWMtaW1wb3J0XCI7XHJcbmltcG9ydCB7IFZpdGVJbWFnZU9wdGltaXplciB9IGZyb20gXCJ2aXRlLXBsdWdpbi1pbWFnZS1vcHRpbWl6ZXJcIjtcclxuaW1wb3J0IHsgVml0ZU1pbmlmeVBsdWdpbiB9IGZyb20gXCJ2aXRlLXBsdWdpbi1taW5pZnlcIjtcclxuaW1wb3J0IHsgdml0ZU9iZnVzY2F0ZUZpbGUgfSBmcm9tIFwidml0ZS1wbHVnaW4tb2JmdXNjYXRvclwiO1xyXG5cclxuY29uc3Qgb2JmdXNjYXRvcl9vcHRpb25zID0ge1xyXG4gIGNvbXBhY3Q6IHRydWUsXHJcbiAgY29udHJvbEZsb3dGbGF0dGVuaW5nOiBmYWxzZSxcclxuICBkZWFkQ29kZUluamVjdGlvbjogZmFsc2UsXHJcbiAgZGVidWdQcm90ZWN0aW9uOiBmYWxzZSxcclxuICBkZWJ1Z1Byb3RlY3Rpb25JbnRlcnZhbDogMCxcclxuICBkaXNhYmxlQ29uc29sZU91dHB1dDogZmFsc2UsXHJcbiAgaWRlbnRpZmllck5hbWVzR2VuZXJhdG9yOiBcImhleGFkZWNpbWFsXCIsXHJcbiAgbG9nOiBmYWxzZSxcclxuICBudW1iZXJzVG9FeHByZXNzaW9uczogZmFsc2UsXHJcbiAgcmVuYW1lR2xvYmFsczogZmFsc2UsXHJcbiAgc2VsZkRlZmVuZGluZzogZmFsc2UsXHJcbiAgc2ltcGxpZnk6IHRydWUsXHJcbiAgc3BsaXRTdHJpbmdzOiBmYWxzZSxcclxuICBzdHJpbmdBcnJheTogdHJ1ZSxcclxuICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtOiBmYWxzZSxcclxuICBzdHJpbmdBcnJheUNhbGxzVHJhbnNmb3JtVGhyZXNob2xkOiAwLjUsXHJcbiAgc3RyaW5nQXJyYXlFbmNvZGluZzogW10sXHJcbiAgc3RyaW5nQXJyYXlJbmRleFNoaWZ0OiB0cnVlLFxyXG4gIHN0cmluZ0FycmF5Um90YXRlOiB0cnVlLFxyXG4gIHN0cmluZ0FycmF5U2h1ZmZsZTogdHJ1ZSxcclxuICBzdHJpbmdBcnJheVdyYXBwZXJzQ291bnQ6IDEsXHJcbiAgc3RyaW5nQXJyYXlXcmFwcGVyc0NoYWluZWRDYWxsczogdHJ1ZSxcclxuICBzdHJpbmdBcnJheVdyYXBwZXJzUGFyYW1ldGVyc01heENvdW50OiAyLFxyXG4gIHN0cmluZ0FycmF5V3JhcHBlcnNUeXBlOiBcInZhcmlhYmxlXCIsXHJcbiAgc3RyaW5nQXJyYXlUaHJlc2hvbGQ6IDAuMDEsXHJcbiAgdW5pY29kZUVzY2FwZVNlcXVlbmNlOiBmYWxzZSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgcmVhY3QoKSxcclxuICAgIGF1dG9BbGlhcyh7XHJcbiAgICAgIG1vZGU6IFwic3luY1wiLFxyXG4gICAgICBwcmVmaXg6IFwiI1wiLFxyXG4gICAgfSksXHJcblxyXG4gICAgVml0ZUltYWdlT3B0aW1pemVyKCksXHJcbiAgICBWaXRlTWluaWZ5UGx1Z2luKHt9KSxcclxuICAgIHZpdGVPYmZ1c2NhdGVGaWxlKG9iZnVzY2F0b3Jfb3B0aW9ucyksXHJcbiAgICBkeW5hbWljSW1wb3J0KCksXHJcbiAgXSxcclxuICBidWlsZDoge1xyXG4gICAgdGFyZ2V0OiBcImVzbmV4dFwiLFxyXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA2MDAsXHJcbiAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgIG91dHB1dDoge1xyXG4gICAgICAgIG1hbnVhbENodW5rczogKGlkKSA9PiB7XHJcbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoXCJub2RlX21vZHVsZXNcIikpXHJcbiAgICAgICAgICAgIHJldHVybiBpZFxyXG4gICAgICAgICAgICAgIC50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgLnNwbGl0KFwibm9kZV9tb2R1bGVzL1wiKVsxXVxyXG4gICAgICAgICAgICAgIC5zcGxpdChcIi9cIilbMF1cclxuICAgICAgICAgICAgICAudG9TdHJpbmcoKTtcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUVBLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxtQkFBbUI7QUFDMUIsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyx5QkFBeUI7QUFFbEMsSUFBTSxxQkFBcUI7QUFBQSxFQUN6QixTQUFTO0FBQUEsRUFDVCx1QkFBdUI7QUFBQSxFQUN2QixtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQix5QkFBeUI7QUFBQSxFQUN6QixzQkFBc0I7QUFBQSxFQUN0QiwwQkFBMEI7QUFBQSxFQUMxQixLQUFLO0FBQUEsRUFDTCxzQkFBc0I7QUFBQSxFQUN0QixlQUFlO0FBQUEsRUFDZixlQUFlO0FBQUEsRUFDZixVQUFVO0FBQUEsRUFDVixjQUFjO0FBQUEsRUFDZCxhQUFhO0FBQUEsRUFDYiwyQkFBMkI7QUFBQSxFQUMzQixvQ0FBb0M7QUFBQSxFQUNwQyxxQkFBcUIsQ0FBQztBQUFBLEVBQ3RCLHVCQUF1QjtBQUFBLEVBQ3ZCLG1CQUFtQjtBQUFBLEVBQ25CLG9CQUFvQjtBQUFBLEVBQ3BCLDBCQUEwQjtBQUFBLEVBQzFCLGlDQUFpQztBQUFBLEVBQ2pDLHVDQUF1QztBQUFBLEVBQ3ZDLHlCQUF5QjtBQUFBLEVBQ3pCLHNCQUFzQjtBQUFBLEVBQ3RCLHVCQUF1QjtBQUN6QjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFBQSxJQUVELG1CQUFtQjtBQUFBLElBQ25CLGlCQUFpQixDQUFDLENBQUM7QUFBQSxJQUNuQixrQkFBa0Isa0JBQWtCO0FBQUEsSUFDcEMsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsSUFDUix1QkFBdUI7QUFBQSxJQUN2QixlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjLENBQUMsT0FBTztBQUNwQixjQUFJLEdBQUcsU0FBUyxjQUFjO0FBQzVCLG1CQUFPLEdBQ0osU0FBUyxFQUNULE1BQU0sZUFBZSxFQUFFLENBQUMsRUFDeEIsTUFBTSxHQUFHLEVBQUUsQ0FBQyxFQUNaLFNBQVM7QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
