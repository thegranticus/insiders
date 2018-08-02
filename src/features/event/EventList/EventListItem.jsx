import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
  render() {
    const {event, deleteEvent} = this.props;
    return (
             <Segment.Group>
                <Segment>
                  <Item.Group>
                    <Item>
                      <Item.Image
                        size="tiny" 
                        circular
                        src={event.hostPhotoURL} />
                      <Item.Content>
                        <Item.Header as="a">{event.title}</Item.Header>
                        <Item.Description>
                          Uploaded by <a>{event.hostedBy}</a>
                        </Item.Description>
                        {event.cancelled &&
                        <Label 
                        style={{top: '-40px'}} 
                        ribbon='right' 
                        color='red' 
                        content='This exercise has been deactivated.'
                        />}
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
                <Segment>
                  <span>
                    <Icon name="clock" /> {format(event.date.toDate(), 'dddd Do MMMM' )} at{' '} 
                    {format(event.date.toDate(), 'HH:mm')} |
                    <Icon name="marker" /> {event.venue}
                  </span>
                </Segment>
                <Segment secondary>
                  <List horizontal>
                  {event.attendees && 
                    Object.values(event.attendees).map((attendee, index) => (
                   <EventListAttendee key={index} attendee={attendee} />
                  ))}

                  </List>
                </Segment>
                <Segment clearing>
                <span>{event.description}</span>
                  <Button onClick={deleteEvent(event.id)} as="a" color="red" floated="right" content="Delete" />
                  <Button as={Link} to={`/event/${event.id}`} color="black" floated="right" content="View" />
                </Segment>
              </Segment.Group>
    )
  }
}

export default EventListItem;