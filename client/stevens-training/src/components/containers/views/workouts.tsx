import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../../features/ui/uiSlice';
import WorkoutsListView from '../workouts/workouts-list-view';

export default function Workouts(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("My Workouts"));
    }, [])
    return (
        <WorkoutsListView />
    )
}