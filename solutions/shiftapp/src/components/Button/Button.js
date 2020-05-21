import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bookShift, cancelShift } from '../../api/service';
import CircularProgress from '@material-ui/core/CircularProgress';


const CustomButton = (props) => {
    const [status, setStatus] = useState(props.booked);
    const [loader, setLoader] = useState(false);
    const [apiStatus, setApiStatus] = useState('');
    const handleClick = () => {
        setLoader(true);
        if (!status) {
            bookShift(props.id).then((response) => {
                setLoader(false);
                setStatus(true);
                setApiStatus('Booked');
            }).catch((error) => {
                setLoader(false);
                if ((error.response.data.message).includes('overlapping')) {
                    setApiStatus('Overlapping');
                } else {
                    alert(error.response.data.message);
                }
            });
        } else {
            cancelShift(props.id).then((response) => {
                setLoader(false);
                setStatus(false);
                setApiStatus('');
            }).catch((error) => {
                setLoader(false);
                alert(error.response.data.message);
            });
        }
    }

    return (
        <div>
            <span>{apiStatus}</span>
            <Button variant="outlined" color="secondary" style={{ float: 'right' }}
                onClick={(event) => handleClick(event)}>
                {loader ? <CircularProgress /> : status ? 'Cancel' : 'Book'}
            </Button >
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}
export default connect(mapStateToProps, null)(CustomButton);