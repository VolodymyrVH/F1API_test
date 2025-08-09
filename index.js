async function fetchData() { //function for call
  try{ //use this
    const driver_number = document.getElementById("driNum").value; //getting from html input value

    const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driver_number}`); //search this value in library

    if(!response.ok){
      throw new Error('Coukd not fetch resource'); //throw error
    }

    const data = await response.json(); //getting response in json format
    console.log(data);
    const driverName = data[0].full_name; //searching what we need
    document.getElementById("divAPI").textContent = driverName; //show the driver name
  }
  catch(error){ // if error throw error
    console.error(error);
  }
}

async function fetchDriverData() {
  const driverLastName = document.getElementById("driverName__input").value;
  const driverNumber = document.getElementById("driverNum__input").value;
  const driverAcronym = document.getElementById("driverAcron__input").value.toUpperCase();

  document.getElementById("driverName__input").value = '';
  document.getElementById("driverNum__input").value = '';
  document.getElementById("driverAcron__input").value = '';

  let response;

  if (driverLastName) {
    response = await fetch(`https://api.openf1.org/v1/drivers?last_name=${driverLastName}`);
  } else if (driverNumber) {
    response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}`);
  } else if (driverAcronym) {
    response = await fetch(`https://api.openf1.org/v1/drivers?name_acronym=${driverAcronym}`);
  } else {
    alert("Sorry, put something!");
  }

  const data = await response.json();

  const driverAvatar = data[0].headshot_url;
  const imgElement = document.getElementById("headshot_driver");
  imgElement.src = driverAvatar;
  imgElement.style.display = "block";
  const name = data[0].full_name;
  document.getElementById("drivers_name").textContent = name;
  const number = data[0].driver_number;
  document.getElementById("driver_number").textContent = number;
  const country = data[0].country_code;
  document.getElementById("driver_country").textContent = country;
  const acronym = data[0].name_acronym;
  document.getElementById("driver_acronym").textContent = acronym;
  const team = data[0].team_name;
  document.getElementById("driver_team").textContent = team;
}

async function fetchTrackData() {
  const countryTrack = document.getElementById("countryName__input").value;
  const nameTrack = document.getElementById("circutName__input").value;
  const yearTrack = document.getElementById("year__input").value;

  document.getElementById("countryName__input").value = "";
  document.getElementById("circutName__input").value = "";
  document.getElementById("year__input").value = "";

  let response;

  if (countryTrack && yearTrack) {
    response = await fetch(`https://api.openf1.org/v1/meetings?year=${yearTrack}&country_name=${countryTrack}`);
  }
  else if (nameTrack && yearTrack) {
    response = await fetch(`https://api.openf1.org/v1/meetings?year=${yearTrack}&meeting_name=${nameTrack}`);
  } else {
    alert("Sorry, put something!");
  }

  const data = await response.json();

  const name = data[0].meeting_official_name;
  document.getElementById("track_name").textContent = name;
  const country = data[0].country_name;
  document.getElementById("track_country").textContent = country;

  const meetingkey = data[0].meeting_key;
  const race_data = await fetch(`https://api.openf1.org/v1/sessions?meeting_key=${meetingkey}&session_name=Race`);
  const race_json = await race_data.json();
  const sessionKey = race_json[0].session_key;

  const position_data = await fetch(`https://api.openf1.org/v1/position?session_key=${sessionKey}`);
  const finish_grid = await position_data.json();

  const latestPositionByDriver = {};

  for (const pos of finish_grid) {
    const driverNumber = pos.driver_number;

    if (!latestPositionByDriver[driverNumber] || pos.data > latestPositionByDriver[driverNumber].data) {
      latestPositionByDriver[driverNumber] = pos;
    }
  }

  const findGrid = Object.values(latestPositionByDriver).sort((a, b) => a.position - b.position);

  const driverGrid = document.getElementById("driverList");
  driverGrid.innerHTML = "";
  for (const driver of findGrid) {
    const div = document.createElement("div");
    div.className = "grid-item";
    div.innerHTML = `P${driver.position}${driver.driver_number}${driver.last_name}`;
    driverGrid.appendChild(div);
  }
}

async function fetchTeam() {
  const teamName = document.getElementById("team").value;

  document.getElementById("team").value = "";

  let response = await fetch(`https://api.openf1.org/v1/drivers?session_key=latest&team_name=${teamName}`);
  const teamInfo = await response.json();

  const names = new Set();
  const unique = [];

  for (const driver of teamInfo) {
    if (!names.has(driver.full_name)) {
      names.add(driver.full_name);
      unique.push(driver);
    }
  }

  const TeamName = teamInfo[0].team_name;
  document.getElementById("team_name_p").textContent = TeamName;

  const list = document.getElementById("drivers_team");
  list.innerHTML = "";

  for (const driverDisplay of unique) {
  const driverName = driverDisplay.full_name;
  const driverNumber = driverDisplay.driver_number;
  const driverCountry = driverDisplay.country_code;

  let row = document.createElement("div");
  row.className = "driver-row";
  let nmDriver = document.createElement("div");
  nmDriver.textContent = driverName;
  let numDriver = document.createElement("div");
  numDriver.textContent = driverNumber;
  let cnDriver = document.createElement("div");
  cnDriver.textContent = driverCountry;

  row.appendChild(nmDriver);
  row.appendChild(numDriver);
  row.appendChild(cnDriver);

  list.appendChild(row);
}
  
  console.log(unique);
}