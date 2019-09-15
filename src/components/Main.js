import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '../components/Tabs'
import { Link } from 'gatsby'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
require('../assets/css/tabstyles.css')

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {Blocks:"",DailyProtein:"" ,name: "", email: "", UnitsMeasured: "", goal: "", Weight: "", Height: "", Waist: "", Wrist: "", Forearm: "", Hips: "", ActivityLevel: "", message: "", LeanBodyMass: "", BodyFatWeight: "", BodyFatPerc: "" };
  }
  UnitConverter() {
    if (this.UnitsMeasured == "Metric") {
      this.setState({
        /*convert metrics to imperial for calculations */
        Weight: this.state.Weight * 2.205,
        Height: this.state.Height * 2.54,
        Waist: this.state.Waist * 2.54,
        Wrist: this.state.Wrist * 2.54,
        Forearm: this.state.Forearm * 2.54,
        Hips: this.state.Hips * 2.54,
        DailyProtein: this.state.DailyProtein * 28.3495
      })
    }
  }
  BodyFatCalc() {
    if (this.state.Gender == "Male") {
      this.state.LeanBodyMass = Math.round((this.state.Weight * 1.082) + 94.42 - this.state.Waist * 4.15)
    }
    else {
      this.state.LeanBodyMass = Math.round((this.state.Weight * 0.732) + 8.987 + this.state.Wrist / 3.140 - this.state.Waist * 0.157 - this.state.Hips * 0.249 + this.state.Forearm * 0.434)
    }
   this.state.BodyFatWeight = Math.round(this.state.Weight - this.state.LeanBodyMass)
   this.state.BodyFatPerc = Math.round((this.state.BodyFatWeight / this.state.Weight) * 100)
   this.state.DailyProtein = Math.round(this.state.LeanBodyMass * this.state.ActivityLevel)
   this.state.Blocks = Math.round(this.state.DailyProtein/7)

  }
  handleSubmit = e => {
    this.UnitConverter()
    this.BodyFatCalc()
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "frmBodyFatCalculator", ...this.state })
    }).catch(error => alert(error));
    e.preventDefault();
    e.target.reset();
  };

  HandleReset = () => {
    this.setState({
      name: "", email: "", UnitsMeasured: "", goal: "", Weight: "", Height: "", Waist: "", Wrist: "", Forearm: "", Hips: "", ActivityLevel: "", message: ""
    })
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {

    let close = <div className="close" onClick={() => { this.props.onCloseArticle() }}></div>
    const { name, email, UnitsMeasured, goal, Weight, Height, Waist, Wrist, Forearm, Hips, ActivityLevel, message } = this.state;
    return (
      <div ref={this.props.setWrapperRef} id="main" style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}>

        <article id="intro" className={`${this.props.article === 'intro' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Intro</h2>
          <span className="image main"><img src={pic01} alt="" /></span>
          <p>coming soon</p>
          {/* <Link to="/body-questionnare">Body Questionnaire</Link> */}
          {close}
        </article>

        <article id="work" className={`${this.props.article === 'work' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Body fat calculator</h2>
          <span className="image main"><img src={pic02} alt="" /></span>
          {/* Here we add a helper form for netlify to get all the fields */}
          <form name="frmBodyFatCalculator" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="text" name="name" />
            <input type="email" name="email" />
            <select name="UnitsMeasured" />
            <select name="goal" />
            <input name="Weight" />
            <input name="Height" />
            <input name="Waist" />
            <input name="Wrist" />
            <input name="Forearm" />
            <input name="Hips" />
            <input name="ActivityLevel" />
            <textarea name="message"></textarea>
          </form>
          <form onSubmit={this.handleSubmit} data-netlify-recaptcha="true">
            <div className="field half first">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required value={name} onChange={this.handleChange} placeholder="Name" />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required value={email} onChange={this.handleChange} placeholder="name@example.com" />
            </div>
            <div className="field half first">
              <label htmlFor="UnitsMeasured">Units Measured In</label>
              <select name="UnitsMeasured" id="UnitsMeasured" required value={UnitsMeasured} onChange={this.handleChange}>
                <option>...</option>
                <option>Metrics</option>
                <option>Imperial</option>
              </select>
            </div>
            <div className="field half">
              <label htmlFor="goal">Your Goal</label>
              <select name="goal" id="goal" required value={goal} onChange={this.handleChange}>
                <option>...</option>
                <option>Weight loss - out with the old in with the new</option>
                <option>Maintain weight - change to a healthier lifestyle</option>
                <option>Gain weight - add some muscle </option>
              </select>
            </div>
            <div className="field half first">
              <label htmlFor="Weight">Weight</label>
              <input type="text" name="Weight" id="Weight" placeholder="Enter weight" required value={Weight} onChange={this.handleChange} />
            </div>
            <div className="field half">
              <label htmlFor="Height">Height</label>
              <input type="text" name="Height" id="Height" placeholder="Enter height, remove shoes" required value={Height} onChange={this.handleChange} />
            </div>
            <div>
              <Tabs>
                <div label="Male">
                  <div className="field half first">
                    <label htmlFor="Waist">Waist</label>
                    <input type="text" name="Waist" id="Waist" placeholder="Measure at the belly button" required value={Waist} onChange={this.handleChange} />
                  </div>
                  <div className="field half">
                    <label htmlFor="Wrist">Wrist</label>
                    <input type="text" name="Wrist" id="Wrist" placeholder="Measure your dominant hand" required value={Wrist} onChange={this.handleChange} />
                  </div>
                </div>
                <div label="Female">
                  <div className="field half first">
                    <label htmlFor="Forearm">Forearm</label>
                    <input type="text" name="Forearm" id="Forearm" placeholder="Measure at the belly button" required value={Forearm} onChange={this.handleChange} />
                  </div>
                  <div className="field half">
                    <label htmlFor="Hips">Hips</label>
                    <input type="text" name="Hips" id="Hips" placeholder="Measure at widest point" required value={Hips} onChange={this.handleChange} />
                  </div>
                </div>
              </Tabs>
            </div>
            <div className="field">
              <label htmlFor="ActivityLevel">Activity Factor</label>
              <select name="ActivityLevel" id="ActivityLevel" required value={ActivityLevel} onChange={this.handleChange}>
                <option>...</option>
                <option value="0.5">Sedentary - No formal sports activity or training</option>
                <option value="0.6">Light - Light fitness training, such as walking</option>
                <option value="0.7">Moderate - Fitness training 3 times/week or sports activity</option>
                <option value="0.8">Active - Daily aerobic training or moderate weight training</option>
                <option value="0.9">Very Active - Heavy daily weights</option>
                <option value="1.0">Elite Athlete - Heavy daily weights and intense sports training</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="message">Anything else you want us to know</label>
              <textarea name="message" id="message" rows="4" placeholder="Add your allergies, food dislikes and favourite foods here" value={message} onChange={this.handleChange} ></textarea>
            </div>
            <ul className="actions">
              <li><input type="submit" value="Submit" className="special" /></li>
              <li><input type="reset" value="Reset" onClick={this.HandleReset} /></li>
            </ul>
          </form>
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
          <form name="contact" method="post" data-netlify="true" data-netlify-honeypot="bot-field" data-netlify-recaptcha="true">
            <input type="hidden" name="form-name" value="contact" />
            <div className="field half first">
              <label htmlFor="name">Fullname</label>
              <input type="text" name="name" id="name" required />
            </div>
            <div className="field half">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="4"></textarea>
            </div>
            <div data-netlify-recaptcha="true"></div>
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

        <article id="result" className={`${this.props.article === 'result' ? 'active' : ''} ${this.props.articleTimeout ? 'timeout' : ''}`} style={{ display: 'none' }}>
          <h2 className="major">Result</h2>
          {/* <span className="image main"><img src={pic03} alt="" /></span> */}

          <p>coming soon</p>
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