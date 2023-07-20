import { useEffect, useState } from 'react';
import { NavLink, Link } from "react-router-dom"


function HatList() {
    const [hats, setHats] = useState ([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/hat/');

        if (response.ok) {
            const data = await response.json();
            setHats(data.hats)
        }
    }

    const deleteHat = async (id) => {
        const response = await fetch('http://localhost:8090/api/hat/${id}/', {
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
    useEffect(() =>{
        getData()
    }, [])



    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                <th>Fabric</th>
                <th>Style</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                return (
                    <tr key={hat.id} value="">
                    <td>{hat.fabric}</td>
                    <td>
                    { hat.style }
                    </td>
                    <td>
                    { hat.color }
                    </td>
                    <td>
                        <img className="w-25" src={hat.hat_picture} />
                    </td>
                    <td>{hat.locations.closet_name} {hat.locations.section_number} {hat.locations.shelf_number}</td>
                    <td>
                        <Link to="#" onClick={() => deleteHat(hat.id)}>Delete</Link>
                    </td>
                    </tr>
                );
                })}
            </tbody>
        </table>
        <NavLink to="/hats/create" className="btn btn-primary">Make new hat!</NavLink>
        </>
  );
}

export default HatList
