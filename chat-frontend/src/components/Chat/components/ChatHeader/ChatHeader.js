import React, { Fragment, useState } from 'react';
import { userStatus } from "../../../../utils/helper"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./ChatHeader.scss"

const Chatheader = ({ chat }) => {
    return (
        <Fragment>
            <div id='chatter'>
                {
                    chat.Users.map(user => {
                        return <div className='chatter-info'>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <div className='chatter-status'>
                                <span className={`online-status ${userStatus(user)}`}></span>
                            </div>
                        </div>
                    })
                }
            </div>
            <FontAwesomeIcon
                icon={["fas", "ellipsis-v"]}
                className="fa-icon"
            />

            
        </Fragment>
    );
}

export default Chatheader;
