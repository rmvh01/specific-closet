import { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom"

function ShoesList() {
    const [shoes, setShoes] = useState ([])

    const getData = async () => {
        const response = await fetch('http://localhost:8080/api/shoes/');

        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setShoes(data.shoes)
        }
    }

  /*   const deleteShoes = async (id) => {
        const response = await fetch('http://localhost:8080/api/shoes/${id}/', {
        method: "delete",
        // headers: {
        //     'Content-Type': 'application/json',
        //     }
        })
        console.log(response)
        if (response.ok) {
            window.location.reload();
        }
    }
 */
    useEffect(() =>{
        getData()
    }, [])

    return (
        <><table className="table table-striped">
            <thead>
                <tr>
                    <th>Manufacturer</th>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Shoe_picture</th>
                    <th>Locations</th>
                </tr>
            </thead>
            <tbody>
                {shoes.map(shoe => {
                    return (
                        <tr key={shoe.id} value="">
                            <td>{shoe.manufacturer}</td>
                            <td>
                                {shoe.name}
                            </td>
                            <td>
                                {shoe.color}
                            </td>
                            <td>
                                <img className="w-25" src={shoe.shoe_picture} />
                            </td>
                            <td>{shoe.location.closet_name} {shoe.location.bin_number} {shoe.location.bin_number}</td>
                            {/* <td>
                                <Link to="#" onClick={() => deleteShoes(shoe.id)}>Delete</Link>
                            </td> */}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <NavLink to="/shoes/create" className="btn btn-primary">Make new Shoes!</NavLink></>
  );
}

export default ShoesList;
