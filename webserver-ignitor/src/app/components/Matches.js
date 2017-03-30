import React, {Component} from 'react';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import styles from '../Styles';

/**
 * Static Component
 * - has less methods than dynamic react component
 *
 * https://facebook.github.io/react/docs/react-component.html
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Matches = ( props ) =>
{
	const matches = props.matches;

	console.log( 'LOG:Matches:Matches' );
	console.log( matches );

	return (
		<div>
			{ matches.length > 0 && matches.map( ( result ) =>
			{
				const photos = result.photos;
				console.log( result );

				return (
					<Card key={result._id} style={styles.card}>
						<CardTitle title={result.name} />
						<CardMedia>
							<img src={photos[0].url} />
						</CardMedia>
					</Card>
				);
			} ) }
		</div>
	);
};

export default Matches;
