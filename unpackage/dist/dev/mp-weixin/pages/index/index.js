"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      news: []
    };
  },
  onLoad: function() {
    common_vendor.index.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      data: {},
      success: (res) => {
        console.log(res);
        this.news = res.data;
      },
      fail: () => {
      },
      complete: () => {
      }
    });
  },
  methods: {
    goDetail(e, newsid) {
      common_vendor.index.navigateTo({
        url: `../info/info?newsid=${newsid}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.news, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.o(($event) => $options.goDetail($event, item.post_id)),
        c: "033ff3e3-1-" + i0 + "," + ("033ff3e3-0-" + i0),
        d: common_vendor.p({
          thumb: item.author_avatar,
          title: item.title,
          note: item.summary,
          link: true
        }),
        e: "033ff3e3-0-" + i0
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/tgd/Desktop/uni_project/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
