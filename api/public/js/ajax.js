$(document).ready(function(){
	getGeoDate();
});

$('#country').on('change', function(){
        $('#area').find('option').remove();
        $('#district').find('option').remove();
        $('#city').find('option').remove();
        getGeoDate();
});

$('#area').on('change', function(){
        $('#district').find('option').remove();
        getDistrict();
        if(!districtExist){
                $('#city').find('option').remove();
                getCitiesFromArea();
        }
});

$('#district').on('change', function(){
        $('#city').find('option').remove();
        getCitiesFromDistrict();
});

$('.form__button').on('click', function(event){
        event.preventDefault(); 
        var city_select = $('#city option:selected').val();
        var country_select = $('#country option:selected').val();
        var url = 'weather/' + city_select + ',' + country_select.toLowerCase();
        location.replace(url);
});

var districtExist = true;

function getGeoDate(){
	var country = $('#country option:selected').val();
	$.ajax({
		url : '/geo/area',
		type : 'GET',
                crossDomain: true,
                data : {
        	       country : country
                },
                success: function(response){
        	       var area = $('#area');
        	       delete response.limit;
		       delete response.balans;
                       console.log(response);
        	       var arr = Object.values(response);
        	       for(var i =0; i < arr.length; i++){
        		      area.append('<option value=' + arr[i].id + '>' + arr[i].name + '</option>')
        	       }
                },
                error: function(error){
        	       console.log(error);
                },
                complete: function(){
        	       getDistrict();
                }
	});
}

function getDistrict(){
	var area_rajon = $('#area option:selected').val();
        $.ajax({
                url : '/geo/district',
		type : 'GET',
        	crossDomain: true,
        	data : {
        		area_rajon : area_rajon
        	},
        	success: function(response){
        		var district = $('#district');
        		delete response.limit;
			delete response.balans;
        		var arr = Object.values(response);
        		if(arr.length === 1){
        			district.append('<option value=0>Нет районов</option>');
        			districtExist = false;
        		}
        		else{
        		      for(var i =0; i < arr.length; i++){
        				district.append('<option value=' + arr[i].id + '>' + arr[i].name + '</option>');
        			}
        		}
        			
        	},
        	error: function(error){
        		console.log(error);
        	},
        	complete: function(){
        		if(districtExist){
        			getCitiesFromDistrict();
        		}
        		else{
        			getCitiesFromArea();
        		}
        	}
        });
}

function getCitiesFromDistrict(){
        var rajon_city = $('#district option:selected').val();
        $.ajax({
                url : '/geo/district/city',
                type : 'GET',
                crossDomain: true,
                data : {
                        rajon_city : rajon_city
                },
                success: function(response){
                        var city = $('#city');
                        delete response.limit;
                        delete response.balans;
                        var arr = Object.values(response);
                        for(var i =0; i < arr.length; i++){
                                city.append('<option value=' + arr[i].english + '>' + arr[i].name + '</option>');
                        }                   
                },
                error: function(error){
                        console.log(error);
                }
        });
}

function getCitiesFromArea(){
	var area = $('#area option:selected').val();
        $.ajax({
                url : '/geo/area/city',
                type : 'GET',
                crossDomain: true,
                data : {
                        area : area
                },
                success: function(response){
                        var city = $('#city');
                        delete response.limit;
                        delete response.balans;
                        var arr = Object.values(response);
                        for(var i =0; i < arr.length; i++){
                                city.append('<option value=' + arr[i].english + '>' + arr[i].name + '</option>');
                        }                   
                },
                error: function(error){
                        console.log(error);
                }
        });
}