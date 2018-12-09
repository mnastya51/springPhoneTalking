package com.mkyong.web.controller;

import com.google.gson.Gson;
import com.mkyong.web.dao.DaoCity;
import com.mkyong.web.models.City;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CityController {
//    @CrossOrigin(origins = "http://localhost:3000/")
    @RequestMapping(value = "/getCities", method = RequestMethod.GET)
    public String getCities() {
        List<City> list = DaoCity.getCityFromDao();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addCity", params = "cityname", method = RequestMethod.GET)
    public Boolean addCity(@RequestParam("cityname") String cityname) {
        return DaoCity.insertCityToDao(cityname);
    }
}