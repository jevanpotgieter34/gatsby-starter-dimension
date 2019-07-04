import React from 'react'
import { Link } from 'gatsby'
import Tabs from '../components/Tabs'
import Tab from '../components/Tab'
import Footer from '../components/Footer'
import Layout from '../components/layout'

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class SecondPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", UnitsMeasured: "", goal: "", Weight: "", Height: "", Waist: "", Wrist: "", Abdomen: "", Hips: "", ActivityLevel: "", message: "" };
  }

  /* Here’s the juicy bit for posting the form submission */

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "frmBodyFatCalculator", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
    e.target.reset();
  };
  
  HandleReset = () =>{
    this.setState({
      name: "", email: "", UnitsMeasured: "", goal: "", Weight: "", Height: "", Waist: "", Wrist: "", Abdomen: "", Hips: "", ActivityLevel: "", message: "" 
    })
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    const { name, email, UnitsMeasured, goal, Weight, Height, Waist, Wrist, Abdomen, Hips, ActivityLevel, message } = this.state;
    return (
      <Layout >
        <div >
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
            <input name="Abdomen" />
            <input name="Hips" />
            <input name="ActivityLevel" />
            <textarea name="message"></textarea>
          </form>
          <div id="wrapper">
            <div id="body">
            </div>
            <h2 className="major">Your details</h2>
            <form onSubmit={this.handleSubmit}  data-netlify-recaptcha="true">
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
                <input type="text" name="Weight" id="Weight" placeholder="Enter weight" required value={Weight} onChange={this.handleChange}/>
              </div>
              <div className="field half">
                <label htmlFor="Height">Height</label>
                <input type="text" name="Height" id="Height" placeholder="Enter height, remove shoes" required value={Height} onChange={this.handleChange}/>
              </div>
              <div>
                <Tabs>
                  <div label="Male">
                    <div className="field half first">
                      <label htmlFor="Waist">Waist</label>
                      <input type="text" name="Waist" id="Waist" placeholder="Measure at the belly button" required value={Waist} onChange={this.handleChange}/>
                    </div>
                    <div className="field half">
                      <label htmlFor="Wrist">Wrist</label>
                      <input type="text" name="Wrist" id="Wrist" placeholder="Measure your dominant hand" required value={Wrist} onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div label="Female">
                    <div className="field half first">
                      <label htmlFor="Abdomen">Abdomen</label>
                      <input type="text" name="Abdomen" id="Abdomen" placeholder="Measure at the belly button" required value={Abdomen} onChange={this.handleChange}/>
                    </div>
                    <div className="field half">
                      <label htmlFor="Hips">Hips</label>
                      <input type="text" name="Hips" id="Hips" placeholder="Measure at widest point" required value={Hips} onChange={this.handleChange}/>
                    </div>
                  </div>
                </Tabs>
              </div>
              <div className="field">
                <label htmlFor="ActivityLevel">Activity Factor</label>
                <select name="ActivityLevel" id="ActivityLevel" required value={ActivityLevel} onChange={this.handleChange}>
                <option>...</option>
                  <option>Sedentary - No formal sports activity or training</option>
                  <option>Light - Light fitness training, such as walking</option>
                  <option>Moderate - Fitness training 3 times/week or sports activity</option>
                  <option>Active - Daily aerobic training or moderate weight training</option>
                  <option>Very Active - Heavy daily weights</option>
                  <option>Elite Athlete - Heavy daily weights and intense sports training</option>
                </select>
              </div>

              <div className="field">
                <label htmlFor="message">Anything else you want us to know</label>
                <textarea name="message" id="message" rows="4" placeholder="Add your allergies, food dislikes and favourite foods here" value={message} onChange={this.handleChange} ></textarea>
              </div>
              <ul className="actions">
                <li><input type="submit" value="Send Message" className="special" /></li>
                <li><input type="reset" value="Reset" onClick={this.HandleReset}/></li>
              </ul>
            </form>
            {/* <Footer/> */}
          </div>
          {/* <div id="bg"></div> */}
        </div>
      </Layout>
    );
  }
}


export default SecondPage
