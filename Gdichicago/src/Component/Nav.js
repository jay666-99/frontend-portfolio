import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Nav extends Component {
  render() {
    return(
    <div id="sidebar">
		<ul>
			<li><Link to="/">The Basics</Link></li>
      <li><Link to="/TypeOfClimp">Types of Climbing</Link></li>
      <li><Link to="/Safety">Safety</Link></li>
      <li><Link to="/Equipment">Equipment</Link></li>
      <li><Link to="/WhereToClimp">Where to Climb</Link></li>
		</ul>
	</div>
   );
  }
}

export default Nav;
