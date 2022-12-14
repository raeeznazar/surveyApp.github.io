const BASE_URL = 'https://api-beta.s-er.co';

export const environment = {
  production: true,
  LOGIN_API: BASE_URL + '/api/v1/login/',
  USERS_API: BASE_URL + '/api/v1/users/',
  DROP_DOWN_LOCATION_API: BASE_URL + '/api/v1/hospitaldropdown/',
  DROP_DOWN_LOCATION_DEPARTMENT: BASE_URL + '/api/v1/departmentdropdown/',

  // survey API
  SURVEYS_API: BASE_URL + '/api/v1/surveydefinitions/',
  SURVEY_TYPE_API: BASE_URL + '/api/v1/surveytype/',

  SURVEY_QUESTIONS_API: BASE_URL + '/api/v1/surveyquestions/',

  //questions API
  QUESTIONS_API: BASE_URL + '/api/v1/questions/',

  //Delete question API
  QUESTIONS_DELETE_API: BASE_URL + '/api/v1/questions/',

  //languages AP1
  LANGUAGES_API: BASE_URL + '/api/v1/languages/',

  //roles API

  ROLES_API: BASE_URL + '/api/v1/roles/',

  //levels AP1
  LEVELS_API: BASE_URL + '/api/v1/levels/',

  //ageSurvey

  AGE_API: BASE_URL + '/api/v1/agegroups/',

  //take survey Questions

  TAKE_SURVEY_QUESTIONS_API: BASE_URL + '/api/v1/surveys/',
  // posting servey
  SURVEY_REPLAY_POST : BASE_URL + '/api/v1/surveyreply/',
};
