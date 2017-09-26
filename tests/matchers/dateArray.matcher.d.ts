declare namespace jasmine {
	interface Matchers<T> {
		toBeDateArray(actual: Array<Date>): jasmine.CustomMatcher;
	}
}