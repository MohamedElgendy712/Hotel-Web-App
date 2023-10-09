import React, { Component } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import './successPopup.css'

class SuccessPopup extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }

    openClosePopup = () => {
        this.myRef.current.classList.toggle("open-popup")
    }

    render() {
        return (
            <div ref={this.myRef} className='popup-container'>
                <div className="popup">
                    <AiOutlineCloseCircle onClick={this.openClosePopup} className='close-btn' />
                    <p className='content'>Your reservation has been completed successfully &#127881; </p>
                </div>
            </div>
        );
    }
}

export default SuccessPopup;

