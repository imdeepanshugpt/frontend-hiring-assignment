import React from 'react';
import Card from '@material-ui/core/Card';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const FilterCard = (props) => {
    const location = [...new Set(props.data.map(item => item.area))];
    const renderList = () => {
        return location.map((area) => {
            return <Button key={area}
                onClick={(event) => { props.handleClick(area); event.preventDefault(); }}
            >{area}</Button>;
        });
    }
    return (
        <Card>
            <Button
             onClick={(event) => { props.handleClick('All'); event.preventDefault(); }}
            >All</Button>
            {renderList()}
        </Card>
    );
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}


export default connect(mapStateToProps, null)(FilterCard);