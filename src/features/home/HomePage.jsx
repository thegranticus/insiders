import React from 'react'

const HomePage = ({history}) => {
  return (
    <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1 className="ui inverted stackable header">
            <img
              src="/assets/logofull.png"
              alt="BARWIS"
            />
          </h1>
          <h2>GRIT. SCIENCE. FAMILY.</h2>
          <div onClick={() => history.push('/events')} className="ui huge white inverted button">
            Get Started
                <i className="right arrow icon" />
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        Design by Grant Cole
      </div>
    </div>
  )
}

export default HomePage
