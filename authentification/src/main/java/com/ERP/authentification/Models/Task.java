package com.ERP.authentification.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.persistence.Column;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false )
@Entity
@Table
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id ;

    @Column(name ="title")
    private String title ;
    @Column(name ="description")
    private String description ;
    @Column(name ="color")
    private String color  ;
    @Column(name ="assignedUser")
    private Long assignedUser ;
    @Column(name ="columnID")
    private Long  columnID ;
    @Column(name ="boardID")
    private Long  boardID ;

    public Long getBoardID() {
        return boardID;
    }

    public void setBoardID(Long boardID) {
        this.boardID = boardID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Long getAssignedUser() {
        return assignedUser;
    }

    public void setAssignedUser(Long assignedUser) {
        this.assignedUser = assignedUser;
    }

    public Long getColumnID() {
        return columnID;
    }

    public void setColumnID(Long columnID) {
        this.columnID = columnID;
    }
}