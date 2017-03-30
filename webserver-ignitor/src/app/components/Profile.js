// import React, { Component } from 'react';
// import { Drawer } from 'material-ui/Drawer';
// import styles from '../Styles';
//
// /**
//  * Static Component
//  * - has less methods than dynamic react component
//  *
//  * https://facebook.github.io/react/docs/react-component.html
//  *
//  * @param props
//  * @returns {XML}
//  * @constructor
//  */
// const Profile = ( props ) =>
// {
// 	const profile = props.profile;
//
// 	console.log( 'LOG:Profile:Profile' );
// 	console.log( profile );
//
// 	return (
// 		<div>
// 			{ profile.length > 0 && profile.map( ( result ) =>
//   			{
//   				const user = result.user;
//   				console.log( result );
//
//   				return (
//   					<Drawer
//                         openSecondary={true}
//                         width={300}>
//   						<className={user.name} />
//   					</Drawer>
//   				);
//   			} )
//       }
// 		</div>
// 	);
// };
//
// export default Profile;
