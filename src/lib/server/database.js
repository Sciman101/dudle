/**
 * @type {any[]}
 */
const database = [];

export function getPosts(after) {
  if (after) {
    return database.filter((post) => post.timestamp >= after);
  } else {
    return database;
  }
}

/**
 * @param {any} post
 */
export function addPost(post) {
  const id = database.length;
  database.push({
    ...post,
    id,
  });
  return {
    id,
  };
}
