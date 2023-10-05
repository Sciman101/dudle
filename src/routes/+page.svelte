<script>
  import Editor from "./Editor.svelte";
</script>

<svelte:head>
  <title>Doodler!</title>
</svelte:head>

<main>
  <Editor width={640} height={480} />
</main>

<style>
  main {
    margin: 0 auto;
    height: 100%;
  }
</style>
