import { FETCH_ABOUT_US_REQUESTED, FETCH_ABOUT_US_SUCCEEDED, FETCH_ABOUT_US_FAILED } from './types';

export const fetchAboutUsRequested = () => ({
	type: FETCH_ABOUT_US_REQUESTED
});

export const fetchAboutUsSucceeded = aboutData => ({
	type: FETCH_ABOUT_US_SUCCEEDED,
	aboutData
});

export const fetchAboutUsFailed = error => ({
	type: FETCH_ABOUT_US_FAILED,
	error
});
