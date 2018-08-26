const router = require('express').Router();
const getSpecializations = require('../controllers/doctors').getSpecializations;
const getClinicsByLocation = require('../controllers/clinics').getClinicsByLocation
const catchErrors = require('../handlers/errorHandlers').catchErrors;


router.get('/', catchErrors(async (req, res) => {
	var specializations = await getSpecializations(req, res);
	var locations = await getClinicsByLocation(req, res); 

	res.render('index', { 
		specializationsData: { data: specializations, dataOptions: { baseUrl: '/doctors', filterQuery: '?department=', filterProperty: 'id', labelProperty: 'name', badgeProperty: 'count' }}, 
		locationsData: { data: locations.clinicsGroups, dataOptions: { baseUrl: '/clinics', filterQuery: '?country=', filterProperty: 'countryCode', labelProperty: 'countryName', badgeProperty: 'count' }},
		locations: locations.locations
	})
}));
router.use('/doctors', require('./doctors'));
router.use('/clinics', require('./clinics'));
router.use('/services', require('./services'));
router.use('/pharmacies', require('./pharmacies'));
router.use('/drugs', require('./drugs'));
router.use('/foundation', require('./foundation'));
router.post('/search', async (req, res) => {
	const {category, search} = req.body;
	switch(category.toLowerCase()){
		case 'doctors':
		case 'clinics':
			res.redirect(`/${category}?name=${search}`);
			return;
		default:
			res.render('index');
			return;
	}
});
router.use('/auth', require('./auth'));
router.use('/book', require('./booking'));
router.use('/', require('./pages'));

module.exports = router;