'use strict';

const log = require('@financial-times/n-logger').default;
const uuids = require('./uuids');
const baseUrl = require('../../lib/config').myFTURL;

module.exports=register;

function register() {
	const fetchMock = require('fetch-mock');
	getUrlMapping.forEach((mapping)=>{
		fetchMock.mock(
				mapping.matcher,
				mapping.response,
				{method:'GET'}
		);
	});

	postUrlMapping.forEach((mapping)=>{
		fetchMock.mock(
				mapping.matcher,
				mapping.response,
				{method:'POST'}
		);
	});
}

const getUrlMapping = [
	{
		matcher: `${baseUrl}/user/${uuids.validUser}/preferred/preference/email-digest`,
		response : {
			body: require('./fixtures/emailDigestPreference')
		}
	},
	{
		matcher: `${baseUrl}/user/${uuids.invalidUser}/preferred/preference/email-digest`,
		response : {
			body: null,
			status: 404
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.validLicence}/preference/email-digest/preferred/user`,
		response : {
			body: require('./fixtures/uuidArray')
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.invalidLicence}/preference/email-digest/preferred/user`,
		response : {
			body : []
		}
	},
	{
		matcher: `${baseUrl}/user/${uuids.validUser}/followed/concept`,
		response : {
			body: require('./fixtures/userFollowedConcept')
		}
	},
	{
		matcher: `${baseUrl}/group/${uuids.validLicence}/followed/concept`,
		response : {
			body: require('./fixtures/groupFollowedConcept')
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.validLicence}/member/user`,
		response : {
			body: require('./fixtures/getLicenceMembers')
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.validLicence}`,
		response : {
			body: require('./fixtures/getLicence')
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.invalidLicence}`,
		response : {
			body: null,
			status: 404
		}
	},
];

const postUrlMapping = [
	{
		matcher: `${baseUrl}/user/${uuids.validUser}/followed/concept`,
		response : {
			body: require('./fixtures/addConceptsForUserToFollow')
		}
	},
	{
		matcher: `${baseUrl}/user/${uuids.validUser}/preferred/preference`,
		response : {
			body: require('./fixtures/setPreferredPreference')
		}
	},
	{
		matcher: `${baseUrl}/license/${uuids.validLicence}/member/user`,
		response : {
			body: require('./fixtures/addUserToLicence')
		}
	},
	{
		matcher: `${baseUrl}/group/${uuids.validLicence}/followed/concept`,
		response : {
			body: require('./fixtures/addConceptsForGroupToFollow')
		}
	}
];
