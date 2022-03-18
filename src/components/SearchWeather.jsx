import React, {useState, useEffect} from "react";

function SearchWeather() {
    const [search, setSearch] = useState("london");
    const [data, setData] = useState([]);
    const [input, setinput] = useState("");
    let componentMounted = true;

    useEffect(() => {
        const fetchWeather = async () =>{
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=6c5c5cf22589babaf36d7394a4efbf42`)
            if (componentMounted){
                setData(await response.json());
                console.log(data);
            }
            return () => {
                componentMounted = false;
            }
        }
        
        fetchWeather();
    }, [])

    let emoji = null;
    if(data.weather[0].main !== undefined){
        if(data.weather[0].main ==="Clouds"){
            emoji = "fa-cloud";
        } else if(data.weather[0].main ==="Thunderstorm"){
            emoji = "fa-bolt";
        } else if(data.weather[0].main ==="Drizzle"){    
            emoji = "fa-cloud-drizzle";
        } else if(data.weather[0].main ==="Rain"){
            emoji = "fa-cloud-showers-heavy";
        } else if(data.weather[0].main ==="Snow"){
            emoji = "fa-snowflake";
        } else {
            emoji = "fa-smog";
        }
    } else {
        return (
            <div>Loading ...</div>
        )
    }
    
    //flooring temperature data to 2decimal places
    let temp = (data.main.temp - 273.15).toFixed(2);
    let temp_min = (data.main.temp_min - 273.15).toFixed(2);
    let temp_max = (data.main.temp_max - 273.15).toFixed(2);

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div class="card text-white text-center border-0">
              <img
                src="https://images.unsplash.com/photo-1647449036501-1341aeb48d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
                class="card-img"
                alt="..."
              />
              <div class="card-img-overlay">
                <form>
                  <div class="input-group mb-4 w-75 mx-auto">
                    <input
                      type="search"
                      class="form-control"
                      placeholder="Search City"
                      aria-label="Search City"
                      aria-describedby="basic-addon2"
                    />
                    <button type="submit" class ="input-group-text" id="basic-addon2">
                       <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-light bg-opacity-50 py-3">
                <h2 class="card-title">{data.name}</h2>
                <p class="card-text lead">
                  Thursday, March 18, 2022
                </p>
                <hr />
                <i className={`fas ${emoji} fa-4x`}></i>
                <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                <p className="lead">{temp_min}&deg;C | {temp_max}&deg;C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchWeather;
