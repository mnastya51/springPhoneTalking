package com.mkyong.web.controller;

import com.mkyong.web.dao.DaoUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RegisterController {

    @RequestMapping(value = {"/register" }, method = RequestMethod.GET)
    public ModelAndView goToRegister() {
        ModelAndView model = new ModelAndView();

        model.setViewName("register");

        return model;
    }

    @RequestMapping(value = {"/register" }, method = RequestMethod.POST)
    public ModelAndView checkLogin(@RequestParam(value = "error", required = false) String error,
                                   @RequestParam String username,
                             @RequestParam String password) {
        ModelAndView model = new ModelAndView();
        try{
            DaoUser.insertUserFromDao(username, password);
//            model.setViewName("login");
            model.addObject("register", "User register");
        }
        catch (Exception e){
            model.setViewName("register");
            model.addObject("error", "User exist!");
        }
        return model;

      /*  Query q = Dao
                .getInstance()
                .getEntityManager()
                .createQuery("SELECT item FROM Users item where item.username = :username");
        q.setParameter("username", username);
        List resultList = q.getResultList();
        if (resultList.size() == 0 ||
                !((Users) resultList.get(0)).getPassword().equals(password)) {
            model.put("error", "Ne vernie dannie");
            return "login";
        } else {
            model.put("title", username + "Tut mojno peredat chto hochesh, no tolko latinicu");
            model.put("message", password);
            return "admin";
        }*/
    }
}
