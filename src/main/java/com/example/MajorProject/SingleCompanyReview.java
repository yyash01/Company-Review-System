package com.example.MajorProject;

public class SingleCompanyReview {
    private int Crid;
    private String Author;
    private String Title;
    private int Rating;
    private String DateTime;
    private String AnswerOne,AnswerTwo,AnswerThree,AnswerFour;
    private int CompanyId;

    public int getCrid() {
        return Crid;
    }
    public void setCrid(int crid) {
        Crid = crid;
    }
    public int getCompanyId() {
        return CompanyId;
    }
    public void setCompanyId(int companyId) {
        CompanyId = companyId;
    }
    public String getAuthor() {
        return Author;
    }
    public void setAuthor(String author) {
        Author = author;
    }
    public String getTitle() {
        return Title;
    }
    public void setTitle(String title) {
        Title = title;
    }
    public int getRating() {
        return Rating;
    }
    public void setRating(int rating) {
        Rating = rating;
    }
    public String getDateTime() {
        return DateTime;
    }
    public void setDateTime(String dateTime) {
        DateTime = dateTime;
    }
    
    public String getAnswerOne() {
        return AnswerOne;
    }
    public void setAnswerOne(String answerOne) {
        AnswerOne = answerOne;
    }
    public String getAnswerTwo() {
        return AnswerTwo;
    }
    public void setAnswerTwo(String answerTwo) {
        AnswerTwo = answerTwo;
    }
    public String getAnswerThree() {
        return AnswerThree;
    }
    public void setAnswerThree(String answerThree) {
        AnswerThree = answerThree;
    }
    public String getAnswerFour() {
        return AnswerFour;
    }
    public void setAnswerFour(String answerFour) {
        AnswerFour = answerFour;
    }
    
}
