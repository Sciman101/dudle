<script>
  import { slide } from "svelte/transition";
  /**
   * @type {any}
   */
  export let options;
  /**
   * @type {string}
   */
  export let name;
  export let selected = options[0].value;
  /**
   * @type {function}
   */
  export let onDoubleClick;
</script>

<div class="options">
  {#each options as { value, size, color }, index (`${name}-${value}`)}
    <input
      class="sr-only"
      type="radio"
      bind:group={selected}
      id={`${name}-${value}`}
      {value}
      {name}
      checked={index == 0}
    />
    <label
      for={`${name}-${value}`}
      style="background-color: {color ?? 'none'}"
      transition:slide={{ axis: "x" }}
      on:dblclick={() => onDoubleClick(value)}
      ><div
        class="dot"
        style="width: {size ?? '4'}px; height:{size ?? '4'}px"
      /></label
    >
  {/each}
</div>

<style>
  .options {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 4px;
    height: 100%;
  }

  .sr-only {
    position: absolute;
    clip: rect(1px, 1px, 1px, 1px);
    padding: 0;
    border: 0;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }

  input[type="radio"] + label {
    width: 16px;
    height: 16px;
    border: 2px solid black;
    border-radius: 10px;
    position: relative;
    transition: 0.2s;
    text-align: center;
    display: block;
    overflow: hidden;
  }

  input[type="radio"]:hover + label {
    transform: translateY(4px);
    transition: 0.1s;
  }

  input[type="radio"]:checked + label {
    border: 2px solid white;
    transition: 0.1s;
  }

  .dot {
    width: 4px;
    height: 4px;
    background-color: black;
    margin: auto auto;
    border-radius: 100%;
  }
</style>
