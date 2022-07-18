import { shallowMount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import TypeaheadInput from "../TypeaheadInput.vue";
describe("TypeaheadInput", () => {
  let wrapper;

  const createComponent = (options) => {
    wrapper = shallowMount(TypeaheadInput, options);
  };

  afterEach(() => {
    wrapper.unmount();
  });

  const findInput = () => wrapper.find("input");
  const findLabel = () => wrapper.find("label");
  const findPanelHolder = () => wrapper.find('[data-test="panel-holder"]');
  const findEmptyMsg = () => wrapper.find('[data-test="empty-message"]');
  const findPanel = () => wrapper.find('[data-test="panel"]');
  const findPanelItem = () => wrapper.find('[data-test="panel-item"]');
  const findPanelItems = () => wrapper.findAll('[data-test="panel-item"]');
  const findJumpedItem = () => wrapper.find(".ta-input-item-jumped");

  it("renders properly", () => {
    createComponent();
    expect(wrapper.classes("ta-input")).toBe(true);
    expect(wrapper.html()).toContain("input");
    expect(findLabel().exists()).toBe(false);
    expect(findPanelHolder().isVisible()).toBe(false);
  });

  it("renders label when having label props", () => {
    createComponent({
      props: {
        label: "Label",
      },
    });
    expect(findLabel().text()).toContain("Label");
  });

  it("is on readonly state with readonly props true", () => {
    createComponent({
      props: {
        readonly: true,
      },
    });
    expect(wrapper.classes("ta-input-readonly")).toBe(true);
    expect(findInput().html()).toContain("readonly");
  });

  it("is on disabled state with disabled props true", () => {
    createComponent({
      props: {
        disabled: true,
      },
    });
    expect(wrapper.classes("ta-input-disabled")).toBe(true);
    expect(findInput().html()).toContain("disabled");
  });

  it("renders panel when being clicked", async () => {
    createComponent();
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(true);
  });

  it("focus input  when being clicked", async () => {
    createComponent({
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    expect(findInput().element).toBe(document.activeElement);
  });

  it("hides panel when blur input", async () => {
    createComponent({
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(true);
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("blur");
    expect(findPanelHolder().isVisible()).toBe(false);
  });

  it("hides panel when press esc", async () => {
    createComponent({
      attachTo: document.body,
    });
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(true);
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("keydown", { key: "Escape" });
    expect(findPanelHolder().isVisible()).toBe(false);
  });

  it("with readonly props doesn't render panel when being clicked ", async () => {
    createComponent({
      props: {
        readonly: true,
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(false);
  });

  it("with disabled props doesn't render panel when being clicked ", async () => {
    createComponent({
      props: {
        disabled: true,
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(false);
  });

  it("renders no data message when having no data", async () => {
    createComponent();
    await wrapper.trigger("mousedown");
    expect(findPanelHolder().isVisible()).toBe(true);
    expect(findEmptyMsg().exists()).toBe(true);
  });

  it("renders panel items when having data", async () => {
    createComponent({
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanel().exists()).toBe(true);
    expect(findPanelItems()).toHaveLength(3);
  });

  it("renders panel items when having primitive data", async () => {
    createComponent({
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanel().exists()).toBe(true);
    expect(findPanelItem().text()).toBe("1");
  });

  it("renders panel items when having object data", async () => {
    createComponent({
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
    expect(findPanel().exists()).toBe(true);
    expect(findPanelItem().text()).toBe("xin chao");
  });

  it("jumb to first item when press down", async () => {
    createComponent({
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
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("keydown", { key: "ArrowDown" });
    expect(findJumpedItem().text()).toContain("xin chao");
  });

  it("jumb to last item when press down twice", async () => {
    createComponent({
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
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("keydown", { key: "ArrowDown" });
    await findInput().trigger("keydown", { key: "ArrowDown" });
    expect(findJumpedItem().text()).toContain("tam biet");
  });

  it("jumb to last item when press up", async () => {
    createComponent({
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
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("keydown", { key: "ArrowUp" });
    expect(findJumpedItem().text()).toContain("tam biet");
  });

  it("jumb to fist item when press up twice", async () => {
    createComponent({
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
    expect(findInput().element).toBe(document.activeElement);
    await findInput().trigger("keydown", { key: "ArrowUp" });
    await findInput().trigger("keydown", { key: "ArrowUp" });
    expect(findJumpedItem().text()).toContain("xin chao");
  });

  it("update input when lick primitive panel item", async () => {
    createComponent({
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanel().exists()).toBe(true);
    const panelItem = findPanelItem();
    await panelItem.trigger("mousedown");
    expect(wrapper.find("input").element.value).toBe("1");
  });

  it("update input when click object panel item", async () => {
    createComponent({
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
    expect(findPanel().exists()).toBe(true);
    await findPanelItem().trigger("mousedown");
    expect(findInput().element.value).toBe("xin chao");
  });

  it("filter primitive panel inputs item when type input", async () => {
    createComponent({
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanel().exists()).toBe(true);
    expect(findPanelItems()).toHaveLength(3);
    await findInput().setValue("1");
    expect(findPanelItems()).toHaveLength(1);
  });

  it("filter primitive panel inputs - show empty message when no item match", async () => {
    createComponent({
      props: {
        items: [1, 2, 3],
      },
    });
    await wrapper.trigger("mousedown");
    expect(findPanel().exists()).toBe(true);
    expect(findPanelItems()).toHaveLength(3);
    await findInput().setValue("4");
    expect(findEmptyMsg().exists()).toBe(true);
  });
});
