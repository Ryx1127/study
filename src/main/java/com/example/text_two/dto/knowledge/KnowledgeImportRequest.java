package com.example.text_two.dto.knowledge;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class KnowledgeImportRequest {

    @NotBlank(message = "知识标题不能为空")
    private String title;

    @NotBlank(message = "知识分类不能为空")
    private String category;

    private String sourceType;

    @NotBlank(message = "知识内容不能为空")
    private String content;
}
