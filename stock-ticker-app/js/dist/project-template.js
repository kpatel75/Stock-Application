(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['project'] = template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4=container.escapeExpression;

  return "    <div class=\"col-md-6 col-lg-4 p-3\">\r\n        <div class=\"card shadow\">\r\n            <div class=\"card-header\">"
    + alias4((helpers.dateFormatted||(depth0 && depth0.dateFormatted)||alias3).call(alias2,((stack1 = blockParams[0][0]) != null ? stack1.date : stack1),{"name":"dateFormatted","hash":{},"data":data,"blockParams":blockParams}))
    + "</div>\r\n            <ul class=\"list-group list-group-flush\">\r\n                <li class=\"list-group-item\"><span>Open Price: </span>"
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,((stack1 = blockParams[0][0]) != null ? stack1.open : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n                <li class=\"list-group-item\"><span>Close Price: </span>"
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,((stack1 = blockParams[0][0]) != null ? stack1.close : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n                <li class=\"list-group-item\"><span>Highest Price: </span>"
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,((stack1 = blockParams[0][0]) != null ? stack1.high : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n                <li class=\"list-group-item\"><span>Lowest Price: </span>"
    + alias4((helpers.currency||(depth0 && depth0.currency)||alias3).call(alias2,((stack1 = blockParams[0][0]) != null ? stack1.low : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n                <li class=\"list-group-item\"><span>Volume: </span>"
    + alias4(container.lambda(((stack1 = blockParams[0][0]) != null ? stack1.volume : stack1), depth0))
    + "</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.propertyIsEnumerable, alias2=container.lambda, alias3=container.escapeExpression, alias4=depth0 != null ? depth0 : (container.nullContext || {}), alias5=container.hooks.helperMissing;

  return "<div class=\"col-md-12 p3\">\r\n    <ul class=\"list-group border border-primary list-group-horizontal-md\">\r\n        <li class=\"list-group-item h3\"><span>Symbol</span> "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.metaData : depth0)) != null ? stack1.symbol : stack1), depth0))
    + "</li>\r\n        <li class=\"list-group-item\"><span>Fetch Info</span> "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.metaData : depth0)) != null ? stack1.information : stack1), depth0))
    + " for the last "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.metaData : depth0)) != null ? stack1.numOfDays : stack1), depth0))
    + " days</li>\r\n        <li class=\"list-group-item\"><span>Last Refreshed</span> "
    + alias3((helpers.dateFormatted||(depth0 && depth0.dateFormatted)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.metaData : depth0)) != null ? stack1.lastRefreshed : stack1),{"name":"dateFormatted","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n    </ul>\r\n</div>\r\n\r\n<div class=\"col-md-12 p-3\">\r\n    <div class=\"card shadow\">\r\n        <div class=\"card-header\">Current Day "
    + alias3((helpers.dateFormatted||(depth0 && depth0.dateFormatted)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.date : stack1),{"name":"dateFormatted","hash":{},"data":data,"blockParams":blockParams}))
    + "</div>\r\n        <ul class=\"list-group list-group-horizontal-md\">\r\n            <li class=\"list-group-item\"><span>Open Price: </span>"
    + alias3((helpers.currency||(depth0 && depth0.currency)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.open : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n            <li class=\"list-group-item\"><span>Close Price: </span>"
    + alias3((helpers.currency||(depth0 && depth0.currency)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.close : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n            <li class=\"list-group-item\"><span>Highest Price: </span>"
    + alias3((helpers.currency||(depth0 && depth0.currency)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.high : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n            <li class=\"list-group-item\"><span>Lowest Price: </span>"
    + alias3((helpers.currency||(depth0 && depth0.currency)||alias5).call(alias4,((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.low : stack1),{"name":"currency","hash":{},"data":data,"blockParams":blockParams}))
    + "</li>\r\n            <li class=\"list-group-item\"><span>Volume: </span>"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.currentDay : depth0)) != null ? stack1.volume : stack1), depth0))
    + "</li>\r\n        </ul>\r\n    </div>\r\n</div>\r\n\r\n"
    + ((stack1 = helpers.each.call(alias4,(depth0 != null ? depth0.currentFiveDays : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 1, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useBlockParams":true});
})();