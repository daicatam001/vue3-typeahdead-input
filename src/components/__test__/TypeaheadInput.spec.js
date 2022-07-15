// import { describle, it } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import { describle, it, beforeEach, expect } from "vitest";
import TypeaheadInput from "../TypeaheadInput.vue";
describle("TypeaheadInput", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TypeaheadInput);
  });

  it("render properly", () => {
    expect(wrapper.html()).toContain('input')
  });
});
