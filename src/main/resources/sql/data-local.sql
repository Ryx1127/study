INSERT INTO knowledge_document (id, title, category, source_type, content, summary, status, deleted, created_at, updated_at)
VALUES
    (1, '企业报销制度', '财务制度', 'TEXT',
     '差旅报销需在出差结束后 5 个工作日内提交，单张发票金额超过 500 元需要上传影像附件。审批流程为员工提交、部门负责人审核、财务复核、出纳打款。',
     '差旅报销需在 5 个工作日内提交，金额超过 500 元需上传附件。', 'READY', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, '请假与考勤说明', '人事制度', 'TEXT',
     '员工请病假需要在系统中提交请假申请，并在返岗后 2 个工作日内补交医院证明。年假需至少提前 3 天发起申请，由直属主管审批。迟到超过 30 分钟按半天事假处理。',
     '病假需补交医院证明，年假需提前 3 天申请。', 'READY', 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO knowledge_chunk (id, document_id, chunk_index, content, keywords, created_at, updated_at)
VALUES
    (1, 1, 1, '差旅报销需在出差结束后 5 个工作日内提交。', '差旅,报销,工作日', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (2, 1, 2, '单张发票金额超过 500 元需要上传影像附件，审批流程为员工提交、部门负责人审核、财务复核、出纳打款。', '发票,附件,审批', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (3, 2, 1, '员工请病假需要在系统中提交请假申请，并在返岗后 2 个工作日内补交医院证明。', '病假,医院证明,返岗', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    (4, 2, 2, '年假需至少提前 3 天发起申请，由直属主管审批。迟到超过 30 分钟按半天事假处理。', '年假,主管审批,迟到', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
