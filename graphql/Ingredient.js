const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString } = graphql
const SpecType = require('./Spec');

module.exports = new GraphQLObjectType({
	name: 'Ingredient',
	fields: () => ({
		id: {
			type: GraphQLString
		},
		name: {
			type: GraphQLString
		},
		type: {
			type: GraphQLString
		},
		description: {
			type: GraphQLString
		},
		spec: {
			type: SpecType,
			resolve(parentValue, args) {
				return {}
			}
		}
	})
})
