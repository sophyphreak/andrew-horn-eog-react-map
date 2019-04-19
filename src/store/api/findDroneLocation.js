import "isomorphic-fetch";

const findDroneLocation = async () => {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://eog-api.andrew-horn-portfolio.life/api/drone`
  );
  if (!response.ok) {
    return { error: { code: response.status } };
  }
  const json = await response.json();
  return { data: json };
};

export default findDroneLocation;
