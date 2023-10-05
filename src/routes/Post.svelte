<script>
  /**
   * @type {{ author: string; timestamp: Date; img: string; id: number; }}
   */
  export let post;
</script>

<article>
  <span class="username">{post.author}</span>
  <img src={post.img} alt={`Post by ${post.author}`} />
  <span class="timestamp">#{post.id} - {post.timestamp?.toLocaleString()}</span>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
  }
  img {
    width: 100%;
    border: 2px solid black;
    border-radius: 0 8px 8px 8px;
  }
  .username {
    background-color: black;
    color: white;
    font-size: medium;
    border-radius: 8px 8px 0 0;
    padding-left: 6px;
    padding-right: 6px;
    width: fit-content;
  }
  .timestamp {
    font-size: small;
    text-align: right;
    margin-right: 6px;
  }
</style>
