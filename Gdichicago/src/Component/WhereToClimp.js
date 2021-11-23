import React, { Component } from 'react';

class WhereToClimp extends Component {
  render() {
		return(
    <div id="main">
		<h3 id="where">Where to Climb in the Triangle</h3>
		<p>If you are new to climbing, the <a href="http://www.meetup.com/RaleighRockClimbing/">Raleigh Rock Climbing Meetup</a> is a great place to start. They are a friendly group of climbers who organize regular outings to the local gym. Generally, you'll get a group discount on admission. You also get patient instructors who enjoy teaching new climbers.</p>
		<p>If you prefer a more structured learning experience, many gyms offer classes for beginners.</p>
		<ul>
			<li><a href="http://www.townofchapelhill.org/index.aspx?page=813">Chapel Hill Community Center</a></li>
			<li><a href="http://www.trianglerockclub.com/">Triangle Rock Club</a></li>
			<li><a href="http://lifetimefitness.mylt.com/community/rock-climbing/">Lifetime Fitness (Cary)</a></li>
			<li><a href="http://www.nextclimb.com">NextClimb</a></li>
			<li><a href="http://recreation.duke.edu/facilities/climbing-wall/">Duke Climbing Wall</a> (Students and Faculty only)</li>
		</ul>
	</div>
   );
  }
}

export default WhereToClimp;
