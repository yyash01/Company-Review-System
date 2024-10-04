package com.example.MajorProject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "login")
public class LoginController {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    @GetMapping
    public Object login(HttpServletRequest request) {
        Object val = request.getSession().getAttribute("user");
        if (val != null) {
            return val;
        }
        return "login";
    }

    @PostMapping
    public String authenticate(@RequestBody User obj, HttpServletRequest request) {
        String username = obj.getUserName();
        String password = obj.getPassword();

        
        String Query = String.format("select * from USER where USERNAME='%s';", username);
        List<User> user = jdbcTemplate.query(Query, new UserRowMapper());

        if(user.size()==0){
            return "Please Add Correct Username";
        }

        String QueryFinal = String.format("select * from USER where USERNAME='%s' and PASSWORD='%s';",username,password);
        user = jdbcTemplate.query(QueryFinal, new UserRowMapper());

        if(user.size()==0){
            return "Please Add Correct Password";
        }
        request.getSession().setAttribute("user", username);
        return "OK";
    }

    @PostMapping("/RegisterUser")
    public String Register(@RequestBody User obj){
        String username = obj.getUserName();
        String password = obj.getPassword();

        
        String Query = String.format("select * from USER where USERNAME='%s';", username);
        List<User> user = jdbcTemplate.query(Query, new UserRowMapper());

        //checking for multiple user in database.
        if(user.size()>0){
            return "This Username Already Exists";
        }

        String query = String.format("insert into USER(USERNAME,PASSWORD) values('%s','%s');",username,password);
        jdbcTemplate.execute(query);
        return "OK";
    }

    @GetMapping("/logout")
    public String Logout(HttpServletRequest request){
        request.getSession().removeAttribute("user");
        return "OK";
    }
}
