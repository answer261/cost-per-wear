import React from 'react';
import render from 'react-dom';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import {Router, Route, IndexRoute, Link} from 'react-router'

class App extends React.Component {
	render () {
		return <div>{this.props.children}</div>;
	}
}

class Groups extends React.Component {
	render () {
    	return (
	    	<div>
		    	<p>Groups</p>
		    	<Link to='users'>Users</Link>
	    	</div>
   		);
	}
}

class Users extends React.Component {
	render () {
    	return (
	    	<div>
		    	<p>Users</p>
		    	<Link to='groups'>Groups</Link>
	    	</div>
    	);
	}
}

ReactDOM.render (( 
 <Router history={browserHistory} >
    <Route path="/" component={App}>
    	<IndexRoute component={Groups}/>
      	<Route path="groups" component={Groups} />
      	<Route path="users" component={Users} />
    </Route>
 </Router> 
), document.getElementById('app'));
