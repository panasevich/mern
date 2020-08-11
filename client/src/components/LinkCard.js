import React from "react";

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Yours link: <a href={link.to} target="_blank">{link.to}</a></p>
            <p>From: <a href={link.from} target="_blank">{link.from}</a></p>
            <p>Click counts: <strong>{link.clicks}</strong></p>
            <p>Date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </>
    )
}