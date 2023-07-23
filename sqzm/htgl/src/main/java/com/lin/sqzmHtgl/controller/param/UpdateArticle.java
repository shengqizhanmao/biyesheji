package com.lin.sqzmHtgl.controller.param;

import com.lin.common.pojo.Body;

import java.util.List;

public class UpdateArticle {
    private String id;//id
    private String title;//标题
    private String summary;//简介
    private String frontCover;//封面
    private String categoryId;//分类id
    private List<String> tagsIdList;//List标签id
    private Body body;//内容

    public Body getBody() {
        return body;
    }

    public void setBody(Body body) {
        this.body = body;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getFrontCover() {
        return frontCover;
    }

    public void setFrontCover(String frontCover) {
        this.frontCover = frontCover;
    }


    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public String toString() {
        return "UpdateArticle{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", frontCover='" + frontCover + '\'' +
                ", categoryId='" + categoryId + '\'' +
                ", tagsIdList=" + tagsIdList +
                ", body=" + body +
                '}';
    }

    public List<String> getTagsIdList() {
        return tagsIdList;
    }

    public void setTagsIdList(List<String> tagsIdList) {
        this.tagsIdList = tagsIdList;
    }
}
