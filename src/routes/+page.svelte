<script>
  import { onMount } from "svelte";
  import Composer from "./Composer.svelte";
  import Post from "./Post.svelte";
  import "./styles.css";

  export let data;

  /**
   * @type {any[]}
   */
  let posts = [];

  /**
   * @type {Composer}
   */
  let composer;

  /**
   * @type {number | undefined}
   */
  let fetchInterval;

  const sendPost = async () => {
    const imageData = composer.exportDataUrl();
    const post = {
      author: data.nickname,
      img: imageData,
      timestamp: new Date(),
      id: undefined,
    };
    const response = await fetch("/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const responseJson = await response.json();
      post.id = responseJson.id;
      posts[posts.length] = post;
      sortPosts();
      composer.clearDrawing();
    } else {
      alert(`Error ${response.status}: ${response.statusText}`);
    }
  };

  const sortPosts = () => {
    posts = posts.sort((a, b) => a.timestamp - b.timestamp);
  };

  const retrievePosts = async () => {
    let mostRecent = posts[posts.length - 1]?.timestamp;

    const response = await fetch(
      "/posts?" +
        new URLSearchParams({
          after: mostRecent,
        })
    );
    if (response.ok) {
      const { posts: newPosts } = await response.json();
      posts = newPosts;
      sortPosts();
    }
  };

  onMount(() => {
    retrievePosts();
    fetchInterval = setInterval(retrievePosts, 5000);
    return () => {
      clearInterval(fetchInterval);
    };
  });
</script>

<svelte:head>
  <title>Düdle Chat</title>
</svelte:head>

<main>
  <h1>Düdle Chat</h1>

  {#if data.nickname}
    <div>You are: {data.nickname}</div>
    <div id="post-list">
      {#each posts as post}
        <Post {post} />
      {/each}
    </div>

    <Composer width={420} height={180} bind:this={composer} />
    <button on:click={sendPost}>Send!</button>
  {:else}
    <h2>Pick a nickname</h2>
  {/if}
</main>

<style>
  main {
    height: 100vh;
    width: 100%;
    margin: 0 auto;
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  #post-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    flex-grow: 10;
    overflow-y: scroll;
  }
</style>
