// 最简代码，也就是这些字段必须有
export default {
  path: "/wei",
  meta: {
    title: "小微管理"
  },
  children: [
    {
      path: "/wei/index",
      name: "wei",
      component: () => import("@/views/wei/index.vue"),
      meta: {
        title: "小微管理"
      }
    }
  ]
};
