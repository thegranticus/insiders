import React from 'react';
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';

const EventDetailedChat = () => {
  return (
        <div>
          <Segment
            textAlign="center"
            attached="top"
            inverted
            color="black"
            style={{ border: 'none' }}
          >
            <Header>Talk about this exercise</Header>
          </Segment>
    
          <Segment attached>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">Mike Barwis</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>Let's refilm this one ASAP with proper form.</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
    
              <Comment>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">Nick Lucius</Comment.Author>
                  <Comment.Metadata>
                    <div>Yesterday at 12:30AM</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    <p>
                      I put this exercise on everybody's corrective programs.
                    </p>
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
                <Comment.Group>
                  <Comment>
                    <Comment.Avatar src="/assets/user.png" />
                    <Comment.Content>
                      <Comment.Author as="a">Donny Vanker</Comment.Author>
                      <Comment.Metadata>
                        <div>Just now</div>
                      </Comment.Metadata>
                      <Comment.Text>Is this the correct exercise?</Comment.Text>
                      <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                      </Comment.Actions>
                    </Comment.Content>
                  </Comment>
                </Comment.Group>
              </Comment>
    
              <Comment>
                <Comment.Avatar src="/assets/user.png" />
                <Comment.Content>
                  <Comment.Author as="a">Grant Cole</Comment.Author>
                  <Comment.Metadata>
                    <div>1 year ago</div>
                  </Comment.Metadata>
                  <Comment.Text>Whaddup fam?</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action>Reply</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
    
              <Form reply>
                <Form.TextArea />
                <Button
                  content="Add Reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                />
              </Form>
            </Comment.Group>
          </Segment>
        </div>
  )
}

export default EventDetailedChat
