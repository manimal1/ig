/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component} from 'react';

/**
 * Services
 */
import Tinder from './services/tinder';

/**
 * Colors / Styles
 */
import {deepOrange500} from 'material-ui/styles/colors';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * Components
 */
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import { FlatButton, RaisedButton } from 'material-ui';
import { Tabs, Tab } from 'material-ui/Tabs';
import Drawer from 'material-ui/Drawer';

/**
 * Custom Components
 */
import styles from './Styles';
import Matches from './components/Matches';
import Profile from './components/Profile';

const muiTheme = getMuiTheme( darkBaseTheme );

class Main extends Component {
	constructor( props, context ) {
		super( props, context );

		this.state = {
			open: false,
			tinder : {
				matches : [],
				profile : {}
			},
			query : {}
		};
	}

	handleRequestClose = () => {
		this.setState( {
			open: false,
		} );
	}

	handleTouchTap = () => {
		this.setState( {
			open: true,
		} );
	}

	handleGetProfile = () => {
		Tinder.Profile().then( ( result ) => this.setState( { tinder: { profile : result } } ) );
	}

	handleGetMatches = () => {
		Tinder.Matches().then( ( result ) => this.setState( { tinder: { matches : result } } ) );
	}

	handleTestAction = ( query ) => {
		Tinder.Test( query ).then( ( result ) => this.setState( { query: result } ) );
	}

	render() {
		const standardActions = (
			<FlatButton
				label="Ok"
				primary={true}
				onTouchTap={this.handleRequestClose}
			/>
		);

		console.log( 'LOG:Main.state' );
		console.log( this.state );
		console.log( 'LOG:Main.props' );
		console.log( this.props );
		const matches = this.state.tinder.matches;
		const profile = this.state.tinder.profile;


		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div style={styles.container}>
					<AppBar title="Ignitor" style={styles.appBar}>
					</AppBar>
					<Dialog
						open={this.state.open}
						title="Super Secret Password"
						actions={standardActions}
						onRequestClose={this.handleRequestClose}
					>
						1-2-3-4-5
					</Dialog>
					<h1>Ignitor</h1>
					<h2>Your Tinder Toolbox to make tinder pleasant again</h2>
					{/*<RaisedButton*/}
						{/*label="Super Secret Password"*/}
						{/*secondary={true}*/}
						{/*onTouchTap={this.handleTouchTap}*/}
					{/*/>*/}
					<RaisedButton
						label="Get Profile"
						secondary={true}
						onTouchTap={this.handleGetProfile}
					/>

					<RaisedButton
						label="Get Matches"
						secondary={true}
						onTouchTap={this.handleGetMatches}
					/>

					<RaisedButton
						label="Test Groups"
						secondary={true}
						onTouchTap={this.handleTestAction.bind( 'Groups') }
					/>

					<Matches matches={matches} />

					<Tabs style={styles.tabs}>
						<Tab style={styles.tab} label='Profile'/>
						<Tab style={styles.tab} label='Messages'/>
						<Tab style={styles.tab} label='Groups'/>
					</Tabs>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default Main;
