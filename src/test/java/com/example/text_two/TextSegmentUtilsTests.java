package com.example.text_two;

import com.example.text_two.util.TextSegmentUtils;
import java.util.List;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class TextSegmentUtilsTests {

    @Test
    void shouldSplitContentIntoMultipleChunks() {
        List<String> chunks = TextSegmentUtils.splitIntoChunks(
                "第一条：差旅报销需在 5 个工作日内提交。第二条：超过 500 元的发票需上传附件。第三条：审批完成后由财务打款。",
                25);
        Assertions.assertTrue(chunks.size() >= 2);
    }

    @Test
    void shouldCalculatePositiveScoreForRelatedText() {
        double score = TextSegmentUtils.calculateScore(
                "报销发票需要上传什么材料",
                "单张发票金额超过 500 元需要上传影像附件，审批流程为员工提交、部门负责人审核。");
        Assertions.assertTrue(score > 0);
    }
}
