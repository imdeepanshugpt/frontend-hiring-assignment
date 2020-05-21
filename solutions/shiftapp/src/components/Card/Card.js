/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Button from '../Button/Button';
import Grid from '@material-ui/core/Grid';
import FilterCard from './FilterCard';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import './Card.css';

const ShiftCard = (props) => {
    const [groupByDate, setGroupByDate] = useState([]);

    useEffect(() => {
        aggregateShifts(props.data);
    }, []);

    const aggregateShifts = (data) => {
        const groupByData = _.groupBy(
            data,
            (shift) => moment(new Date(shift.startTime)).format('MMMM DD')
        );
        setGroupByDate(groupByData);
    }

    const createShiftCards = (data) => {
        if (data && data.length > 0) {
            return data.map((card) => {
                const startTime = `${moment(new Date(card.startTime)).format('HH:mm')}`;
                const endTime = `${moment(new Date(card.endTime)).format('HH:mm')}`
                return (
                    <Card style={{ padding: '10px' }} key={card.id}>
                        <Grid container spacing={1}>
                            <Grid item xs={8} style={{ textAlign: 'left' }}>
                                <span style={{ color: '#4F6C92' }}>{startTime} - {endTime}</span>
                                <br></br>
                                <span style={{ color: '#CBD2E1' }}>{card.area}</span>
                            </Grid>
                            <Grid item xs={4}>
                                <span style={{ width: '20%' }}>
                                    <Button className="customButton" booked={card.booked} id={card.id}></Button>
                                </span>
                            </Grid>
                        </Grid>
                    </Card>
                );
            });
        }
    }

    const createDateHeader = () => {
        return Object.keys(groupByDate).map((date) => {
            const data = groupByDate[date];
            return (
                <React.Fragment key={date}>
                    <Card style={{ padding: '10px' }} key={date}>
                        <strong style={{ color: '#4F6C92' }}>{date}</strong>
                        <span style={{ fontSize: '10px', color: '#CBD2E1', padding: '10px' }}> {data.length} Shifts</span>
                    </Card>
                    {createShiftCards(data)}
                </React.Fragment>

            )
        })
    }

    const handleLocation = (area) => {
        if (area === 'All') {
            aggregateShifts(props.data);
        } else {
            const filteredData = props.data.filter((shift) => {
                return shift.area === area;
            });
            aggregateShifts(filteredData);
        }
    }

    return (
        <div>
            <FilterCard handleClick={handleLocation}></FilterCard>
            {createDateHeader()}
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

export default connect(mapStateToProps, null)(ShiftCard);