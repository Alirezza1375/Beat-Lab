export async function request(url, options) {
  try {
    await fetch(`http://127.0.0.1:5000/${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  } catch (err) {
    console.error("ridi", err);
  }
}
