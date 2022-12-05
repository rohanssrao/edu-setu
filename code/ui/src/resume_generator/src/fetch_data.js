import get_suspender from "./get_suspender";

function fetch_data(url) {
  const promise = fetch(url)
    .then((res) => res.json())
    .then((res) => res.message);

  return get_suspender(promise);
}

export default fetch_data;
