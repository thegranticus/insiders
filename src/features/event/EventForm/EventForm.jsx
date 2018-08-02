/*global google*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { withFirestore } from 'react-redux-firebase';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Script from 'react-load-script';
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate';
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';
import PlaceInput from '../../../app/common/form/PlaceInput';


const mapState = (state) => {

  let event = {};

  if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
    event = state.firestore.ordered.events[0];
  }

  return {
    initialValues: event,
    event
  }
}

const actions = {
  createEvent,
  updateEvent,
  cancelToggle
}

const category = [
    {key: 'injury', text: 'Injury Prevention', value: 'injury'},
    {key: 'stretch', text: 'Flexibility', value: 'stretch'},
    {key: 'strength', text: 'Strength', value: 'strength'},
    {key: 'speed', text: 'Speed', value: 'speed'},
    {key: 'agility', text: 'Agility', value: 'agility'},
    {key: 'core', text: 'Core', value: 'core'},
    {key: 'cardio', text: 'Cardiovascular', value: 'cardio'},
    {key: 'balance', text: 'Balance & Functional', value: 'balance'},
    {key: 'plyo', text: 'Plyometric', value: 'plyo'},




];

const validate = combineValidators({
  title: isRequired({message: 'Exercise name is required'}),
  category: isRequired({message: 'Select a category'}),
  description: composeValidators(
    isRequired({message: 'Enter a description for the exercise'}),
    hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
  )(),
  city: isRequired('city'),
  venue: isRequired('venue'),
  date: isRequired('date')

})

class EventForm extends Component {
  state = {
    cityLatLng: {},
    venueLatLng: {},
    scriptLoaded: false
  }

  async componentDidMount() {
    const {firestore, match} = this.props;
    await firestore.setListener(`events/${match.params.id}`);
    // if (event.exists) {
    //   this.setState({
    //     venueLatLng: event.data().venueLatLng
    //   })
    // }
  }

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  handleCitySelect = (selectedCity) => {
    geocodeByAddress(selectedCity)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
        cityLatLng: latlng
      })
    })
    .then(() => {
      this.props.change('city', selectedCity)
        })
  };

  handleVenueSelect = (selectedVenue) => {
    geocodeByAddress(selectedVenue)
    .then(results => getLatLng(results[0]))
    .then(latlng => {
      this.setState({
        venueLatLng: latlng
      })
    })
    .then(() => {
      this.props.change('venue', selectedVenue)
        })
  };


  onFormSubmit = values => {
    values.venueLatLng = this.state.venueLatLng;
    if (this.props.initialValues.id) {
      if (Object.keys(values.VenueLatLng).length ===0) {
        values.venueLatLng = this.props.event.venueLatLng
      }
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      this.props.createEvent(values)
      this.props.history.push('/events')
    }
  };


  render() {
    const {invalid, submitting, pristine, event, cancelToggle} = this.props;
    return (
      <Grid>
        <Script
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyCCDQtQe6UMzXUhg3KA8kEznWVn_g4TWjQ&libraries=places'
                    onLoad={this.handleScriptLoaded}
                />
        <Grid.Column width={10}>
          <Segment>
            <Header sub color='black' content='Exercise Details'/>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Field
                name='title'
                type='text'
                component={TextInput}
                placeholder='Name of exercise'
              />
              <Field
                name='category'
                type='text'
                component={SelectInput}
                options={category}
                placeholder='Exercise category'
              />
              <Field
                name='description'
                type='text'
                rows={3}
                component={TextArea}
                placeholder='Description of exercise'
              />
              <Header sub color='black' content='Location Information'/>
              <Field
                name='city'
                type='text'
                component={PlaceInput}
                options={{types: ['(cities)']}}
                placeholder='City'
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded &&
              <Field
                name='venue'
                type='text'
                component={PlaceInput}
                options={{
                  location: new google.maps.LatLng(this.state.cityLatLng),
                  radius: 1,
                  types: ['establishment']}}
                placeholder='Performance Center'
                onSelect={this.handleVenueSelect}
              />}
              <Field
                name='date'
                type='text'
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat='HH:mm'
                showTimeSelect
                placeholder='Date Added'
              />
              <Button
                disabled={invalid || submitting || pristine}
                positive type="submit">
                Submit
              </Button>
              <Button as={Link} to='/events' type="button">Cancel</Button>
            <Button 
              onClick={() => cancelToggle(!event.cancelled, event.id)}
              type='button'
              color={event.cancelled ? 'green' : 'red'}
              floated='right'
              content={event.cancelled ? 'Activate Exercise' : 'Deactivate Exercise'}
            />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default withFirestore(connect(mapState, actions)(reduxForm({ form: 'eventForm', enableReinitialize: true, validate })(EventForm)));