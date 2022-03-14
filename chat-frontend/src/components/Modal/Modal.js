import React from "react"
import "./Modal.scss"

const Modal = (props) => {

    const findByKey = (name) => {
        //props.childrem will be an array of all the <Fragment> Components
        var result = props.children.filter(child => child.key===name);
        return result
    }

    const closeModal = (e) => {
        //Stop event from bubbling up
        //https://www.youtube.com/watch?v=UWCvbwo9IRk
        e.stopPropagation()

        //prevents closeModal() running when clicking on any of the div's inside the modal
        if(e.target.classList.contains("model-close")){
            return props.click()
        }
    }

    return (
        <div className="modal-mask model-close" onClick={closeModal}>
            <div className="modal-wrapper">
                <div className="modal-container">
                    {/* render the three fragments passed from Navbar */}

                    <div className="modal-header">
                        {findByKey("header")} 
                    </div>

                    <div className="modal-body">
                        {findByKey("body")}
                    </div>

                    <div className="modal-footer">
                        <button className="model-close" onClick={closeModal}>CLOSE</button>
                        {findByKey("footer")}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Modal