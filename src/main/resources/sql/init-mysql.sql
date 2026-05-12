CREATE DATABASE IF NOT EXISTS mybati_pus DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE mybati_pus;

DROP TABLE IF EXISTS chat_message;
DROP TABLE IF EXISTS knowledge_chunk;
DROP TABLE IF EXISTS knowledge_document;
DROP TABLE IF EXISTS chat_session;

CREATE TABLE chat_session (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_code VARCHAR(64) NOT NULL UNIQUE,
    session_name VARCHAR(128) NOT NULL,
    scene_type VARCHAR(32) NOT NULL,
    last_question VARCHAR(500),
    last_answer TEXT,
    deleted TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE chat_message (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    session_id BIGINT NOT NULL,
    session_code VARCHAR(64) NOT NULL,
    role VARCHAR(16) NOT NULL,
    content LONGTEXT NOT NULL,
    source_type VARCHAR(32) NOT NULL,
    reference_chunks LONGTEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_document (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    source_type VARCHAR(32) NOT NULL,
    content LONGTEXT NOT NULL,
    summary VARCHAR(255),
    status VARCHAR(32) NOT NULL,
    deleted TINYINT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_chunk (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    document_id BIGINT NOT NULL,
    chunk_index INT NOT NULL,
    content LONGTEXT NOT NULL,
    keywords VARCHAR(512),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO knowledge_document (id, title, category, source_type, content, summary, status, deleted)
VALUES
    (1, '企业报销制度', '财务制度', 'TEXT',
     '差旅报销需在出差结束后 5 个工作日内提交，单张发票金额超过 500 元需要上传影像附件。审批流程为员工提交、部门负责人审核、财务复核、出纳打款。',
     '差旅报销需在 5 个工作日内提交，金额超过 500 元需上传附件。', 'READY', 0),
    (2, '请假与考勤说明', '人事制度', 'TEXT',
     '员工请病假需要在系统中提交请假申请，并在返岗后 2 个工作日内补交医院证明。年假需至少提前 3 天发起申请，由直属主管审批。迟到超过 30 分钟按半天事假处理。',
     '病假需补交医院证明，年假需提前 3 天申请。', 'READY', 0);

INSERT INTO knowledge_chunk (id, document_id, chunk_index, content, keywords)
VALUES
    (1, 1, 1, '差旅报销需在出差结束后 5 个工作日内提交。', '差旅,报销,工作日'),
    (2, 1, 2, '单张发票金额超过 500 元需要上传影像附件，审批流程为员工提交、部门负责人审核、财务复核、出纳打款。', '发票,附件,审批'),
    (3, 2, 1, '员工请病假需要在系统中提交请假申请，并在返岗后 2 个工作日内补交医院证明。', '病假,医院证明,返岗'),
    (4, 2, 2, '年假需至少提前 3 天发起申请，由直属主管审批。迟到超过 30 分钟按半天事假处理。', '年假,主管审批,迟到');
