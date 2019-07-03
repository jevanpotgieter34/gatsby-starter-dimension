import React from 'react'
import PropTypes from 'prop-types'
import Tabs from './Tabs'
import Tab from './Tab'

import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
require('../assets/css/tabstyles.css')
class Main extends React.Component {
  render() {

    let close = <div className="close" onClick={() => { this.props.onCloseArticle() }}></div>

    return (
      <div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Intro</h2>
          <span className="image main"><img src={pic01} alt="" /></span>
          <p>coming soon</p>
          {close}
        </article>

        <article id="work" className={`${this.props.article === 'work' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Work</h2>
          <span className="image main"><img src={pic02} alt="" /></span>
          <p>coming soon</p>
          {close}
        </article>

        <article id="about" className={`${this.props.article === 'about' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">About</h2>
          <span className="image main"><img src={pic03} alt="" /></span>
          <p>coming soon</p>
          {close}
        </article>

        <article id="contact" className={`${this.props.article === 'contact' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Contact</h2>
          <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field">
            <input type="hidden" name="form-name" value="contact" />
            <div className="field half first">
              <label htmlFor="name">Fullname</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required/>
            </div>
            <h2>Your Body Detail</h2>

            <div>
              <Tabs>
                <div label="Male">
                  <div className="field half first">
                    <label htmlFor="WeightMale">Weight</label>
                    <input type="text" name="WeightMale" id="WeightMale" placeholder="Enter weight" />
                  </div>
                  <div className="field half">
                    <label htmlFor="HeightMale">Height</label>
                    <input type="text" name="HeightMale" id="HeightMale" placeholder="Enter height, remove shoes" />
                  </div>
                  <div className="field half first">
                    <label htmlFor="MaleBFactor1">Waist</label>
                    <input type="text" name="MaleBFactor1" id="MaleBFactor1" placeholder="Measure at the belly button" />
                  </div>
                  <div className="field half">
                    <label htmlFor="MaleBFactor2">Wrist</label>
                    <input type="text" name="MaleBFactor2" id="MaleBFactor2" placeholder="Measure your dominant hand"/>
                  </div>
                </div>
                <div label="Female">
                  <div className="field half first">
                    <label htmlFor="WeightFemale">Weight</label>
                    <input type="text" name="WeightFemale" id="WeightFemale" placeholder="Enter weight" />
                  </div>
                  <div className="field half">
                    <label htmlFor="HeightFemale">Height</label>
                    <input type="text" name="HeightFemale" id="HeightFemale" placeholder="Enter height, remove shoes" />
                  </div>
                  <div className="field half first">
                    <label htmlFor="FemaleBFactor1">Abdomen</label>
                    <input type="text" name="FemaleBFactor1" id="FemaleBFactor1" placeholder="Measure in cm at the belly button" />
                  </div>
                  <div className="field half">
                    <label htmlFor="FemaleBFactor2">Hips</label>
                    <input type="text" name="FemaleBFactor2" id="FemaleBFactor2" placeholder="Measure at widest point in cm" />
                  </div>
                </div>
              </Tabs>
            </div>
            <div className="field">
            <label htmlFor="ActivityFactor">Activity Factor</label>
                    <select name="ActivityFactor" id="ActivityFactor">
                      <option>Sedentary - No formal sports activity or training</option>
                      <option>Light - Light fitness training, such as walking</option>
                      <option>Moderate - Fitness training 3 times/week or sports activity</option>
                      <option>Active - Daily aerobic training or moderate weight training</option>
                      <option>Very Active - Heavy daily weights</option>
                      <option>Elite Athlete - Heavy daily weights and intense sports training</option>
                    </select>
               </div>
               <div className="field">
            <label htmlFor="UnitsMeasured">Units Measured In</label>
                    <select name="UnitsMeasured" id="UnitsMeasured">
                      <option>Metrics</option>
                      <option>Imperial</option>
                    </select>
               </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <ul className="actions">
              <li><input type="submit" value="Send Message" className="special" /></li>
              <li><input type="reset" value="Reset" /></li>
            </ul>
          </form>
          {/* <ul className="icons">
            <li><a href="#" className="icon fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="#" className="icon fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="#" className="icon fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="#" className="icon fa-github"><span className="label">GitHub</span></a></li>
          </ul> */}
          {close}
        </article>

      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main