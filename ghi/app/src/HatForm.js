import React, { useState, useEffect } from "react";

function HatForm() {
    const [hats, setHats] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        fabric: '',
        style: '',
        color: '',
        hat_picture: '',
        locations: ''
    })

    const getData = async () => {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url);
        console.log(response);

        if (response.ok) {
            const data = await response.json();
            setLocations(data.locations);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const locationUrl = 'http://localhost:8090/api/hat/';

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(locationUrl, fetchConfig);

        if (response.ok) {
            setFormData({
                fabric: '',
                style: '',
                color: '',
                hat_picture: '',
                locations: ''
            });
            window.location.href = "/hats"
        }
    }

    const handleChangeName = (e) => {
        const value = e.target.value;
        const inputName = e.target.name;
        setFormData({
            ...formData,
            [inputName]: value
        });
    }

    return (
        <div className="my-5">
          <div className="row">
            <div className="col col-sm-auto">
            </div>

            <div className="col">
              <div className="card shadow">
                <div className="card-body">

                  <form onSubmit={handleSubmit} id="create-hat-form">
                    <h1 className="card-title">Add a Hat!</h1>
                    <p className="mb-3">
                      Please choose a location for your hat.
                    </p>

                    <div className="mb-3">
                      <select onChange={handleChangeName} name="locations" id="locations" required>
                        <option value="">Choose a Location</option>
                        {
                          locations.map(location => {
                            return (
                              <option key={location.id} value={location.href}>{location.closet_name}</option>
                            );
                          })
                        }
                      </select>
                    </div>

                    <p className="mb-3">
                      Now, tell us about the hat.
                    </p>
                    <div className="">
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="fabric" type="text" id="fabric" name="fabric" className="form-control" />
                          <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="style" type="text" id="style" name="style" className="form-control" />
                          <label htmlFor="style">Style</label>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="color" type="text" id="color" name="color" className="form-control" />
                          <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="picture" type="url" id="hat_picture" name="hat_picture" className="form-control" />
                          <label htmlFor="Picture">Picture</label>
                        </div>
                    <button className="btn btn-lg btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

}

export default HatForm;
