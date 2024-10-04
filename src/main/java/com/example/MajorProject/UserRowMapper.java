package com.example.MajorProject;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRowMapper implements RowMapper<User>{

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException{
        User p = new User();

        int userId = rs.getInt("ID");p.setId(userId);
        String UserName = rs.getString("USERNAME");p.setUserName(UserName);
        String PassWord = rs.getString("PASSWORD");p.setPassword(PassWord);
        return p;
    }
}


