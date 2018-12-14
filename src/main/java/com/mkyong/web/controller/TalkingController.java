package com.mkyong.web.controller;
import com.google.gson.Gson;
import com.mkyong.web.dao.DaoTalking;
import com.mkyong.web.models.Talking;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TalkingController {
    @RequestMapping(value = "/getTalking", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String getTalking() {
        List<Talking> list = DaoTalking.getTalking();
        return list != null ? new Gson().toJson(list) : null;
    }

    @RequestMapping(value = "/addTalking", params = {"cost", "cityid", "talktime", "kolmin", "abonentid"}, method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String addTalking(@RequestParam("cost") String cost,
                              @RequestParam("cityid") String cityid,
                             @RequestParam("talktime") String period,
                             @RequestParam("kolmin") String kolmin,
                             @RequestParam("abonentid") String abonentid) {
        return DaoTalking.insertTalking(cost, cityid, abonentid, period, Integer.valueOf(kolmin)).toString();
    }

    @RequestMapping(value = "/editTalking", params = {"cost", "cityid", "talktime", "kolmin", "abonentid", "talkid"}, method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String updateTalking(@RequestParam("cost") String cost,
                                 @RequestParam("cityid") String cityid,
                                 @RequestParam("talktime") String period,
                                @RequestParam("kolmin") String kolmin,
                                @RequestParam("abonentid") String abonentid,
                                @RequestParam("talkid") String talkid) {
        return DaoTalking.updateTalking(cost, cityid, abonentid, period, Integer.valueOf(kolmin), Integer.valueOf(talkid)).toString();
    }

    @RequestMapping(value = "/deleteTalking", params = "talkid", method = RequestMethod.GET, produces = "text/plain;charset=UTF-8")
    public String deletTalking(@RequestParam("talkid") String talkingid) {
        return DaoTalking.deleteTalking(Integer.valueOf(talkingid)).toString();
    }
}