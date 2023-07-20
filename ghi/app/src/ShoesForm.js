import React, { useState, useEffect } from "react";

function ShoesForm() {
    const [bin, setBin] = useState([]);
    const [locations, setLocations] = useState([]);
    const [formData, setFormData] = useState({
        manufacturer: '',
        name: '',
        color: '',
        shoe_picture: '',
        locations: ''
    })

    const getData = async () => {
        const url = "http://localhost:8100/api/bins/";
        const response = await fetch(url);

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

        const locationUrl = 'http://localhost:8080/api/shoes/';

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
                manufacturer: '',
                name: '',
                color: '',
                shoe_picture: '',
                locations: ''
            });
            window.location.href = "/shoes"
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

                  <form onSubmit={handleSubmit} id="create-shoe-form">
                    <h1 className="card-title">Add your shoes!</h1>
                    <p className="mb-3">
                      Please choose a place for your shoes.
                    </p>

                    <div className="mb-3">
                      <select onChange={handleChangeName} name="bin" id="bin" required>
                        <option value="">Choose a Bin</option>
                        {
                          bin.map(bin => {
                            return (
                              <option key={bin.id} value={bin.href}>{bin.closet_name}</option>
                            )
                          })
                        }
                      </select>
                    </div>

                    <p className="mb-3">
                      Now, tell us about the shoes.
                    </p>
                    <div className="">
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="manufacturer" type="text" id="manufacturer" name="manufacturer" className="form-control" />
                          <label htmlFor="Manufacturer">Manufacturer</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="name" type="text" id="name" name="name" className="form-control" />
                          <label htmlFor="Name">Name</label>
                        </div>
                      </div>
                      <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="color" type="text" id="color" name="color" className="form-control" />
                          <label htmlFor="Color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                          <input onChange={handleChangeName} required placeholder="picture" type="url" id="shoe_picture" name="shoe_picture" className="form-control" />
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

export default ShoesForm;
