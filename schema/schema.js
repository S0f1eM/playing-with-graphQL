const graphql = require('graphql');
const _ = require('lodash');
const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema

} = graphql;

const users = [ 
		{ id: '23', firstName: 'Bill', age: 20 },
		{ id: '34', firstName: 'Samantha', age: 43 },
		{ id: '52', firstName: 'Bob', age: 34 }
	]

const UserType = new GraphQLObjectType({
	name: 'User',
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: {type: GraphQLInt } 
	}
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		user: {
			type: UserType,
			//args(id) require for the request to give the user type 
			args: { id: { type: GraphQLString }	},
			resolve(parentValue, args) {
				//go in the database to find the data we looking for
				return _.find(users, {id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});