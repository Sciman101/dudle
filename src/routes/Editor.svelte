<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import ControlGroup from "./ControlGroup.svelte";

  /**
   * @type {number}
   */
  export let width;
  /**
   * @type {number}
   */
  export let height;

  // Constants
  const PEN_SIZES = [2, 5, 10];
  const PALETTE = [
    "black",
    "white",
    "grey",
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "purple",
  ];

  // Drawing logic
  /**
   * @type {HTMLCanvasElement}
   */
  let canvas;
  let context;
  onMount(() => {
    context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    context.lineCap = "round";
    context.lineJoin = "round";
  });

  let prevX, prevY;
  let drawing = false;
  let penSize = PEN_SIZES[0];
  let penColor = PALETTE[0];

  const pointermove = (evt) => {
    if (!context || !drawing) return;
    const { offsetX: x, offsetY: y } = evt;
    context.moveTo(prevX, prevY);
    context.lineTo(x, y);
    context.stroke();
    prevX = x;
    prevY = y;
  };
  const pointerdown = (evt) => {
    if (!context || drawing) return;
    const { offsetX: x, offsetY: y } = evt;
    prevX = x;
    prevY = y;
    drawing = true;
    context.lineWidth = penSize;
    context.strokeStyle = penColor;

    // Put a dot right here
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y);
    context.stroke();
  };
  const pointerup = () => {
    if (!context || !drawing) return;
    drawing = false;
    context.closePath();
  };
  const pointerout = (evt) => {
    if (!context || !drawing) return;

    // Draw line to end
    const { offsetX: x, offsetY: y } = evt;
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
    drawing = false;
  };

  const clearDrawing = () => {
    if (!context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  const setBackgroundColor = (col) => {
    console.log(col);
    canvas.style.backgroundColor = col;
  };
</script>

<div class="container" style="width: {width}px; height: {height + 32}px;">
  <div class="controls">
    <ControlGroup
      name="penSize"
      options={PEN_SIZES.map((c) => ({ value: c, size: c }))}
      bind:selected={penSize}
    />
    <div class="divider" />
    <ControlGroup
      name="color"
      options={PALETTE.map((c) => ({
        value: c,
        color: c,
        size: 0,
      }))}
      bind:selected={penColor}
      onDoubleClick={setBackgroundColor}
    />
    <div class="divider" />
    <button on:click={clearDrawing}>Clear</button>
  </div>
  <canvas
    {width}
    {height}
    bind:this={canvas}
    on:pointermove={pointermove}
    on:pointerdown={pointerdown}
    on:pointerup={pointerup}
    on:pointerout={pointerout}
  />
</div>

<style>
  .container {
    margin: 0 auto;
    display: flex;
    padding: 0;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
  }

  canvas {
    width: 100%;
    height: 100%;
  }

  .controls {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }

  .divider {
    background-color: black;
    width: 2px;
    height: 80%;
  }
</style>
