window.addEventListener("load", () => {
  let long;
  let lat;

  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let temperatureDegree = document.querySelector(".temperature-degree");

  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".tempurature");

  const temperatureSpan = document.querySelector(".tempurature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/b0d289c03287bc9ab123a45e5ccdc0e3/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set DOM Elements from the API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
          //FORMULA FOR CELSIUS
          let celsius = (temperature - 32) * (5 / 9);
          //Set Icons
          setIcons(icon, document.querySelector(".icon"));

          //Change tempurature to Celsius/Farenheit
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    h1.textContent = "Please refresh page and enable location";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
