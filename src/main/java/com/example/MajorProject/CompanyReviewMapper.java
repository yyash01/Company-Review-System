package com.example.MajorProject;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class CompanyReviewMapper implements RowMapper<SingleCompanyReview>  {
    @Override
    public SingleCompanyReview mapRow(ResultSet rs, int rowNum) throws SQLException{
        SingleCompanyReview c = new SingleCompanyReview();
        c.setCrid(rs.getInt("CRID"));
        String Author = rs.getString("USERNAME");c.setAuthor(Author);
        String Title = rs.getString("TITLE");c.setTitle(Title);
        int ReviewRating = rs.getInt("CR_RATING");c.setRating(ReviewRating);
        String DateTime = rs.getString("CREATION_DATE");c.setDateTime(DateTime);
        String AnswerOne = rs.getString("ANSWER_1");c.setAnswerOne(AnswerOne);
        String AnswerTwo = rs.getString("ANSWER_2");c.setAnswerTwo(AnswerTwo);
        String AnswerThree = rs.getString("ANSWER_3");c.setAnswerThree(AnswerThree);
        String AnswerFour = rs.getString("ANSWER_4");c.setAnswerFour(AnswerFour);
        return c;
    }
}


