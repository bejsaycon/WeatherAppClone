import React, {useState, useEffect} from "react";

function SearchWeather() {
    const [search, setSearch] = useState("new york");
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
                <i className="fas fa-cloud fa-4x"></i>
                <h1 className="fw-bolder mb-5">33.06 &deg;C</h1>
                <p className="lead fw-bolder mb-0">Cloud</p>
                <p className="lead">30.01&deg;C | 35.23&deg;C</p>
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
