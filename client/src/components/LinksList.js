import React from "react";
import {Link} from "react-router-dom"

export const LinksList = ({links}) => {
    if (!links.length) {
        return <p>No links yet.</p>
    }
    return (
        <table>
            <thead>
            <tr>
                <th>#</th>
                <th>Origin Link</th>
                <th>Short Link</th>
                <th>Open</th>
            </tr>
            </thead>
            <tbody>
            {links.map((link, index) => {
                return (
                    <tr>
                        <td>{index + 1}</td>
                        <td>{link.from}</td>
                        <td>{link.to}</td>
                        <td><Link to={`/detail/${link._id}`}>Open</Link></td>
                    </tr>
                )
            })}


            </tbody>
        </table>
    )
}