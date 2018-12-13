package com.mkyong.web.controller;

import com.google.gson.Gson;
import com.mkyong.web.dao.DaoCity;
import com.mkyong.web.models.City;
import org.apache.commons.lang.StringEscapeUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CityController {
    //    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/getCities", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String getCities() {
        List<City> list = DaoCity.getCityFromDao();
        if (list != null)
            for (City city : list) {
                city.setCityname(city.getCityname());
            }
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addCity", params = "cityname", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String addCity(@RequestParam("cityname") String cityname) {
        return DaoCity.insertCityToDao(StringEscapeUtils.unescapeHtml(cityname)).toString();
    }

    @RequestMapping(value = "/deleteCity", params = "cityid", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String deleteCity(@RequestParam("cityid") String cityId) {
        return DaoCity.deleteCity(Integer.valueOf(cityId)).toString();
    }
}