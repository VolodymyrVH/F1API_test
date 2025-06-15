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
