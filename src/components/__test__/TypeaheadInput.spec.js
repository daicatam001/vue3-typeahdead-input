import { mount } from "@vue/test-utils";
import { describe, it, beforeEach, expect } from "vitest";
import TypeaheadInput from "../TypeaheadInput.vue";
describe("TypeaheadInput", () => {
  beforeEach(() => {});

  it("renders properly", () => {
    const wrapper = mount(TypeaheadInput);
    expect(wrapper.classes("ta-input")).toBe(true);
    expect(wrapper.html()).toContain("input");
    expect(wrapper.find("label").exists()).toBe(false);
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(false);
  });

  it("renders label when having label props", () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        label: "Label",
      },
    });
    expect(wrapper.find("label").text()).toContain("Label");
  });

  it("is on readonly state with readonly props true", () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        readonly: true,
      },
    });
    console.log(wrapper.find("input").attributes());
    expect(wrapper.classes("ta-input-readonly")).toBe(true);
    expect(wrapper.find("input").html()).toContain("readonly");
  });

  it("is on disabled state with disabled props true", () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        disabled: true,
      },
    });
    expect(wrapper.classes("ta-input-disabled")).toBe(true);
    expect(wrapper.find("input").html()).toContain("disabled");
  });

  it("renders panel when being clicked", async () => {
    const wrapper = mount(TypeaheadInput);
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(true);
  });

  it("focus input  when being clicked", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find("input").element).toBe(document.activeElement);
  });

  it("hides panel when blur input", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    const input = wrapper.find("input");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(true);
    expect(input.element).toBe(document.activeElement);
    await input.trigger("blur");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(false);
  });

  it("hides panel when press esc", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(true);
    const input = wrapper.find("input");
    expect(input.element).toBe(document.activeElement);
    await input.trigger("keydown", { key: "Escape" });
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(false);
  });

  it("with readonly props doesn't render panel when being clicked ", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        readonly: true,
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(false);
  });

  it("with disabled props doesn't render panel when being clicked ", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(false);
  });

  it("renders no data message when having no data", async () => {
    const wrapper = mount(TypeaheadInput);
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel-holder"]').isVisible()).toBe(true);
    expect(wrapper.find('[data-test="empty-message"]').exists()).toBe(true);
  });

  it("renders panel items when having data", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test="panel-item"]')).toHaveLength(3);
  });

  it("renders panel items when having primitive data", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    const panelItem = wrapper.find('[data-test="panel-item"]');
    expect(panelItem.text()).toBe("1");
  });

  it("renders panel items when having object data", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    const panelItem = wrapper.find('[data-test="panel-item"]');
    expect(panelItem.text()).toBe("xin chao");
  });

  it("jumb to first item when press down", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    const input = wrapper.find("input");
    expect(input.element).toBe(document.activeElement);
    await input.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.find(".ta-input-item-jumped").text()).toContain("xin chao");
  });

  it("jumb to last item when press down twice", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    const input = wrapper.find("input");
    expect(input.element).toBe(document.activeElement);
    await input.trigger("keydown", { key: "ArrowDown" });
    await input.trigger("keydown", { key: "ArrowDown" });
    expect(wrapper.find(".ta-input-item-jumped").text()).toContain("tam biet");
  });


  it("jumb to last item when press up", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    const input = wrapper.find("input");
    expect(input.element).toBe(document.activeElement);
    await input.trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.find(".ta-input-item-jumped").text()).toContain("tam biet");
  });


  it("jumb to fist item when press up twice", async () => {
    const wrapper = mount(TypeaheadInput, {
      attachTo: document.body,
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    const input = wrapper.find("input");
    expect(input.element).toBe(document.activeElement);
    await input.trigger("keydown", { key: "ArrowUp" });
    await input.trigger("keydown", { key: "ArrowUp" });
    expect(wrapper.find(".ta-input-item-jumped").text()).toContain("xin chao");
  });

  it("update input when lick primitive panel item", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    const panelItem = wrapper.find('[data-test="panel-item"]');
    await panelItem.trigger("mousedown");
    expect(wrapper.find("input").element.value).toBe("1");
  });

  it("update input when click object panel item", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [
          {
            text: "xin chao",
            value: "xin-chao",
          },
          {
            text: "tam biet",
            value: "tam-biet",
          },
        ],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    const panelItem = wrapper.find('[data-test="panel-item"]');
    await panelItem.trigger("mousedown");
    expect(wrapper.find("input").element.value).toBe("xin chao");
  });

  it("filter primitive panel inputs item when type input", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test="panel-item"]')).toHaveLength(3);
    await wrapper.find("input").setValue("1");
    expect(wrapper.findAll('[data-test="panel-item"]')).toHaveLength(1);
  });

  it("filter primitive panel inputs - show empty message when no item match", async () => {
    const wrapper = mount(TypeaheadInput, {
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(wrapper.find('[data-test="panel"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-test="panel-item"]')).toHaveLength(3);
    await wrapper.find("input").setValue("4");
    expect(wrapper.find('[data-test="empty-message"]').exists()).toBe(true);
  });
});
