export function load({ cookies }) {
  // TODO make nickname stuff
  const nickname = cookies.get("nickname");

  return {
    nickname,
  };
}
