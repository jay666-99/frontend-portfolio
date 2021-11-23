import React, { Component } from 'react';

class Basics extends Component {
  render() {
		return(
    <div id="main">
		<h2 id="Basics">The Basics</h2>
		<img className="alignleft" src="https://www.bing.com/images/blob?bcid=Tlbs8znVtH8Dqw" alt="A woman bouldering" />
		<p>Are you thinking about trying <a href="https://en.wikipedia.org/wiki/Rock_climbing" target="_blank" rel="noopener noreferrer"> rock climbing?</a> Climbing is a fun and challenging sport that has a surge of popularity in recent years. Almost anyone can climb: you don't need a high level of strength or fitness to get started. Gear is available for men, women, and children of all shapes and sizes, and most gyms will allow children as young as three to climb. Climbing is not about brute force. Climbing more difficult routes does take some strength, mostly in your legs and hands, but it also takes skill and problem-solving ability.</p>
		<p>Oh, and it is okay if you are afraid of heights. Really. Just keep your eyes on the wall.</p>
	</div>
		);
  }
}

export default Basics;
