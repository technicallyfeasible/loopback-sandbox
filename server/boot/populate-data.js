module.exports = function(app) {
  var countries = [
    {"id":"de", "name":"Germany"},
    {"id":"uk", "name":"United Kingdom"}
  ];
  var companies = [
    { "id":"comp1", "title": "test1", "countries": ["de", "uk"] },
    { "id":"comp2", "title": "test2", "countries": ["uk"] },
    { "id":"comp3", "title": "test3", "countries": []}
  ];

  var Country = app.models.Country;
  var Company = app.models.Company;

  var createCompany = function(comp) {
    Company.create(comp, function(err, company) {
      if (err) console.log(err);
      else console.log(company);
      for (var j = 0; j < comp.countries.length; j++) {
        var link = company.countries.build({"countryId":comp.countries[j]});
        link.save(function(err, l){
          if (err) console.log(err);
          else console.log(l);
        });
      }
    });
  };

  Country.create(countries, function(err, countries_result) {
    if (err) console.log(err);
    else {
      for (var i = 0; i < companies.length; i++) {
        createCompany(companies[i]);
      }
    }
  });

};
